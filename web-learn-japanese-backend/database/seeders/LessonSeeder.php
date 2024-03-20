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
                'lesson_description' => $lesson[4],
                'lesson_img' => $lesson[5],
                'lesson_status' => $lesson[6],
            ]);
        }
    }

    public function getLesson() {
        return [
            [1, NULL, 1, 'Bảng chữ cái Hiragana', NULL, 'storage/app/public/img/alphabet/hiragana.png', 1],
            [2, NULL, 1, 'Bảng chữ cái Katakana', NULL, 'storage/app/public/img/alphabet/katakana.png', 1],
            [3, NULL, 2, 'Bài 1 - Minna no Nihongo', NULL, 'storage/app/public/img/minna_no_nihongo/minna_no_nihongo_lesson1.png', 1],
            [4, NULL, 2, 'Bài 2 - Minna no Nihongo', NULL, 'storage/app/public/img/minna_no_nihongo/minna_no_nihongo_lesson2.png', 1],
            [5, NULL, 2, 'Bài 3 - Minna no Nihongo', NULL, 'storage/app/public/img/minna_no_nihongo/minna_no_nihongo_lesson3.png', 1],
            [6, NULL, 2, 'Bài 4 - Minna no Nihongo', NULL, 'storage/app/public/img/minna_no_nihongo/minna_no_nihongo_lesson4.png', 1],
            [7, NULL, 2, 'Bài 5 - Minna no Nihongo', NULL, 'storage/app/public/img/minna_no_nihongo/minna_no_nihongo_lesson5.png', 1],
            [8, NULL, 2, 'Bài 6 - Minna no Nihongo', NULL, 'storage/app/public/img/minna_no_nihongo/minna_no_nihongo_lesson6.png', 1],
        ];
    }
}
