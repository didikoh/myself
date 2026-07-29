<?php

declare(strict_types=1);

/**
 * Copy this file to config.php on the server and add the database password.
 * config.php is ignored by Git and blocked from direct web access.
 */
return [
    'database' => [
        'host' => '194.59.164.96',
        'port' => 3306,
        'name' => 'u839013241_myself',
        'username' => 'u839013241_myself_admin',
        'password' => 'replace-with-the-database-password',
    ],
    'cors' => [
        // Same-origin production requests do not need an entry here.
        // Add the frontend origin when the API is hosted on another domain.
        'allowed_origins' => [
            'http://localhost:5173',
        ],
    ],
];

