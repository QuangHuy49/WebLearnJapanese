<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Facades\DB;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $request->validate([
            'test_id'=>'required|integer',
            'question_name'=>'required|string|max:255',
            'question_img'=>'required|string|max:255',
            'question_audio'=>'required|string|max:255',
            'question_status' => 'required|integer|between:0,1'
        ]);
        
        $question = Question::create([
            'test_id' => $request->test_id,
            'question_name' => $request->question_name,
            'question_img' => $request->question_img,
            'question_audio' => $request->question_audio,
            'question_status' => $request->question_status
        ]);
        return response()->json($question, 201);
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
        $question = Question::with('test')->find($id);

        if (!$question) {
            return response()->json(['message' =>'Question not found'], 404);
        }

        return response()->json($question, 200);
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
        $question = Question::findOrFail($id);

        if (!$question){
            return response()->json(['mesage'=>'Question not found'], 404);
        }

        $request->validate([
            'test_id'=>'required|integer',
            'question_name'=>'required|string|max:255',
            'question_img'=>'required|string|max:255',
            'question_audio'=>'required|string|max:255',
            'question_status' => 'required|integer|between:0,1'
        ]);
        
        $question->update([
            'test_id' => $request->test_id,
            'question_name' => $request->question_name,
            'question_img' => $request->question_img,
            'question_audio' => $request->question_audio,
            'question_status' => $request->question_status
        ]);

        return response()->json($question, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['message' =>'Question not found'], 404);
        }

        $question->delete();
        return response()->json(['message' =>'Question deleted successfully'], 200);
    }

    // get data question by test_id with paging
    public function getQuestionDataByIdTestPaging(Request $request, $id)
    {
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
    
        $totalQuestions = Question::count();
        $totalPages = ceil($totalQuestions / $perPage);
        $questions = Question::where('test_id', $id)
                        ->skip(($page - 1) * $perPage)
                        ->take($perPage)
                        ->get();
                        
        $test = Test::find($id);
        return response()->json([
            'questions' => $questions,
            'test' => $test,
            'totalPages' => $totalPages
        ], 200);
    }

    // create question and answer
    public function createQuestionAndAnswer(Request $request)
    {
        $request->validate([
            'test_id' => 'required|integer',
            'question_name' => 'required|string|max:255',
            'question_img' => 'nullable|string|max:255',
            'question_audio' => 'nullable|string|max:255',
            'question_status' => 'required|integer|between:0,1',
            'answers' => 'required|array|min:2', 
            'answers.*.answer_name' => 'required|string|max:255',
            'answers.*.answer_img' => 'nullable|string|max:255',
            'answers.*.answer_audio' => 'nullable|string|max:255',
            'answers.*.is_correct' => 'required|boolean',
        ]);
        
        DB::beginTransaction();
    
        try {
            $question = Question::create([
                'test_id' => $request->test_id,
                'question_name' => $request->question_name,
                'question_img' => $request->question_img,
                'question_audio' => $request->question_audio,
                'question_status' => $request->question_status
            ]);
    
            foreach ($request->answers as $answerData) {
                $answer = new Answer([
                    'answer_name' => $answerData['answer_name'],
                    'answer_img' => $answerData['answer_img'],
                    'answer_audio' => $answerData['answer_audio'],
                    'answer_correct' => $answerData['is_correct'],
                ]);
                $question->answer()->save($answer);
            }
    
            DB::commit();
    
            $question = Question::with('answer')->find($question->question_id);
    
            return response()->json($question, 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to create question and answer.'], 500);
        }
    }
}
