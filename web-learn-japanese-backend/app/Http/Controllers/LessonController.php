<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;

class LessonController extends Controller
{
    public function index()
    {
        $lessons=Lesson::all();
        return response()->json($lessons);
    }
    public function create(Request $request)
    {
        $request->validate([
            'type_id'=>'required|integer',
            'lesson_name'=>'required|string|max:255',
            'lesson_description'=>'string|max:255',
            'lesson_img'=>'required|string|max:255',
            'lesson_status' => 'nullable|integer|between:0,1',
        ]);
        $lesson=Lesson::create([
            'type_id'=>$request->type_id,
            'lesson_name'=>$request->lesson_name,
            'lesson_description'=>$request->lesson_description,
            'lesson_img'=>$request->lesson_img,
            'lesson_status'=>$request->lesson_status
        ]);
        return response()->json($lesson,201);
    }
    public function update( Request $request, $id){
        //$lesson=Lesson::find($id);
        $lesson = Lesson::findOrFail($id);
        if (!$lesson){
            return response()->json(['mesage'=>'Lesson not found'],404);
        }
        $request ->validate([
            'type_id'=>'required|integer',
            'lesson_name'=>'required|string|max:255',
            'lesson_description'=>'string|max:255',
            'lesson_img'=>'required|string|max:255',
            'lesson_status' => 'nullable|integer|between:0,1',
        ]);
        
        $lesson->update([
            'lesson_id'=>$id,
            'type_id'=>$request->type_id,
            'lesson_name'=>$request->lesson_name,
            'lesson_description'=>$request->lesson_description,
            'lesson_img'=>$request->lesson_img,
            'lesson_status'=>$request->lesson_status
        ]);
        return response()->json($lesson,201);
    } 
    public function destroy($id){
        $lesson=Lesson::find($id);
        if(!$lesson){
            return response()->json(['message' =>'Lesson not found'],404);
        }
        $lesson->delete();
        return response()->json(['message' =>'Lesson deleted successfully'],200);
    }
}
