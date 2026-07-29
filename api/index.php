<?php

declare(strict_types=1);

use Portfolio\ChatHistory\App;
use Portfolio\ChatHistory\ChatHistoryController;
use Portfolio\ChatHistory\Config;
use Portfolio\ChatHistory\Cors;
use Portfolio\ChatHistory\Request;
use Portfolio\ChatHistory\Response;

$apiDirectory = __DIR__;

spl_autoload_register(static function (string $class) use ($apiDirectory): void {
    $prefix = 'Portfolio\\ChatHistory\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $path = $apiDirectory . '/src/' . str_replace('\\', '/', $relativeClass) . '.php';
    if (is_file($path)) {
        require $path;
    }
});

$config = Config::load($apiDirectory);
Cors::apply(is_array($config['cors'] ?? null) ? $config['cors'] : []);

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$databaseConfig = is_array($config['database'] ?? null) ? $config['database'] : [];
$controller = new ChatHistoryController($databaseConfig);
$app = new App();

$app->route('GET', '/', static function (): void {
    Response::json([
        'status' => 'ok',
        'service' => 'portfolio-chat-history',
    ]);
});
$app->route('GET', '/health', static function (): void {
    Response::json(['status' => 'ok']);
});
$app->route('POST', '/chat-history', [$controller, 'store']);

$app->run(Request::fromGlobals());

