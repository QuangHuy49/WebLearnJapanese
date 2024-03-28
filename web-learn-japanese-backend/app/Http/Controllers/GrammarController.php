<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grammar;

class GrammarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grammars=Grammar::all();
        return response()->json($grammars);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'lesson_id'=>'nullable|int|max:10',
            'grammar_title'=>'required|string|max:50',
            'grammar_mean'=>'nullable|string|max:255',
            'grammar_detail'=>'required|string|max:2555',
            'grammar_example'=>'nullable|string|max:255',
            'grammar_note'=>'nullable|string|max:255',
            'grammar_status'=>'required|integer|between:0,1'
        ]);
        $grammar=Grammar::create([
            'lesson_id'=>$request->lesson_id,
            'grammar_title'=>$request->grammar_title,
            'grammar_mean'=>$request->grammar_mean,
            'grammar_detail'=>$request->grammar_detail,
            'grammar_example'=>$request->grammar_example,
            'grammar_note'=>$request->grammar_note,
            'grammar_status'=>$request->grammar_status
        ]);
        return response()->json($grammar,201);
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
        $grammar=Grammar::findOrFail($id);
        if(!$grammar){
            return response()->json(['message' => 'Grammar not found'],404);
        }
        $request->validate([
            'lesson_id'=>'nullable|int|max:10',
            'grammar_title'=>'required|string|max:50',
            'grammar_mean'=>'nullable|string|max:255',
            'grammar_detail'=>'required|string|max:2555',
            'grammar_example'=>'nullable|string|max:255',
            'grammar_note'=>'nullable|string|max:255',
            'grammar_status'=>'required|integer|between:0,1'
        ]);
    
        $grammar->update([
            'lesson_id'=>$request->lesson_id,
            'grammar_title'=>$request->grammar_title,
            'grammar_mean'=>$request->grammar_mean,
            'grammar_detail'=>$request->grammar_detail,
            'grammar_example'=>$request->grammar_example,
            'grammar_note'=>$request->grammar_note,
            'grammar_status'=>$request->grammar_status
        ]);
        return response()->json($grammar,201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $grammar=Grammar::find($id);
        if (!$grammar){
            return response()->json(['message' => 'Grammar not found'],404);
        }
        $grammar -> delete();
        return response()->json(['message' => 'Grammar deleted successfully!'],200);
    }
}