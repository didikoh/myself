<?php

declare(strict_types=1);

namespace Portfolio\ChatHistory;

final class Config
{
    /** @return array<string, mixed> */
    public static function load(string $apiDirectory): array
    {
        $config = [
            'database' => [
                'host' => self::environment('DB_HOST', '194.59.164.96'),
                'port' => (int) self::environment('DB_PORT', '3306'),
                'name' => self::environment('DB_NAME', 'u839013241_myself'),
                'username' => self::environment('DB_USER', 'u839013241_myself_admin'),
                'password' => self::environment('DB_PASSWORD', ''),
            ],
            'cors' => [
                'allowed_origins' => self::originsFromEnvironment(),
            ],
        ];

        $localConfigPath = $apiDirectory . DIRECTORY_SEPARATOR . 'config.php';
        if (is_file($localConfigPath)) {
            $localConfig = require $localConfigPath;
            if (!is_array($localConfig)) {
                throw new \RuntimeException('api/config.php must return an array.');
            }

            $config = array_replace_recursive($config, $localConfig);
        }

        return $config;
    }

    private static function environment(string $name, string $fallback): string
    {
        $value = getenv($name);

        return $value === false ? $fallback : trim($value);
    }

    /** @return list<string> */
    private static function originsFromEnvironment(): array
    {
        $rawOrigins = self::environment('CORS_ALLOWED_ORIGINS', 'http://localhost:5173');
        if ($rawOrigins === '') {
            return [];
        }

        return array_values(array_filter(array_map(
            static fn (string $origin): string => rtrim(trim($origin), '/'),
            explode(',', $rawOrigins)
        )));
    }
}

