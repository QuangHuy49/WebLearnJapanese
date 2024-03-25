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
                'is_complete' => $test[3],
                'test_status' => $test[4]

            ]);
        }
    }

    public function getTest() {
        return [
            [1, 1, 'あ - い - う - え - お', 0,1],
            [2, 1, 'か - き - く - け - こ', 0,1],
            [3, 1, 'さ - し - す - せ - そ', 0,1],
            [4, 1, 'た - ち - つ - て - と', 0,1]
        ];
    }
}
