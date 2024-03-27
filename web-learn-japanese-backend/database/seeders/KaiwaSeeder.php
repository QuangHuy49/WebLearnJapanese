<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KaiwaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kaiwas = $this->getKaiwa();
        foreach($kaiwas as $kaiwa) {
            DB::table('tbl_kaiwa')->insert([
                'kaiwa_id' => $kaiwa[0],
                'lesson_id' => $kaiwa[1],
                'kaiwa_name' => $kaiwa[2],
                'kaiwa_mean' => $kaiwa[3],
                'kaiwa_audio' => $kaiwa[4],
                'kaiwa_status' => $kaiwa[5]
            ]);
        }
    }

    public function getKaiwa() {
        return [
            [1, 1, '初めまして。', 'Rất vui được gặp anh/chị.', 'http://127.0.0.1:8000/storage/audio/hajimemashite.mp3', 1],
            [2, 1, 'どうぞよろしく「お願いします」。', 'Rất vui khi được làm quen.', 'http://127.0.0.1:8000/storage/audio/douzo.mp3', 1],
            [3, 1, '～から来ました。', 'Tôi đến từ ～.', 'http://127.0.0.1:8000/storage/audio/karakimashita.mp3', 1],
            [4, 1, 'お名前は？', 'Tên anh/chị là gì?', 'http://127.0.0.1:8000/storage/audio/onamae.mp3', 1],
            [5, 1, 'どちらは～さんです。', 'Đây là anh/chị/ông/bà ～.', 'http://127.0.0.1:8000/storage/audio/dochirawa.mp3', 1]
        ];
    }
}
