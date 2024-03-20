<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $table = 'tbl_question';
    protected $primaryKey = 'question_id';
    protected $fillable = ['test_id', 'question_name', 'question_img', 'question_audio', 'answer_a', 'answer_b', 'answer_c', 'answer_d', 'answer_correct'];
    public $timestamps = false;

    public function test() {
        return $this->belongsTo(Test::class, 'test_id', 'test_id');
    }
}
