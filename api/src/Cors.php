<?php

declare(strict_types=1);

namespace Portfolio\ChatHistory;

final class Cors
{
    /** @param array<string, mixed> $config */
    public static function apply(array $config): void
    {
        $origin = rtrim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''), '/');
        $allowedOrigins = $config['allowed_origins'] ?? [];

        if ($origin !== '' && is_array($allowedOrigins) && in_array($origin, $allowedOrigins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
        }

        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Max-Age: 86400');
    }
}

