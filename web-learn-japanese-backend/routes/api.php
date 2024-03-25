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
    Route::post('edit/{id}', [UserController::class, 'update']);
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'role'
], function ($router) {
    Route::get('list', [RoleController::class, 'index']);
    Route::post('add', [RoleController::class, 'create']);
    Route::post('edit/{id}', [RoleController::class, 'update']);
    Route::post('delete/{id}', [RoleController::class, 'destroy']);
   
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'type'
], function ($router) {
    Route::get('list', [TypeController::class, 'index']);
    Route::post('add', [TypeController::class, 'create']);
    Route::post('edit/{id}', [TypeController::class, 'update']);
    Route::post('delete/{id}', [TypeController::class, 'destroy']);   
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'lesson'
], function ($router) {
    Route::get('list', [LessonController::class, 'index']);
    Route::post('add', [LessonController::class, 'create']);
    Route::post('edit/{id}', [LessonController::class, 'update']);
    Route::post('delete/{id}', [LessonController::class, 'destroy']);   
});

