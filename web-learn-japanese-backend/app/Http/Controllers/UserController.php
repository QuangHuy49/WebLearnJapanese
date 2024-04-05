<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 5);
        $page = $request->input('page', 1);
    
        $totalUsers = User::count();
        $totalPages = ceil($totalUsers / $perPage);
        $users = User::skip(($page - 1) * $perPage)
                        ->take($perPage)
                        ->get();
                        
        return response()->json([
            'users' => $users,
            'totalPages' => $totalPages
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => $request->password,
            'user_avatar' => 'http://127.0.0.1:8000/storage/img/avatar/male-student.png', 
            'user_role_id' => 2, 
        ]);

        return response()->json($user, 201);
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
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' =>'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return view('edit_user')->with('user', $user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'user_name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            'user_avatar' => 'required|string|max:255', 
            'user_role_id' => 'nullable|integer|between:1,2', 
        ]);

        $user->update([
            'user_id' => $id,
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => $request->password,
            'user_avatar' => $request->user_avatar,
            'user_role_id' => $request->user_role_id ,
        ]);

        return response()->json($user, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found!'], 404);
        }
    
        $user->delete();    
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function getUsers(Request $request)
    {
        $perPage = $request->input('perPage', 6);
        $page = $request->input('page', 1);
    
        $totalUsers = User::where('user_role_id', 2)->count();
        $totalPages = ceil($totalUsers / $perPage);
        $users = User::where('user_role_id', 2)
                        ->skip(($page - 1) * $perPage)
                        ->take($perPage)
                        ->get();
                        
        return response()->json([
            'users' => $users,
            'totalPages' => $totalPages
        ]);
    }

    // delete user_avatar by user_id
    public function deleteAvatarImage($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (!empty($user->user_avatar)) {
            $user->update(['user_avatar' => null]);

            return response()->json(['message' => 'Avatar image deleted successfully'], 200);
        }
    }
}