<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kaiwa;

class KaiwaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kaiwas=Kaiwa::all();
        return response()->json($kaiwas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request-> validate([
            'lesson_id'=>'nullable|int',
            'kaiwa_name'=>'nullable|string|max:255',
            'kaiwa_mean'=>'nullable|string|max:255',
            'kaiwa_audio'=>'nullable|string|max:255',
            'kaiwa_status'=>'required|integer|between:0,1'
        ]);
        $kaiwa=Kaiwa::create([
            'lesson_id'=>$request->lesson_id,
            'kaiwa_name'=>$request->kaiwa_name,
            'kaiwa_mean'=>$request->kaiwa_mean,
            'kaiwa_audio'=>$request->kaiwa_audio,
            'kaiwa_status'=>$request->kaiwa_status
        ]);
        return response()->json($kaiwa,201);
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
        $kaiwa=Kaiwa::findOrFail($id);
        if (!$kaiwa){
            return response()->json(['message' => 'Kaiwa not found'],404);
        }
        $request -> validate([
            'lesson_id'=>'nullable|int|10',
            'kaiwa_name'=>'nullable|string|max:255',
            'kaiwa_mean'=>'nullable|string|max:255',
            'kaiwa_audio'=>'nullable|string|max:255',
            'kaiwa_status'=>'required|integer|between:0,1'
        ]);
        $kaiwa->update([
            'lesson_id'=>$request->lesson_id,
            'kaiwa_name'=>$request->kaiwa_name,
            'kaiwa_mean'=>$request->kaiwa_mean,
            'kaiwa_audio'=>$request->kaiwa_audio,
            'kaiwa_status'=>$request->kaiwa_status
        ]);
        return response()->json($kaiwa,201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $kaiwa=Kaiwa::find($id);
        if (!$kaiwa){
            return response()->json(['message'=>'Kaiwa not found'],404);
        }
        $kaiwa -> delete();
        return response()->json(['message'=>'Kaiwa deleted successfully'],200);
    }
}
