<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        // auth
        '/api/auth/login',
        '/api/auth/logout',
        '/api/auth/register',

        // upload file
        '/api/upload/image',
        '/api/delete/image',

        // lesson
        'api/lesson/add',
        'api/lesson/delete'
    ];
}
