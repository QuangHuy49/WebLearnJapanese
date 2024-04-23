<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Like;
use App\Models\Comment;
use App\Models\View;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, $user_id)
    {
        $request->validate([
            'post_title' => 'required|string|max:255',
            'post_content' => 'required|string',
            'post_img'=>'required|string|max:255',
        ]);

        $post = Post::create([
            'user_id' => $user_id,
            'post_title' => $request->post_title,
            'post_content' => $request->post_content,
            'post_img' => $request->post_img,
            'post_view' => 0,
            'post_like' => 0,
            'post_comment' => 0,
            'post_status' => 0 
        ]);

        return response()->json($post, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with('user')->find($id);

        if (!$post) {
            return response()->json(['message' =>'Post not found'], 404);
        }

        $totalLikes = View::where('post_id', $id)->count();
        $post->total_likes = $totalLikes;

        $totalComments = View::where('post_id', $id)->count();
        $post->total_comments = $totalComments;

        $totalViews = View::where('post_id', $id)->count();
        $post->total_views = $totalViews;

        return response()->json($post, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function addPostAdmin(Request $request, $user_id)
    {
        $request->validate([
            'post_title' => 'required|string|max:255',
            'post_content' => 'required|string',
            'post_img' => 'required|string|max:255',
            'post_status' => 'required|integer|between:0,1'
        ]);

        $post = Post::create([
            'user_id' => $user_id,
            'post_title' => $request->post_title,
            'post_content' => $request->post_content,
            'post_img' => $request->post_img,
            'post_view' => 0,
            'post_like' => 0,
            'post_comment' => 0,
            'post_status' => $request->post_status
        ]);

        return response()->json($post, 201);
    }

    public function addPostUser(Request $request, $user_id)
    {
        $request->validate([
            'post_title' => 'required|string|max:255',
            'post_content' => 'required|string',
            'post_img'=>'required|string|max:255',
        ]);

        $post = Post::create([
            'user_id' => $user_id,
            'post_title' => $request->post_title,
            'post_content' => $request->post_content,
            'post_img' => $request->post_img,
            'post_view' => 0,
            'post_like' => 0,
            'post_comment' => 0,
            'post_status' => 0 
        ]);

        return response()->json($post, 201);
    }

    // get post by user_id
    public function getPostDataByIdUser(Request $request, $user_id)
    {
        $posts = Post::where('user_id', $user_id)
                    ->with('user')
                    ->get();

        foreach ($posts as $post) {
            $post->total_likes = Like::where('post_id', $post->post_id)->count();
            $post->total_comments = Comment::where('post_id', $post->post_id)->count();
            $post->total_views = View::where('post_id', $post->post_id)->count();
        }
        
        return response()->json([
            'posts' => $posts
        ], 200);
    }

    // get 10 latest post if status = 1
    public function getPostLatest(Request $request)
    {
        $posts = Post::where('post_status', 1)
                        ->orderBy('created_at', 'desc')
                        ->take(10)
                        ->with('user')
                        ->get();
    
        foreach ($posts as $post) {
            $post->total_likes = Like::where('post_id', $post->post_id)->count();
            $post->likes = Like::where('post_id', $post->post_id)->with('user')->get();
            $post->total_comments = Comment::where('post_id', $post->post_id)->count();
            $post->total_views = View::where('post_id', $post->post_id)->count();
        }
        
        return response()->json([
            'posts' => $posts
        ], 200);
    }
}