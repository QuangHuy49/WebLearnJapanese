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

// api user
Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function ($router) {
    Route::get('list', [UserController::class, 'index']);
    Route::get('get/{id}', [UserController::class, 'show']);
    Route::get('getUser', [UserController::class, 'getUsers']);
    Route::post('add', [UserController::class, 'create']);
    Route::delete('delete/{id}', [UserController::class, 'destroy']);
    Route::post('edit/{id}', [UserController::class, 'update']);
    // delete user_avatar by user_id
    Route::delete('/delete-avatar-image/{id}', [UserController::class, 'deleteAvatarImage']);
});

// api Vai trò
Route::group([
    'middleware' => 'api',
    'prefix' => 'role'
], function ($router) {
    Route::get('list', [RoleController::class, 'index']);
    Route::post('add', [RoleController::class, 'create']);
    Route::post('edit/{id}', [RoleController::class, 'update']);
    Route::delete('delete/{id}', [RoleController::class, 'destroy']);
   
});

// api Thể loại bài học
Route::group([
    'middleware' => 'api',
    'prefix' => 'type'
], function ($router) {
    Route::get('list', [TypeController::class, 'index']);  
    Route::get('get/{id}', [TypeController::class, 'show']);
    Route::post('add', [TypeController::class, 'create']);
    Route::post('edit/{id}', [TypeController::class, 'update']);
    Route::delete('delete/{id}', [TypeController::class, 'destroy']); 
});

// api Bài học
Route::group([
    'middleware' => 'api',
    'prefix' => 'lesson'
], function ($router) {
    Route::get('all', [LessonController::class, 'get_all_lesson']);
    Route::get('list', [LessonController::class, 'index']);
    Route::post('add', [LessonController::class, 'create']);
    Route::get('get/{id}', [LessonController::class, 'show']);
    Route::post('edit/{id}', [LessonController::class, 'update']);
    Route::delete('delete/{id}', [LessonController::class, 'destroy']);
    // get 8 latest lesson if status = 1
    Route::get('/latest-lessons/{id}', [LessonController::class, 'getLatestLessons']);
    // get lesson by user_id
    Route::get('/lessons-user/{id}', [LessonController::class, 'getLessonsByIdUser']);
    // delete lesson_img by lesson_id
    Route::delete('/delete-lesson-image/{id}', [LessonController::class, 'deleteLessonImage']);
});

// api Kaiwa
Route::group([
    'middleware' => 'api',
    'prefix' => 'kaiwa'
], function ($router) {
    Route::get('list', [KaiwaController::class, 'index']);
    Route::post('add', [KaiwaController::class, 'create']);
    Route::post('edit/{id}', [KaiwaController::class, 'update']);
    Route::delete('delete/{id}', [KaiwaController::class, 'destroy']);   
    Route::get('get/{id}', [KaiwaController::class, 'show']);
    Route::get('{id}/kaiwa-data-paging', [KaiwaController::class, 'getKaiwaDataByIdLessonPaging']);
    Route::get('{id}/kaiwa-data', [KaiwaController::class, 'getKaiwaDataByIdLesson']);
    // delete kaiwa_audio by kaiwa_id
    Route::delete('/delete-kaiwa-audio/{id}', [KaiwaController::class, 'deleteKaiwaAudio']);
});

// api Grammar
Route::group([
    'middleware' => 'api',
    'prefix' => 'grammar'
], function ($router) {
    Route::get('list', [GrammarController::class, 'index']);
    Route::post('add', [GrammarController::class, 'create']);
    Route::post('edit/{id}', [GrammarController::class, 'update']);
    Route::delete('delete/{id}', [GrammarController::class, 'destroy']);   
    Route::get('get/{id}', [GrammarController::class, 'show']);
    Route::get('{id}/grammar-data-paging', [GrammarController::class, 'getGrammarDataByIdLessonPaging']);
    Route::get('{id}/grammar-data', [GrammarController::class, 'getGrammarDataByIdLesson']);
});

// api Vocabulary
Route::group([
    'middleware' => 'api',
    'prefix' => 'vocabulary'
], function ($router) {
    Route::get('list', [VocabularyController::class, 'index']);
    Route::post('add', [VocabularyController::class, 'create']);
    Route::post('edit/{id}', [VocabularyController::class, 'update']);
    Route::delete('delete/{id}', [VocabularyController::class, 'destroy']);   
    Route::get('get/{id}', [VocabularyController::class, 'show']);
    Route::get('{id}/vocabulary-data-paging', [VocabularyController::class, 'getVocabularyDataByIdLessonPaging']);
    Route::get('{id}/vocabulary-data', [VocabularyController::class, 'getVocabularyDataByIdLesson']);
    // delete vocabulary_audio by vocabulary_id
    Route::delete('/delete-vocabulary-audio/{id}', [VocabularyController::class, 'deleteVocabularyAudio']);
});

// api Test
Route::group([
    'middleware' => 'api',
    'prefix' => 'test'
], function ($router) {
    Route::get('list', [TestController::class, 'index']);
   
});
// api Read Language
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
    Route::post('audio', [FileController::class, 'uploadAudio']);
});

// api delete file
Route::group([
    'middleware' => 'api',
    'prefix' => 'delete'
], function ($router) {
    Route::post('image', [FileController::class, 'deleteImage']);
    Route::post('audio', [FileController::class, 'deleteAudio']);
});

// api lesson-user
Route::group([
    'middleware' => 'api',
    'prefix' => 'lesson-user'
], function ($router) {
    Route::post('add-lesson-user/{id}', [LessonUserController::class, 'addLessonUser']);
});

// api japanese alphabet
Route::group([
    'middleware' => 'api',
    'prefix' => 'alphabet'
], function ($router) {
    Route::get('hiragana', [JapaneseAlphabetController::class, 'getHiraganaAlphabet']);
});
