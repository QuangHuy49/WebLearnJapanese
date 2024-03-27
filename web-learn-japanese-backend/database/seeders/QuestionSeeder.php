<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = $this->getQuestion();
        foreach($questions as $question) {
            DB::table('tbl_question')->insert([
                'question_id' => $question[0],
                'test_id' => $question[1],
                'question_name' => $question[2],
                'question_img' => $question[3],
                'question_audio' => $question[4],
                'answer_a' => $question[5],
                'answer_b' => $question[6],
                'answer_c' => $question[7],
                'answer_d' => $question[8],
                'answer_correct' => $question[9],
                'question_status' => $question[10]
            ]);
        }
    }

    public function getQuestion() {
        return [
            [1, 1, 'a', NULL, 'http://127.0.0.1:8000/storage/audio/a.mp3', 'い', 'う', 'あ', 'え', 'C', 1],
            [2, 1, 'i', NULL, 'http://127.0.0.1:8000/storage/audio/i.mp3', 'い', 'う', 'あ', 'え', 'A', 1]
        ];
    }
}
