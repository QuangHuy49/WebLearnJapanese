<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vocabulary;

class VocabularyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vocabularies=Vocabulary::all();
        return response()->json($vocabularies);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'lesson_id'=>'nullable|int|max:10',
            'vocabulary_name'=>'required|string|max:255',
            'vocabulary_character'=>'nullable|string|max:255',
            'vocabulary_yin_han'=>'nullable|string|max:255',
            'vocabulary_mean'=>'required|string|max:255',
            'vocabulary_audio'=>'nullable|string|max:255',
            'vocabulary_status'=>'required|integer|between:0,1'
        ]);
        $vocabulary=Vocabulary::create([
            'lesson_id'=>$request->lesson_id,
            'vocabulary_name'=>$request->vocabulary_name,
            'vocabulary_character'=>$request->vocabulary_character,
            'vocabulary_yin_han'=>$request->vocabulary_yin_han,
            'vocabulary_mean'=>$request->vocabulary_mean,
            'vocabulary_audio'=>$request->vocabulary_audio,
            'vocabulary_status'=>$request->vocabulary_status,
        ]);
        return response()->json($vocabulary,201);
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
        $vocabulary = Vocabulary::with('lesson')->find($id);

        if (!$vocabulary) {
            return response()->json(['message' =>'Vocabulary not found'], 404);
        }

        return response()->json($vocabulary, 200);
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
    public function update(Request $request,$id)
    {
        $vocabulary=Vocabulary::findOrFail($id);
        if(!$vocabulary){
            return response()->json(['message'=>'Vocabulary not found'],404);
        }
        $request->validate([
            'lesson_id'=>'nullable|int|max:10',
            'vocabulary_name'=>'required|string|max:255',
            'vocabulary_character'=>'nullable|string|max:255',
            'vocabulary_yin_han'=>'nullable|string|max:255',
            'vocabulary_mean'=>'required|string|max:255',
            'vocabulary_audio'=>'nullable|string|max:255',
            'vocabulary_status'=>'required|integer|between:0,1'
        ]);
        $vocabulary->update([
            'lesson_id'=>$request->lesson_id,
            'vocabulary_name'=>$request->vocabulary_name,
            'vocabulary_character'=>$request->vocabulary_character,
            'vocabulary_yin_han'=>$request->vocabulary_yin_han,
            'vocabulary_mean'=>$request->vocabulary_mean,
            'vocabulary_audio'=>$request->vocabulary_audio,
            'vocabulary_status'=>$request->vocabulary_status
        ]);
        return response()->json($vocabulary,201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vocabulary=Vocabulary::find($id);
        if(!$vocabulary){
            return response()->json(['message'=>'Vocabulary not found'],404);
        }
        $vocabulary -> delete();
        return response()->json(['message'=>'Vocabulary deleted successfully!'],200);
    }
}
