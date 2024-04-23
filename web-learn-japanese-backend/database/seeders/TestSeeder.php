<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tests = $this->getTest();
        foreach($tests as $test) {
            DB::table('tbl_test')->insert([
                'test_id' => $test[0],
                'lesson_id' => $test[1],
                'test_name' => $test[2],
                'test_status' => $test[3]
            ]);
        }
    }

    public function getTest() {
        return [
            [1, 1, 'あ - い - う - え - お', 1],
            [2, 1, 'か - き - く - け - こ', 1],
            [3, 1, 'さ - し - す - せ - そ', 1],
            [4, 1, 'た - ち - つ - て - と', 1],
            [5, 1, 'な - に - ぬ - ね - の', 1],
            [6, 1, 'は - ひ - ふ - へ - ほ', 1],
            [7, 1, 'ま - み - む - め - も', 1],
            [8, 1, 'や - ゆ - よ', 1],
            [9, 1, 'ら - り - る - れ - ろ', 1],
            [10, 1, 'わ - を - ん', 1]
        ];
    }
}
