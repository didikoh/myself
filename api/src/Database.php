<?php

declare(strict_types=1);

namespace Portfolio\ChatHistory;

use PDO;

final class Database
{
    /** @param array<string, mixed> $config */
    public static function connect(array $config): PDO
    {
        $password = (string) ($config['password'] ?? '');
        if ($password === '' || $password === 'replace-with-the-database-password') {
            throw new \RuntimeException('Database password is not configured.');
        }

        $host = (string) ($config['host'] ?? '');
        $port = (int) ($config['port'] ?? 3306);
        $database = (string) ($config['name'] ?? '');
        $username = (string) ($config['username'] ?? '');

        if ($host === '' || $database === '' || $username === '') {
            throw new \RuntimeException('Database configuration is incomplete.');
        }

        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
            $host,
            $port,
            $database
        );

        return new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
}

