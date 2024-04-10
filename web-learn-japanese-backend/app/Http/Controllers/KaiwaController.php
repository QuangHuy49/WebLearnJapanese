<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kaiwa;
use App\Models\Lesson;

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
    public function show($id)
    {
        $kaiwa = Kaiwa::with('lesson')->find($id);

        if (!$kaiwa) {
            return response()->json(['message' =>'Kaiwa not found'], 404);
        }

        return response()->json($kaiwa, 200);
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
        $kaiwa = Kaiwa::findOrFail($id);
        if (!$kaiwa){
            return response()->json(['message' => 'Kaiwa not found'], 404);
        }
        $request -> validate([
            'lesson_id'=>'required|int',
            'kaiwa_name'=>'required|string|max:255',
            'kaiwa_mean'=>'required|string|max:255',
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
        return response()->json($kaiwa, 201);
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

    // get data kaiwa by lesson_id
    public function getKaiwaDataByIdLessonPaging(Request $request, $id)
    {
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
    
        $totalkaiwas = Kaiwa::count();
        $totalPages = ceil($totalkaiwas / $perPage);
        $kaiwas = Kaiwa::where('lesson_id', $id)
                        ->skip(($page - 1) * $perPage)
                        ->take($perPage)
                        ->get();
                        
        $lesson = Lesson::find($id);
        return response()->json([
            'kaiwas' => $kaiwas,
            'lesson' => $lesson,
            'totalPages' => $totalPages
        ], 200);
    }

    // get data kaiwa by lesson_id with no paging
    public function getKaiwaDataByIdLesson(Request $request, $id)
    {
        $kaiwas = Kaiwa::where('lesson_id', $id)
                        ->where('kaiwa_status', 1)
                        ->get();
                        
        $lesson = Lesson::find($id);

        return response()->json([
            'kaiwas' => $kaiwas
        ], 200);
    }

    // delete kaiwa_audio by kaiwa_id
    public function deleteKaiwaAudio($id)
    {
        $kaiwa = Kaiwa::find($id);

        if (!$kaiwa) {
            return response()->json(['message' => 'Kaiwa not found'], 404);
        }

        if (!empty($kaiwa->kaiwa_audio)) {
            $kaiwa->update(['kaiwa_audio' => null]);

            return response()->json(['message' => 'Kaiwa audio deleted successfully'], 200);
        }
    }
}
