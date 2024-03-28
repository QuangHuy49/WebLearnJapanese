<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GrammarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grammars = $this->getGrammar();
        foreach($grammars as $grammar) {
            DB::table('tbl_grammar')->insert([
                'grammar_id' => $grammar[0],
                'lesson_id' => $grammar[1],
                'grammar_title' => $grammar[2],
                'grammar_mean' => $grammar[3],
                'grammar_detail' => $grammar[4],
                'grammar_example' => $grammar[5],
                'grammar_note' => $grammar[6],
                'grammar_status' => $grammar[7]
            ]);
        }
    }

    public function getGrammar() {
        return [
            [1, 3, 'Danh từ 1 は Danh từ 2 です。', 'Danh từ 1 là Danh từ 2.', 'Trợ từ 「は」 được dừng sau Danh từ 1 để biểu thị Danh từ 1 là chủ đề của câu. です được dùng ở cuối câu khẳng định thì hiện tại dạng “Danh từ 1 là Danh từ 2” và thể hiện sự tôn trọng, lịch sự đối với người nghe. Trợ từ「は」đọc là 「わ」。', '私 は 学生 です。(Tôi là sinh viên.)', NULL,1],
            [2, 3, 'Danh từ 1 は Danh từ 2 じゃ ありません。', 'Danh từ 1 không phải là Danh từ 2.', 'じゃ ありません là phủ định của です. じゃ ありません sử dụng trong giao tiếp hàng ngày. では ありません sử dụng trong văn viết.', '私 は 銀行員じゃ（では）ありません。(Tôi không phải là nhân viên ngân hàng.)', NULL,1],
            [3, 3, '～は ～ですか。', '~ là ~ phải không', 'Trợ từ 「か」được đặt ở cuối câu để biến câu đó thành câu nghi vấn. Khi trả lời câu hỏi dạng này, ta phải bắt đầu bằng các từ はい hoặc いいえ.', '例 1 (ví dụ 1) A: ハイさんはいしゃですか。B: はい、いしゃです。例 2 (ví dụ 2) A: やまださんは会社員ですか。B: いいえ、会社員じゃありません。銀行員です。', NULL,1],
        ];
    }
}
