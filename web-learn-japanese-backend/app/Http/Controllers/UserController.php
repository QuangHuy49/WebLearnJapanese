<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'user_name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'user_avatar' => 'storage/app/public/img/avatar/male-student.png', 
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
    public function show(string $id)
    {
        //
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
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'user_name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'nullable|string|min:6',
            'user_avatar' => 'nullable|image|max:2048', 
            'user_role_id' => 'nullable|exists:tbl_role,id', 
        ]);

        $user->update([
            'User_id' => $id,
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => $request->filled('password') ? bcrypt($request->password) : $user->password,
            'user_avatar' => $request->file('user_avatar') ? $request->file('user_avatar')->store('avatars') : $user->user_avatar,
            'user_role_id' => $request->filled('user_role_id') ? $request->user_role_id : $user->user_role_id,
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
}
