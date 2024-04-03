<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LessonUser;

class LessonUserController extends Controller
{
    public function addLessonUser(Request $request, $userId)
    {
        $request->validate([
            'lesson_id' => 'required|exists:tbl_lesson,lesson_id',
        ]);

        try {
            $lessonId = $request->input('lesson_id');

            $lessonUser = new LessonUser();
            $lessonUser->lesson_id = $lessonId;
            $lessonUser->user_id = $userId;
            $lessonUser->save();

            return response()->json(['message' => 'Lesson added to user successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to add lesson to user', 'error' => $e->getMessage()], 500);
        }
    }
}
