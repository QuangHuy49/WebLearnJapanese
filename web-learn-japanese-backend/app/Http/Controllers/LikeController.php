<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Post;

class LikeController extends Controller
{
    public function likePost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:tbl_post,post_id',
            'user_id' => 'required|exists:tbl_user,user_id',
        ]);

        $existingLike = Like::where('post_id', $request->post_id)
                            ->where('user_id', $request->user_id)
                            ->first();

        if ($existingLike) {
            return response()->json(['message' => 'User has already liked this post.'], 400);
        }

        $like = new Like();
        $like->post_id = $request->post_id;
        $like->user_id = $request->user_id;
        $like->save();

        $post = Post::find($request->post_id);
        $post->post_like += 1;
        $post->save();

        return response()->json(['message' => 'Added a like for the post.'], 200);
    }
}
