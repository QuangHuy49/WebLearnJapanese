<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = $this->getLanguage();
        foreach ($languages as $language) {
            DB::table('tbl_language')->insert([
                'language_id' => $language[0],
                'language_name' => $language[1],
                'language_img' => $language[2]
            ]);
        }
    }

    public function getLanguage() {
        return [
            [1, 'Tiếng Việt', 'storage/app/public/img/language/vietnam.png'],
            [2, 'English', 'storage/app/public/img/language/english.png'],
            [3, '日本語', 'storage/app/public/img/language/japan.png'],
        ];
    }
}
