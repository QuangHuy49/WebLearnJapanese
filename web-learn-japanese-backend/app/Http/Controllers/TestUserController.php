<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TestUser;
use App\Models\Test;

class TestUserController extends Controller
{
    public function addTestsToUserByLesson(Request $request, $lessonId, $userId)
    {
        try {
            $tests = Test::where('lesson_id', $lessonId)->get();

            foreach ($tests as $test) {
                $testUser = new TestUser();
                $testUser->test_id = $test->test_id;
                $testUser->user_id = $userId;
                $testUser->is_complete = 0;
                $testUser->score = null;
                $testUser->save();
            }

            return response()->json(['message' => 'Tests added to user successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to add tests to user', 'error' => $e->getMessage()], 500);
        }
    }
}
