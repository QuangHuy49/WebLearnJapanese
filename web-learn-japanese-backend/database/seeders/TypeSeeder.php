<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = $this->getType();
        foreach($types as $type) {
            DB::table('tbl_type')->insert([
                'type_id' => $type[0],
                'type_name' => $type[1],
                'type_status' => $type[2],
            ]);
        }
    }

    public function getType() {
        return [
            [1, 'Bảng chữ cái', 1],
            [2, 'Minna no Nihongo (Lộ trình cơ bản N5)', 1],
            [3, 'Kanji (Lộ trình cơ bản N5)', 1],
            [4, 'Minna no Nihongo (Lộ trình cơ bản N4)', 1],
            [5, 'Kanji (Lộ trình cơ bản N4)', 1],
        ];
    }
}
