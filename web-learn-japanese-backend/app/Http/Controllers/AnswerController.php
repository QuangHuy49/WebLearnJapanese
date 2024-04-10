<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Facades\DB;

class AnswerController extends Controller
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
        //
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
    public function update(Request $request)
    {
        $request->validate([
            'question_id' => 'required|integer',
            'answers' => 'required|array|min:1',
            'answers.*.answer_name' => 'required|string|max:255',
            'answers.*.answer_img' => 'nullable|string|max:255',
            'answers.*.answer_audio' => 'nullable|string|max:255',
            'answers.*.answer_correct' => 'required|boolean',
        ]);

        DB::beginTransaction();

        try {
            foreach ($request->answers as $answerData) {
                // Kiểm tra xem câu trả lời đã tồn tại chưa
                if (isset($answerData['answer_id'])) {
                    $answer = Answer::findOrFail($answerData['answer_id']);
                } else {
                    // Nếu không có ID, tạo một câu trả lời mới
                    $answer = new Answer();
                }

                // Cập nhật thông tin cho câu trả lời
                $answer->question_id = $request->question_id;
                $answer->answer_name = $answerData['answer_name'];
                $answer->answer_img = $answerData['answer_img'];
                $answer->answer_audio = $answerData['answer_audio'];
                $answer->answer_correct = $answerData['answer_correct'];
                $answer->save();
            }

            DB::commit();

            return response()->json(['message' => 'Answers updated successfully.'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to update answers.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $answer = Answer::findOrFail($id);

        if (!$answer) {
            return response()->json(['message' =>'Answer not found'], 404);
        }

        $answer->delete(); 

        return response()->json(['message' =>'Answer deleted successfully'], 200);
    }

    // get data answer by question_id with no paging
    public function getAnswerDataByIdQuestion(Request $request, $id)
    {
        $answers = Answer::where('question_id', $id)
                                    ->get();
                        
        $question = Question::find($id);

        return response()->json([
            'answers' => $answers,
            'question' => $question
        ], 200);
    }

    // delete answer_img by answer_id
    public function deleteAnswerImage($id)
    {
        $answer = Answer::find($id);

        if (!$answer) {
            return response()->json(['message' => 'Answer not found'], 404);
        }

        if (!empty($answer->answer_img)) {
            $answer->update(['answer_img' => null]);

            return response()->json(['message' => 'Answer image deleted successfully'], 200);
        }
    }

    // delete answer_audio by answer_id
    public function deleteAnswerAudio($id)
    {
        $answer = Answer::find($id);

        if (!$answer) {
            return response()->json(['message' => 'Answer not found'], 404);
        }

        if (!empty($answer->answer_audio)) {
            $answer->update(['answer_audio' => null]);

            return response()->json(['message' => 'Answer audio deleted successfully'], 200);
        }
    }
}
