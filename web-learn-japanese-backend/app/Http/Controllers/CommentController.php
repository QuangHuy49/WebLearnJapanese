<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function getByPostId($postId)
    {
        $comments = Comment::with('user')->where('post_id', $postId)->get();
        return response()->json($comments);
    }
}
