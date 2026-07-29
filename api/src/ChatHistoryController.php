<?php

declare(strict_types=1);

namespace Portfolio\ChatHistory;

final class ChatHistoryController
{
    private const MAX_USER_MESSAGE_CHARACTERS = 4000;
    private const MAX_ASSISTANT_MESSAGE_CHARACTERS = 16000;
    private const MAX_TOKEN_COUNT = 10000000;

    /** @param array<string, mixed> $databaseConfig */
    public function __construct(private readonly array $databaseConfig)
    {
    }

    public function store(Request $request): void
    {
        $payload = $request->json();
        $conversationId = $this->uuid($payload, 'conversationId');
        $turnId = $this->uuid($payload, 'turnId');
        $userMessage = $this->message($payload, 'userMessage', self::MAX_USER_MESSAGE_CHARACTERS);
        $assistantMessage = $this->message(
            $payload,
            'assistantMessage',
            self::MAX_ASSISTANT_MESSAGE_CHARACTERS
        );
        $status = $this->status($payload['status'] ?? 'completed');
        $metadata = $this->metadata($payload['metadata'] ?? []);

        $database = Database::connect($this->databaseConfig);
        $statement = $database->prepare(<<<'SQL'
            INSERT INTO chat_history (
                conversation_id,
                turn_id,
                user_message,
                assistant_message,
                response_status,
                prompt_tokens,
                response_tokens,
                total_tokens,
                finish_reason,
                portfolio_data_updated_at,
                retrieved_sections
            ) VALUES (
                :conversation_id,
                :turn_id,
                :user_message,
                :assistant_message,
                :response_status,
                :prompt_tokens,
                :response_tokens,
                :total_tokens,
                :finish_reason,
                :portfolio_data_updated_at,
                :retrieved_sections
            )
            ON DUPLICATE KEY UPDATE turn_id = VALUES(turn_id)
            SQL);

        $statement->execute([
            'conversation_id' => $conversationId,
            'turn_id' => $turnId,
            'user_message' => $userMessage,
            'assistant_message' => $assistantMessage,
            'response_status' => $status,
            'prompt_tokens' => $metadata['prompt_tokens'],
            'response_tokens' => $metadata['response_tokens'],
            'total_tokens' => $metadata['total_tokens'],
            'finish_reason' => $metadata['finish_reason'],
            'portfolio_data_updated_at' => $metadata['portfolio_data_updated_at'],
            'retrieved_sections' => $metadata['retrieved_sections'],
        ]);

        $duplicate = $statement->rowCount() === 0;
        Response::json([
            'stored' => true,
            'duplicate' => $duplicate,
        ], $duplicate ? 200 : 201);
    }

    /** @param array<string, mixed> $payload */
    private function uuid(array $payload, string $field): string
    {
        $value = $payload[$field] ?? null;
        if (!is_string($value) || preg_match(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i',
            $value
        ) !== 1) {
            throw new HttpException(422, sprintf('%s must be a valid UUID.', $field));
        }

        return strtolower($value);
    }

    /** @param array<string, mixed> $payload */
    private function message(array $payload, string $field, int $maximumCharacters): string
    {
        $value = $payload[$field] ?? null;
        if (!is_string($value) || trim($value) === '') {
            throw new HttpException(422, sprintf('%s must be a non-empty string.', $field));
        }

        $length = function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
        if ($length > $maximumCharacters) {
            throw new HttpException(
                422,
                sprintf('%s is limited to %d characters.', $field, $maximumCharacters)
            );
        }

        return trim($value);
    }

    private function status(mixed $value): string
    {
        if (!is_string($value) || !in_array($value, ['completed', 'error'], true)) {
            throw new HttpException(422, 'status must be completed or error.');
        }

        return $value;
    }

    /**
     * @return array{
     *   prompt_tokens: ?int,
     *   response_tokens: ?int,
     *   total_tokens: ?int,
     *   finish_reason: ?string,
     *   portfolio_data_updated_at: ?string,
     *   retrieved_sections: ?string
     * }
     */
    private function metadata(mixed $value): array
    {
        if (!is_array($value) || ($value !== [] && array_is_list($value))) {
            throw new HttpException(422, 'metadata must be an object.');
        }

        $tokenInfo = $value['tokenInfo'] ?? [];
        if (!is_array($tokenInfo) || ($tokenInfo !== [] && array_is_list($tokenInfo))) {
            throw new HttpException(422, 'metadata.tokenInfo must be an object.');
        }

        $contextInfo = $value['contextInfo'] ?? [];
        if (!is_array($contextInfo) || ($contextInfo !== [] && array_is_list($contextInfo))) {
            throw new HttpException(422, 'metadata.contextInfo must be an object.');
        }

        $finishReason = $tokenInfo['finishReason'] ?? null;
        if ($finishReason !== null && (!is_string($finishReason) || strlen($finishReason) > 64)) {
            throw new HttpException(422, 'metadata.tokenInfo.finishReason is invalid.');
        }

        $dataUpdatedAt = $contextInfo['dataUpdatedAt'] ?? null;
        if ($dataUpdatedAt !== null && (
            !is_string($dataUpdatedAt)
            || preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataUpdatedAt) !== 1
        )) {
            throw new HttpException(422, 'metadata.contextInfo.dataUpdatedAt must use YYYY-MM-DD.');
        }

        $sections = $contextInfo['retrievedSections'] ?? null;
        $encodedSections = null;
        if ($sections !== null) {
            if (!is_array($sections) || count($sections) > 50) {
                throw new HttpException(422, 'metadata.contextInfo.retrievedSections is invalid.');
            }

            foreach ($sections as $section) {
                if (!is_string($section) || strlen($section) > 100) {
                    throw new HttpException(422, 'Each retrieved section must be a short string.');
                }
            }

            $encodedSections = json_encode(
                array_values($sections),
                JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
            );
        }

        return [
            'prompt_tokens' => $this->tokenCount($tokenInfo, 'promptTokenCount'),
            'response_tokens' => $this->tokenCount($tokenInfo, 'candidatesTokenCount'),
            'total_tokens' => $this->tokenCount($tokenInfo, 'totalTokenCount'),
            'finish_reason' => $finishReason,
            'portfolio_data_updated_at' => $dataUpdatedAt,
            'retrieved_sections' => $encodedSections,
        ];
    }

    /** @param array<string, mixed> $tokenInfo */
    private function tokenCount(array $tokenInfo, string $field): ?int
    {
        $value = $tokenInfo[$field] ?? null;
        if ($value === null) {
            return null;
        }

        if (!is_int($value) || $value < 0 || $value > self::MAX_TOKEN_COUNT) {
            throw new HttpException(422, sprintf('metadata.tokenInfo.%s is invalid.', $field));
        }

        return $value;
    }
}
