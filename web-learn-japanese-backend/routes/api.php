<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('profile', [AuthController::class, 'profile']);
    Route::post('logout', [AuthController::class, 'logout']);
    // Route::post('refresh', [AuthController::class, 'refresh']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function ($router) {
    Route::get('list', [UserController::class, 'index']);
    Route::post('add', [UserController::class, 'create']);
    Route::post('delete/{id}', [UserController::class, 'destroy']);
    Route::delete('edit/{id}', [UserController::class, 'update']);
});

//Api Vai trò
Route::group([
    'middleware' => 'api',
    'prefix' => 'role'
], function ($router) {
    Route::get('list', [RoleController::class, 'index']);
    Route::post('add', [RoleController::class, 'create']);
    Route::post('edit/{id}', [RoleController::class, 'update']);
    Route::delete('delete/{id}', [RoleController::class, 'destroy']);
   
});

//Api Thể loại bài học
Route::group([
    'middleware' => 'api',
    'prefix' => 'type'
], function ($router) {
    Route::get('list', [TypeController::class, 'index']);
    Route::post('add', [TypeController::class, 'create']);
    Route::post('edit/{id}', [TypeController::class, 'update']);
    Route::delete('delete/{id}', [TypeController::class, 'destroy']);   
});

//Api Bài học
Route::group([
    'middleware' => 'api',
    'prefix' => 'lesson'
], function ($router) {
    Route::get('list', [LessonController::class, 'index']);
    Route::post('add', [LessonController::class, 'create']);
    Route::get('get/{id}', [LessonController::class, 'show']);
    Route::post('edit/{id}', [LessonController::class, 'update']);
    Route::delete('delete/{id}', [LessonController::class, 'destroy']);   
});

//Api Kaiwa
Route::group([
    'middleware' => 'api',
    'prefix' => 'kaiwa'
], function ($router) {
    Route::get('list', [KaiwaController::class, 'index']);
    Route::post('add', [KaiwaController::class, 'create']);
    Route::post('edit/{id}', [KaiwaController::class, 'update']);
    Route::delete('delete/{id}', [KaiwaController::class, 'destroy']);   
    Route::get('get/{id}', [KaiwaController::class, 'show']);
});

//Api Grammar
Route::group([
    'middleware' => 'api',
    'prefix' => 'grammar'
], function ($router) {
    Route::get('list', [GrammarController::class, 'index']);
    Route::post('add', [GrammarController::class, 'create']);
    Route::post('edit/{id}', [GrammarController::class, 'update']);
    Route::delete('delete/{id}', [GrammarController::class, 'destroy']);   
    Route::get('get/{id}', [GrammarController::class, 'show']);

});

//Api Vocabulary
Route::group([
    'middleware' => 'api',
    'prefix' => 'vocabulary'
], function ($router) {
    Route::get('list', [VocabularyController::class, 'index']);
    Route::post('add', [VocabularyController::class, 'create']);
    Route::post('edit/{id}', [VocabularyController::class, 'update']);
    Route::delete('delete/{id}', [VocabularyController::class, 'destroy']);   
    Route::get('get/{id}', [VocabularyController::class, 'show']);
});

//Api Read Language
Route::group([
    'middleware' => 'api',
    'prefix' => 'language'
], function ($router) {
    Route::get('list', [LanguageController::class, 'index']);
});

// api upload file
Route::group([
    'middleware' => 'api',
    'prefix' => 'upload'
], function ($router) {
    Route::post('image', [FileController::class, 'uploadImage']);
});

// api delete file
Route::group([
    'middleware' => 'api',
    'prefix' => 'delete'
], function ($router) {
    Route::post('image', [FileController::class, 'deleteImage']);
});
