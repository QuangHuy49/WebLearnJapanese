<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $likes = $this->getLike();
        foreach($likes as $item) {
            DB::table('tbl_like')->insert([
                'id' => $item[0],
                'user_id' => $item[1],
                'post_id' => $item[2]
            ]);
        }
    }

    public function getLike() {
        return [
            [1, 3, 1],
            [2, 4, 1],
            [3, 5, 1],
            [4, 6, 1],
            [5, 7, 1],
            [6, 8, 1],
            [7, 9, 1],
            [8, 10, 1],
            [9, 11, 1],
            [10, 12, 1],
            [11, 3, 2]
        ];
    }
}
