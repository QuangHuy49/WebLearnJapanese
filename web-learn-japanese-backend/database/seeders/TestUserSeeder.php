<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $test_user = $this->getTestUser();
        foreach($test_user as $item) {
            DB::table('tbl_test_user')->insert([
                'id' => $item[0],
                'user_id' => $item[1],
                'test_id' => $item[2],
                'is_complete' => $item[3],
                'score' => $item[4]
            ]);
        }
    }

    public function getTestUser() {
        return [
            [1, 3, 1, 1, 2],
            [2, 3, 2, 1, 1],
            [3, 3, 3, 0, null],
            [4, 3, 4, 0, null],
            [5, 3, 5, 0, null],
            [6, 3, 6, 0, null],
            [7, 3, 7, 0, null],
            [8, 3, 8, 0, null],
            [9, 3, 9, 0, null],
            [10, 3, 10, 0, null],
        ];
    }
}
