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
                'question_status' => $question[5]
            ]);
        }
    }

    public function getQuestion() {
        return [
            [1, 1, 'a', NULL, 'http://127.0.0.1:8000/storage/audio/alphabet/a/a.mp3', 1],
            [2, 1, 'i', NULL, 'http://127.0.0.1:8000/storage/audio/alphabet/a/i.mp3', 1],
            [3, 1, 'u', NULL, 'http://127.0.0.1:8000/storage/audio/alphabet/a/u.mp3', 1],
            [4, 1, 'e', NULL, 'http://127.0.0.1:8000/storage/audio/alphabet/a/e.mp3', 1],
            [5, 1, 'o', NULL, 'http://127.0.0.1:8000/storage/audio/alphabet/a/o.mp3', 1]
        ];
    }
}
