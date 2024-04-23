<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\View;
use App\Models\Post;

class ViewController extends Controller
{
    public function viewPost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:tbl_post,post_id',
            'user_id' => 'required|exists:tbl_user,user_id',
        ]);

        $existingView = View::where('post_id', $request->post_id)
                            ->where('user_id', $request->user_id)
                            ->first();

        $view = new View();
        $view->post_id = $request->post_id;
        $view->user_id = $request->user_id;
        $view->save();

        // $post = Post::find($request->post_id);
        // $post->post_view += 1;
        // $post->save();

        return response()->json(['message' => 'Added a view for the post.'], 200);
    }
}
