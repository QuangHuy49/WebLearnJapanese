<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);

        $totalTests = Test::count();
        $totalPages = ceil($totalTests / $perPage);
        $tests = Test::with('lesson')
                        ->skip(($page - 1) * $perPage)
                        ->take($perPage)
                        ->get();
                        
        return response()->json([
            'tests' => $tests,
            'totalPages' => $totalPages
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'lesson_id'=>'required|integer',
            'test_name'=>'required|string|max:255',
            'test_status' => 'required|integer|between:0,1',
        ]);
        
        $test = Test::create([
            'lesson_id' => $request->lesson_id,
            'test_name' => $request->test_name,
            'test_score' => 0,
            'is_complete' => 0,
            'test_status' => $request->test_status
        ]);
        return response()->json($test, 201);
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
        $test = Test::with('lesson')->find($id);

        if (!$test) {
            return response()->json(['message' =>'Test not found'], 404);
        }

        return response()->json($test, 200);
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
        $test = Test::findOrFail($id);

        if (!$test){
            return response()->json(['mesage'=>'Test not found'], 404);
        }

        $request->validate([
            'lesson_id'=>'required|integer',
            'test_name'=>'required|string|max:255',
            'test_status' => 'required|integer|between:0,1',
        ]);
        
        $test->update([
            'lesson_id' => $request->lesson_id,
            'test_name' => $request->test_name,
            'test_status' => $request->test_status
        ]);

        return response()->json($test, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $test = Test::find($id);

        if (!$test) {
            return response()->json(['message' =>'Test not found'], 404);
        }

        $test->delete();
        return response()->json(['message' =>'Test deleted successfully'], 200);
    }

    public function get_all_test()
    {
        $tests = Test::all();
        return response()->json($tests, 200);
    }
}
