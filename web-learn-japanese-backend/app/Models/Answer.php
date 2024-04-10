<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $table = 'tbl_answer';
    protected $primaryKey = 'answer_id';
    protected $fillable = ['question_id', 'answer_name', 'answer_img', 'answer_audio', 'answer_correct'];
    public $timestamps = false;

    public function question() {
        return $this->belongsTo(Question::class, 'question_id', 'question_id');
    }
}
