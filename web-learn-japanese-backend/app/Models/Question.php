<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $table = 'tbl_question';
    protected $primaryKey = 'question_id';
    protected $fillable = ['test_id', 'question_name', 'question_img', 'question_audio', 'question_status'];
    public $timestamps = false;

    public function test() {
        return $this->belongsTo(Test::class, 'test_id', 'test_id');
    }

    public function answer() {
        return $this->hasMany(Answer::class, 'question_id', 'question_id');
    }
}
