<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\Type;
use App\Models\LessonUser;

class LessonController extends Controller
{
    public function get_all_lesson()
    {
        $lessons = Lesson::all();
        return response()->json($lessons, 200);
    }

    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 5);
        $page = $request->input('page', 1);
    
        $totalLessons = Lesson::count();
        $totalPages = ceil($totalLessons / $perPage);
        $lessons = Lesson::with('type')
                        ->skip(($page - 1) * $perPage)
                        ->take($perPage)
                        ->get();
                        
        return response()->json([
            'lessons' => $lessons,
            'totalPages' => $totalPages
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'type_id'=>'required|integer',
            'lesson_name'=>'required|string|max:255',
            'lesson_img'=>'required|string|max:255',
            'lesson_status' => 'required|integer|between:0,1',
        ]);
        $lesson=Lesson::create([
            'type_id'=>$request->type_id,
            'lesson_name'=>$request->lesson_name,
            'lesson_img'=>$request->lesson_img,
            'lesson_status'=>$request->lesson_status
        ]);
        return response()->json($lesson, 201);
    }

    public function show($id)
    {
        $lesson = Lesson::with('type')->find($id);

        if (!$lesson) {
            return response()->json(['message' =>'Lesson not found'], 404);
        }

        return response()->json($lesson, 200);
    }

    public function update( Request $request, $id){
        $lesson = Lesson::findOrFail($id);
        if (!$lesson){
            return response()->json(['mesage'=>'Lesson not found'], 404);
        }
        $request->validate([
            'type_id'=>'required|integer',
            'lesson_name'=>'required|string|max:255',
            'lesson_img'=>'required|string|max:255',
            'lesson_status' => 'nullable|integer|between:0,1',
        ]);
        
        $lesson->update([
            'lesson_id'=>$id,
            'type_id'=>$request->type_id,
            'lesson_name'=>$request->lesson_name,
            'lesson_img'=>$request->lesson_img,
            'lesson_status'=>$request->lesson_status
        ]);
        return response()->json($lesson, 201);
    } 

    public function destroy($id){
        $lesson = Lesson::find($id);
        if (!$lesson) {
            return response()->json(['message' =>'Lesson not found'], 404);
        }
        $lesson->delete();
        return response()->json(['message' =>'Lesson deleted successfully'], 200);
    }

    // get 8 latest lesson if status = 1
    public function getLatestLessons($userId)
    {
        $latestLessons = Lesson::where('lesson_status', 1)
                                ->orderBy('created_at', 'desc')
                                ->take(8)
                                ->get();

        $result = [];

        foreach ($latestLessons as $lesson) {
            $lessonId = $lesson->lesson_id;
            $userJoined = LessonUser::where('lesson_id', $lessonId)
                                    ->where('user_id', $userId)
                                    ->exists();
            $totalUsers = LessonUser::where('lesson_id', $lessonId)->count();

            $result[] = [
                'lesson' => $lesson,
                'total_users' => $totalUsers,
                'user_id' => $userJoined ? $userId : null 
            ];
        }
        return response()->json($result);
    }

    // get lesson by user_id
    public function getLessonsByIdUser($userId)
    {
        $userLessons = LessonUser::where('user_id', $userId)
            ->whereHas('lesson', function ($query) {
                $query->where('lesson_status', 1);
            })
            ->with('lesson')
            ->get();

        $lessonsData = [];

        foreach ($userLessons as $userLesson) {
            $lessonData = $userLesson->lesson;
            $totalUsers = LessonUser::where('lesson_id', $lessonData->lesson_id)->count();
            
            $lessonsData[] = [
                'lesson' => $lessonData,
                'total_users' => $totalUsers
            ];
        }
        return response()->json($lessonsData);
    }
}
