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
            [1, 3, 'わたし', '私', NULL, 'tôi', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/watashi.mp3', 1],
            [2, 3, 'あなた', NULL, NULL, 'anh/chị/ông/bà', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/anata.mp3', 1],
            [3, 3, 'あのひと', 'あの人', 'NHÂN', 'người kia, người đó', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/anohito.mp3', 1],
            [4, 3, 'あのかた', 'あの方', 'PHƯƠNG', 'vị kia, cách nói lịch sự của あのひと', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/anokata.mp3', 1],
            [5, 3, '～さん', NULL, NULL, 'anh, chị, ông, bà', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/san.mp3', 1],
            [6, 3, '～ちゃん', NULL, NULL, 'hậu tố thêm vào sau tên trẻ em (thay cho ～さん)', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/chan.mp3', 1],
            [7, 3, '～じん', '～人', 'NHÂN', 'người nước ~', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/jin.mp3', 1],
            [8, 3, 'せんせい', '先生', 'TIÊN SINH', 'thầy, cô', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/sensei.mp3', 1],
            [9, 3, 'きょうし', '教師', 'GIÁO SƯ', 'giáo viên', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/kyoushi.mp3', 1],
            [10, 3, 'がくせい', '学生', 'HỌC SINH', 'học sinh, sinh viên', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/gakusei.mp3',1],
            [11, 3, 'かいしゃいん', '会社員', 'HỘI XÃ VIÊN', 'nhân viên công ty', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/kaishain.mp3', 1],
            [12, 3, 'しゃいん', '社員', 'XÃ VIÊN', 'nhân viên Công ty - ví dụ 「IMCのしゃいん」', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/shain.mp3', 1],
            [13, 3, 'ぎんこういん', '銀行員', 'NGÂN HÀNH VIÊN', 'nhân viên ngân hàng', 'http://127.0.0.1:8000/storage/audio/vocabulary/minna_no_nihongo_1/ginkouin.mp3', 1],
        ];
    }
}
