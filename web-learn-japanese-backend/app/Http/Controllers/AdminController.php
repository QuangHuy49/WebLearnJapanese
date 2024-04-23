<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\User;

class AdminController extends Controller
{
    public function getTotal() {
        $totalLesson = Lesson::where('lesson_status', 1)->count();

        $totalUser = User::where('user_role_id', 2)->count();

        // $totalPost = Post::where('post_status', 1)->count();

        $result = [
            'totalLesson' => $totalLesson,
            'totalUser' => $totalUser,
            // 'totalPost' => $totalPost
        ];

        return response()->json($result);
    }
}
