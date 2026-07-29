<?php

declare(strict_types=1);

namespace Portfolio\ChatHistory;

final class Request
{
    public function __construct(
        public readonly string $method,
        public readonly string $path,
        private readonly string $body
    ) {
    }

    public static function fromGlobals(): self
    {
        $requestUri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
        $path = (string) (parse_url($requestUri, PHP_URL_PATH) ?? '/');
        $scriptDirectory = str_replace('\\', '/', dirname((string) ($_SERVER['SCRIPT_NAME'] ?? '/api/index.php')));
        $scriptDirectory = $scriptDirectory === '/' ? '' : rtrim($scriptDirectory, '/');

        if ($scriptDirectory !== '' && str_starts_with($path, $scriptDirectory)) {
            $path = substr($path, strlen($scriptDirectory));
        }

        // Also support shared hosts that do not enable mod_rewrite.
        if ($path === '/index.php') {
            $path = '/';
        } elseif (str_starts_with($path, '/index.php/')) {
            $path = substr($path, strlen('/index.php'));
        }

        $path = '/' . ltrim($path, '/');
        if ($path !== '/') {
            $path = rtrim($path, '/');
        }

        $body = file_get_contents('php://input');

        return new self(
            strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET')),
            $path,
            $body === false ? '' : $body
        );
    }

    /** @return array<string, mixed> */
    public function json(int $maximumBytes = 65536): array
    {
        if ($this->body === '') {
            throw new HttpException(400, 'The request body must contain JSON.');
        }

        if (strlen($this->body) > $maximumBytes) {
            throw new HttpException(413, 'The request body is too large.');
        }

        try {
            $value = json_decode($this->body, true, 32, JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            throw new HttpException(400, 'The request body contains invalid JSON.');
        }

        if (!is_array($value) || array_is_list($value)) {
            throw new HttpException(400, 'The JSON body must be an object.');
        }

        return $value;
    }
}

