<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comments = $this->getComment();
        foreach($comments as $comments) {
            DB::table('tbl_comment')->insert([
                'id' => $comments[0],
                'user_id' => $comments[1],
                'post_id' => $comments[2],
                'comment_content' => $comments[3],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }

    public function getComment() {
        return [
            [1, 3, 1, 'Hay quá!'],
            [2, 4, 1, 'Rất hữu ích.'],
            [3, 5, 1, 'すごいね。'],
            [4, 6, 1, 'ありがとうございます。'],
            [5, 7, 1, 'Bài viết bổ ích, cảm ơn tác giả.'],
            [6, 8, 1, 'そうですね。'],
            [7, 9, 1, 'Đỉnh quá'],
            [8, 10, 1, 'Hi'],
            [9, 11, 1, 'ありがとうございます。'],
            [10, 12, 1, 'ありがとうございます。'],
            [11, 3, 2, 'ありがとうございます。']
        ];
    }
}
