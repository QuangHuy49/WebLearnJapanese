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
            [9, 2, 'Bài 7 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson7.png', 1, '2023-07-04 12:26:00'],
            [10, 2, 'Bài 8 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson8.png', 1, '2023-07-04 12:27:00'],
            [11, 2, 'Bài 9 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson9.png', 1, '2023-07-04 12:28:00'],
            [12, 2, 'Bài 10 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson10.png', 1, '2024-07-04 12:29:00'],
            [13, 2, 'Bài 11 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson11.png', 1, '2024-07-04 12:30:00'],
            [14, 2, 'Bài 12 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson12.png', 1, '2024-07-04 12:31:00'],
            [15, 2, 'Bài 13 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson13.png', 1, '2024-07-04 12:32:00'],
            [16, 2, 'Bài 14 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson14.png', 1, '2024-07-04 12:33:00'],
            [17, 2, 'Bài 15 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson15.png', 1, '2024-07-04 12:34:00'],
            [18, 2, 'Bài 16 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson16.png', 1, '2024-07-04 12:35:00'],
            [19, 2, 'Bài 17 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson17.png', 1, '2024-07-04 12:36:00'],
            [20, 2, 'Bài 18 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson18.png', 1, '2024-07-04 12:37:00'],
            [21, 2, 'Bài 19 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson19.png', 1, '2024-07-04 12:38:00'],
            [22, 2, 'Bài 20 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson20.png', 1, '2024-07-04 12:39:00'],
            [23, 2, 'Bài 21 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson21.png', 1, '2024-07-04 12:40:00'],
            [24, 2, 'Bài 22 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson22.png', 1, '2024-07-04 12:41:00'],
            [25, 2, 'Bài 23 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson23.png', 1, '2024-07-04 12:42:00'],
            [26, 2, 'Bài 24 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson24.png', 1, '2024-07-04 12:43:00'],
            [27, 2, 'Bài 25 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson25.png', 1, '2024-07-04 12:44:00'],
            [28, 4, 'Bài 26 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson26.png', 1, '2024-07-04 12:45:00'],
            [29, 4, 'Bài 27 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson27.png', 1, '2024-07-04 12:46:00'],
            [30, 4, 'Bài 28 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson28.png', 1, '2024-07-04 12:47:00'],
            [31, 4, 'Bài 29 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson29.png', 1, '2024-07-04 12:48:00'],
            [32, 4, 'Bài 30 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson30.png', 1, '2024-07-04 12:49:00'],
            [33, 4, 'Bài 31 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson31.png', 1, '2024-07-04 12:50:00'],
            [34, 4, 'Bài 32 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson32.png', 1, '2024-07-04 12:51:00'],
            [35, 4, 'Bài 33 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson33.png', 1, '2024-07-04 12:52:00'],
            [36, 4, 'Bài 34 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson34.png', 1, '2024-07-04 12:53:00'],
            [37, 4, 'Bài 35 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson35.png', 1, '2024-07-04 12:54:00'],
            [38, 4, 'Bài 36 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson36.png', 1, '2024-07-04 12:55:00'],
            [39, 4, 'Bài 37 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson37.png', 1, '2024-07-04 12:56:00'],
            [40, 4, 'Bài 38 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson38.png', 1, '2024-07-04 12:57:00'],
            [41, 4, 'Bài 39 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson39.png', 1, '2024-07-04 12:58:00'],
            [42, 4, 'Bài 40 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson40.png', 1, '2024-07-04 12:59:00'],
            [43, 4, 'Bài 41 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson41.png', 1, '2024-07-04 13:00:00'],
            [44, 4, 'Bài 42 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson42.png', 1, '2024-07-04 13:01:00'],
            [45, 4, 'Bài 43 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson43.png', 1, '2024-07-04 13:02:00'],
            [46, 4, 'Bài 44 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson44.png', 1, '2024-07-04 13:03:00'],
            [47, 4, 'Bài 45 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson45.png', 1, '2024-07-04 13:04:00'],
            [48, 4, 'Bài 46 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson46.png', 1, '2024-07-04 13:05:00'],
            [49, 4, 'Bài 47 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson47.png', 1, '2024-07-04 13:06:00'],
            [50, 4, 'Bài 48 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson48.png', 1, '2024-07-04 13:07:00'],
            [51, 4, 'Bài 49 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson49.png', 1, '2024-07-04 13:08:00'],
            [52, 4, 'Bài 50 - Minna no Nihongo', 'http://127.0.0.1:8000/storage/img/minna_no_nihongo/minna_no_nihongo_lesson50.png', 1, '2024-07-04 13:09:00'],
        ];
    }
}
