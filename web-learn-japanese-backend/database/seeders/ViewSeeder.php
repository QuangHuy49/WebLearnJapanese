<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $views = $this->getView();
        foreach($views as $view) {
            DB::table('tbl_view')->insert([
                'id' => $view[0],
                'user_id' => $view[1],
                'post_id' => $view[2]
            ]);
        }
    }

    public function getView() {
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
