<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lessons = $this->getLesson();
        foreach($lessons as $lesson) {
            DB::table('tbl_lesson')->insert([
                'lesson_id' => $lesson[0],
                'user_id' => $lesson[1],
                'type_id' => $lesson[2],
                'lesson_name' => $lesson[3],
                'lesson_img' => $lesson[4],
                'lesson_status' => $lesson[5],
            ]);
        }
    }

    public function getLesson() {
        return [
            [1, NULL, 1, 'Bảng chữ cái Hiragana', 'http://127.0.0.1:8000/storage/img/alphabet/hiragana.png', 1],
            [2, NULL, 1, 'Bảng chữ cái Katakana', 'http://127.0.0.1:8000/storage/img/alphabet/katakana.png', 1],
            [3, NULL, 2, 'Bài 1 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson1.png', 1],
            [4, NULL, 2, 'Bài 2 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson2.png', 1],
            [5, NULL, 2, 'Bài 3 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson3.png', 0],
            [6, NULL, 2, 'Bài 4 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson4.png', 1],
            [7, NULL, 2, 'Bài 5 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson5.png', 0],
            [8, NULL, 2, 'Bài 6 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson6.png', 1],
        ];
    }
}
