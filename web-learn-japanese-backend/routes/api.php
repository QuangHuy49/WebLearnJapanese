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

// api User
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

// api User role
Route::group([
    'middleware' => 'api',
    'prefix' => 'role'
], function ($router) {
    Route::get('list', [RoleController::class, 'index']);
    Route::post('add', [RoleController::class, 'create']);
    Route::post('edit/{id}', [RoleController::class, 'update']);
    Route::delete('delete/{id}', [RoleController::class, 'destroy']);
   
});

// api Lesson type
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

// api Lesson
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
    // get lesson basic N5
    Route::get('/get-lesson-basic-n5/{id}', [LessonController::class, 'getLessonBasicN5']);
    // get lesson basic N4
    Route::get('/get-lesson-basic-n4/{id}', [LessonController::class, 'getLessonBasicN4']);
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
    Route::get('all', [TestController::class, 'get_all_test']);
    Route::get('list', [TestController::class, 'index']);
    Route::post('add', [TestController::class, 'create']);
    Route::get('get/{id}', [TestController::class, 'show']);
    Route::post('edit/{id}', [TestController::class, 'update']);
    Route::delete('delete/{id}', [TestController::class, 'destroy']);
    Route::get('{id}/test-data', [TestController::class, 'getTestDataByIdLesson']);
});

// api Question
Route::group([
    'middleware' => 'api',
    'prefix' => 'question'
], function ($router) {
    Route::get('all', [QuestionController::class, 'get_all_question']);
    Route::get('list', [QuestionController::class, 'index']);
    Route::post('add', [QuestionController::class, 'create']);
    Route::get('get/{id}', [QuestionController::class, 'show']);
    Route::post('edit/{id}', [QuestionController::class, 'update']);
    Route::delete('delete/{id}', [QuestionController::class, 'destroy']);
    Route::get('{id}/question-data-paging', [QuestionController::class, 'getQuestionDataByIdTestPaging']);
    // create question and answer
    Route::post('add-question-answer', [QuestionController::class, 'createQuestionAndAnswer']);
    // update question and answer
    Route::post('update-question-answer/{id}', [QuestionController::class, 'updateQuestionAndAnswer']);
    // get question by question_id with answer
    Route::get('get-question-answer/{id}', [QuestionController::class, 'getQuestionWithAnswers']);
    // delete question_img by question_id
    Route::delete('/delete-question-image/{id}', [QuestionController::class, 'deleteQuestionImage']);
    // delete question_audio by question_id
    Route::delete('/delete-question-audio/{id}', [QuestionController::class, 'deleteQuestionAudio']);

    Route::get('get-question-by-id-test/{id}', [QuestionController::class, 'getQuestionsByTestId']);
});

// api Answer
Route::group([
    'middleware' => 'api',
    'prefix' => 'answer'
], function ($router) {
    Route::post('edit', [AnswerController::class, 'update']);
    Route::delete('delete/{id}', [AnswerController::class, 'destroy']);
    Route::get('{id}/answer-data', [AnswerController::class, 'getAnswerDataByIdQuestion']);
    // delete answer_img by answer_id
    Route::delete('/delete-answer-image/{id}', [AnswerController::class, 'deleteAnswerImage']);
    // delete answer_audio by answer_id
    Route::delete('/delete-answer-audio/{id}', [AnswerController::class, 'deleteAnswerAudio']);
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

// api test-user
Route::group([
    'middleware' => 'api',
    'prefix' => 'test-user'
], function ($router) {
    Route::post('add-test-user/{lessonId}/{userId}', [TestUserController::class, 'addTestsToUserByLesson']);
});

// api japanese alphabet
Route::group([
    'middleware' => 'api',
    'prefix' => 'alphabet'
], function ($router) {
    // get data hiragana alphabet by lesson_id
    Route::get('hiragana-alphabet/{id}', [JapaneseAlphabetController::class, 'getHiraganaAlphabetDataByIdLesson']);
    // get data dakuten_hiragana and handakuten_hiragana alphabet by lesson_id
    Route::get('dakuten-handakuten-hiragana-alphabet/{id}', [JapaneseAlphabetController::class, 'getDakutenAndHandakutenHiraganaAlphabetDataByIdLesson']);
    // get data yoon_hiragana alphabet by lesson_id
    Route::get('yoon-hiragana-alphabet/{id}', [JapaneseAlphabetController::class, 'getYoonHiraganaAlphabetDataByIdLesson']);
    // get data katakana alphabet by lesson_id
    Route::get('katakana-alphabet/{id}', [JapaneseAlphabetController::class, 'getKatakanaAlphabetDataByIdLesson']);
    // get data dakuten_katakana and handakuten_katakana alphabet by lesson_id
    Route::get('dakuten-handakuten-katakana-alphabet/{id}', [JapaneseAlphabetController::class, 'getDakutenAndHandakutenKatakanaAlphabetDataByIdLesson']);
    // get data yoon_katakana alphabet by lesson_id
    Route::get('yoon-katakana-alphabet/{id}', [JapaneseAlphabetController::class, 'getYoonKatakanaAlphabetDataByIdLesson']);
});

// admin
Route::group([
    'middleware' => 'api',
    'prefix' => 'admin'
], function ($router) {
    // get total
    Route::get('get-total', [AdminController::class, 'getTotal']);
});

// api post
Route::group([
    'middleware' => 'api',
    'prefix' => 'post'
], function ($router) {
    Route::get('get/{id}', [PostController::class, 'show']);
    Route::post('edit/{id}', [PostController::class, 'update']);
    Route::delete('delete/{id}', [PostController::class, 'destroy']);
    Route::post('add-admin/{id}', [PostController::class, 'addPostAdmin']);
    Route::post('add-user/{id}', [PostController::class, 'addPostUser']);
    // get post by user_id
    Route::get('{id}/post-data', [PostController::class, 'getPostDataByIdUser']);
    // get 10 latest post
    Route::get('/latest-post-data', [PostController::class, 'getPostLatest']);
    // get all post
    Route::get('/get-all-post', [PostController::class, 'getAllPost']);
    // delete post_img by post_id
    Route::delete('/delete-post-image/{id}', [PostController::class, 'deletePostImage']);
});

// api like post
Route::group([
    'middleware' => 'api',
    'prefix' => 'like'
], function ($router) {
    Route::post('/add-like', [LikeController::class, 'likePost']);
});

// api view post
Route::group([
    'middleware' => 'api',
    'prefix' => 'view'
], function ($router) {
    Route::post('/add-view', [ViewController::class, 'viewPost']);
});

// api comment post
Route::group([
    'middleware' => 'api',
    'prefix' => 'comment'
], function ($router) {
    Route::get('/get-comment-by-id-post/{id}', [CommentController::class, 'getByPostId']);
});
