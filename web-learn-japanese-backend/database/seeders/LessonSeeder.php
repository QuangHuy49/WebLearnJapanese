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
                'type_id' => $lesson[1],
                'lesson_name' => $lesson[2],
                'lesson_img' => $lesson[3],
                'lesson_status' => $lesson[4],
                'created_at' => $lesson[5],
                'updated_at' => $lesson[5],
            ]);
        }
    }

    public function getLesson() {
        return [
            [1, 1, 'Bảng chữ cái Hiragana', 'http://127.0.0.1:8000/storage/img/alphabet/hiragana.png', 1, '2023-02-11 09:00:00'],
            [2, 1, 'Bảng chữ cái Katakana', 'http://127.0.0.1:8000/storage/img/alphabet/katakana.png', 1, '2023-02-12 10:00:00'],
            [3, 2, 'Bài 1 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson1.png', 1, '2023-02-12 11:00:00'],
            [4, 2, 'Bài 2 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson2.png', 1, '2023-04-12 14:00:00'],
            [5, 2, 'Bài 3 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson3.png', 1, '2023-04-12 16:00:00'],
            [6, 2, 'Bài 4 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson4.png', 1, '2023-06-02 10:00:00'],
            [7, 2, 'Bài 5 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson5.png', 1, '2023-08-07 13:00:00'],
            [8, 2, 'Bài 6 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson6.png', 1, '2023-12-25 23:00:00'],
        ];
    }
}
