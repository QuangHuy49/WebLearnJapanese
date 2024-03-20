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
                'kaiwa_audio' => $kaiwa[4]
            ]);
        }
    }

    public function getKaiwa() {
        return [
            [1, 1, '初めまして。', 'Rất vui được gặp anh/chị.', './audio/hajimemashite.mp3'],
            [2, 1, 'どうぞよろしく「お願いします」。', 'Rất vui khi được làm quen.', './audio/douzo.mp3'],
            [3, 1, '～から来ました。', 'Tôi đến từ ～.', './audio/karakimashita.mp3'],
            [4, 1, 'お名前は？', 'Tên anh/chị là gì?', './audio/onamae.mp3'],
            [5, 1, 'どちらは～さんです。', 'Đây là anh/chị/ông/bà ～.', './audio/dochirawa.mp3']
        ];
    }
}
