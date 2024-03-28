<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VocabularySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vocabularys = $this->getVocabulary();
        foreach($vocabularys as $vocabulary) {
            DB::table('tbl_vocabulary')->insert([
                'vocabulary_id' => $vocabulary[0],
                'lesson_id' => $vocabulary[1],
                'vocabulary_name' => $vocabulary[2],
                'vocabulary_character' => $vocabulary[3],
                'vocabulary_yin_han' => $vocabulary[4],
                'vocabulary_mean' => $vocabulary[5],
                'vocabulary_audio' => $vocabulary[6],
                'vocabulary_status' => $vocabulary[7],
            ]);
        }
    }

    public function getVocabulary() {
        return [
            [1, 3, 'わたし', '私', NULL, 'tôi', 'http://127.0.0.1:8000/storage/audio/watashi.mp3',1],
            [2, 3, 'あなた', NULL, NULL, 'anh/chị/ông/bà', 'http://127.0.0.1:8000/storage/audio/anata.mp3',1],
            [3, 3, 'あのひと', 'あの人', 'NHÂN', 'người kia, người đó', 'http://127.0.0.1:8000/storage/audio/anohito.mp3',1],
            [4, 3, 'あのかた', 'あの方', 'PHƯƠNG', 'vị kia, cách nói lịch sự của あのひと', 'http://127.0.0.1:8000/storage/audio/anokata.mp3',1],
            [5, 3, '～さん', NULL, NULL, 'anh, chị, ông, bà', 'http://127.0.0.1:8000/storage/audio/san.mp3',1],
            [6, 3, '～ちゃん', NULL, NULL, 'hậu tố thêm vào sau tên trẻ em (thay cho ～さん)', 'http://127.0.0.1:8000/storage/audio/chan.mp3',1],
            [7, 3, '～じん', '～人', 'NHÂN', 'người nước ~', 'http://127.0.0.1:8000/storage/audio/jin.mp3',1],
            [8, 3, 'せんせい', '先生', 'TIÊN SINH', 'thầy, cô', 'http://127.0.0.1:8000/storage/audio/sensei.mp3',1],
            [9, 3, 'きょうし', '教師', 'GIÁO SƯ', 'giáo viên', 'http://127.0.0.1:8000/storage/audio/kyoshi.mp3',1],
        ];
    }
}
