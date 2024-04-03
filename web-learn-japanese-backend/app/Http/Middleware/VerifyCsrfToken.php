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

        // upload file image
        '/api/upload/image',
        '/api/delete/image',

        // upload file audio
        '/api/upload/audio',
        '/api/delete/audio',

        // lesson
        '/api/lesson/add',
        '/api/lesson/edit/*',
        '/api/lesson/delete/*',

        // vocabulary
        '/api/vocabulary/add',
        '/api/vocabulary/edit/*',
        '/api/vocabulary/delete/*',

        // lesson-user
        '/api/lesson-user/add-lesson-user/*',
    ];
}
