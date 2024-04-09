<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $answers = $this->getAnwser();
        foreach($answers as $answer) {
            DB::table('tbl_answer')->insert([
                'answer_id' => $answer[0],
                'question_id' => $answer[1],
                'answer_name' => $answer[2],
                'answer_img' => $answer[3],
                'answer_audio' => $answer[4],
                'answer_correct' => $answer[5]
            ]);
        }
    }

    public function getAnwser() {
        return [
            [1, 1, 'あ', NULL, 'http://127.0.0.1:8000/storage/audio/a.mp3', true],
            [2, 1, 'い', NULL, 'http://127.0.0.1:8000/storage/audio/i.mp3', false],
            [3, 1, 'う', NULL, 'http://127.0.0.1:8000/storage/audio/u.mp3', false],
            [4, 1, 'え', NULL, 'http://127.0.0.1:8000/storage/audio/e.mp3', false],
            [5, 2, 'え', NULL, 'http://127.0.0.1:8000/storage/audio/e.mp3', false],
            [6, 2, 'う', NULL, 'http://127.0.0.1:8000/storage/audio/u.mp3', false],
            [7, 2, 'い', NULL, 'http://127.0.0.1:8000/storage/audio/u.mp3', true],
            [8, 2, 'お', NULL, 'http://127.0.0.1:8000/storage/audio/o.mp3', false],
            [9, 3, 'え', NULL, 'http://127.0.0.1:8000/storage/audio/e.mp3', false],
            [10, 3, 'う', NULL, 'http://127.0.0.1:8000/storage/audio/u.mp3', true],
            [11, 3, 'い', NULL, 'http://127.0.0.1:8000/storage/audio/u.mp3', false],
            [12, 3, 'お', NULL, 'http://127.0.0.1:8000/storage/audio/o.mp3', false],
            [13, 4, 'お', NULL, 'http://127.0.0.1:8000/storage/audio/0.mp3', false],
            [14, 4, 'お', NULL, 'http://127.0.0.1:8000/storage/audio/a.mp3', false],
            [15, 4, 'い', NULL, 'http://127.0.0.1:8000/storage/audio/u.mp3', false],
            [16, 4, 'え', NULL, 'http://127.0.0.1:8000/storage/audio/e.mp3', true],
            [17, 5, 'お', NULL, 'http://127.0.0.1:8000/storage/audio/0.mp3', false],
            [18, 5, 'お', NULL, 'http://127.0.0.1:8000/storage/audio/a.mp3', true],
            [19, 5, 'い', NULL, 'http://127.0.0.1:8000/storage/audio/u.mp3', false],
            [20, 5, 'え', NULL, 'http://127.0.0.1:8000/storage/audio/e.mp3', false],
        ];
    }
}
