<?php

declare(strict_types=1);

namespace Portfolio\ChatHistory;

final class App
{
    /** @var array<string, callable(Request): void> */
    private array $routes = [];

    /** @param callable(Request): void $handler */
    public function route(string $method, string $path, callable $handler): void
    {
        $this->routes[strtoupper($method) . ' ' . $path] = $handler;
    }

    public function run(Request $request): void
    {
        $routeKey = $request->method . ' ' . $request->path;
        $handler = $this->routes[$routeKey] ?? null;

        if ($handler === null) {
            Response::json(['error' => 'Endpoint not found.'], 404);
            return;
        }

        try {
            $handler($request);
        } catch (HttpException $error) {
            Response::json(['error' => $error->getMessage()], $error->statusCode);
        } catch (\Throwable $error) {
            error_log(sprintf(
                'Chat history API error: %s in %s:%d',
                $error->getMessage(),
                $error->getFile(),
                $error->getLine()
            ));
            Response::json(['error' => 'Unable to record chat history.'], 500);
        }
    }
}

