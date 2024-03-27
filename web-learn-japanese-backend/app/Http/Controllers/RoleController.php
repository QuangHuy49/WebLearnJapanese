<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'role_type' => 'required|string|max:255',
        ]);
        $role = Role::create([
            'role_type' => $request->role_type,
        ]);
        return response()->json($role, 201);
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $role=Role::find($id);
        if(!$role){
            return response()->json(['message' => 'Role not found'],404);
        }
        $request -> validate([
            'role_type'=>'required|string|max:255',
        ]);
        $role->update([
            'role_type'=>$id,
            'role_type'=>$request->role_type,
        ]);
        return response()->json($role,201);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        $role =Role::find($id);
        if(!$role){
            return response()->json(['message'=>'Role not found'],404);
        }
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully'],200);

    }
}