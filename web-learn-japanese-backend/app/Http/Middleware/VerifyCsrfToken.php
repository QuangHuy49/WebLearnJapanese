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
        '/api/lesson/delete-lesson-image/*',

        // type
        '/api/type/add',
        '/api/type/edit/*',
        '/api/type/delete/*',

        //user
        '/api/user/add',
        '/api/user/edit/*',
        '/api/user/delete/*',
        '/api/user/delete-avatar-image/*',

        // vocabulary
        '/api/vocabulary/add',
        '/api/vocabulary/edit/*',
        '/api/vocabulary/delete/*',
        '/api/vocabulary/delete-vocabulary-audio/*',
        
        // kaiwa
        '/api/kaiwa/add',
        '/api/kaiwa/edit/*',
        '/api/kaiwa/delete/*',
        '/api/kaiwa/delete-kaiwa-audio/*',

        // grammar
        '/api/grammar/add',
        '/api/grammar/edit/*',
        '/api/grammar/delete/*',

        // lesson-user
        '/api/lesson-user/add-lesson-user/*',
    ];
}
