<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type;


class TypeController extends Controller
{
    public function index()
    {
        $types = Type::all();
        return response()->json($types);
    }
    
    public function create(Request $request)
    {
        $request->validate([
            'type_name' =>'required|string|max:255',
            'type_status' => 'required|integer|between:0,1',
        ]);
        $type=Type::create([
            'type_name' =>$request->type_name,
            'type_status' =>$request->type_status,
        ]);
        return response()->json($type,201);
    }
  
    public function show($id)
    {
        $type = Type::find($id);

        if (!$type) {
            return response()->json(['message' =>'Type not found'], 404);
        }

        return response()->json($type, 200);
    }

    public function update(Request $request, $id){
        $type=Type::find($id);
        if (!$type){
            return response()->json(['message'=> 'Type not found'],404);
        }
        $request -> validate([
            'type_name'=>'required|string|max:255',
            'type_status' => 'required|integer|between:0,1',
        ]);
        $type->update([
            'type_id'=>$id,
            'type_name' =>$request->type_name,
            'type_status' =>$request->type_status,
        ]);
        return response()->json($type,201);
    }

    public function destroy($id)
    {
        $type=Type::find($id);
        if(!$type){
            return response()->json(['mesage' =>'Type not found'],404);
        }
        $type->delete();
        return response()->json(['mesage' =>'Type deleted successfully'],200);
    }
}
