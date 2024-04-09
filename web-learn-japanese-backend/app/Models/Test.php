<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $table = 'tbl_test';
    protected $primaryKey = 'test_id';
    protected $fillable = ['lesson_id', 'test_name', 'test_score', 'is_complete', 'test_status'];
    public $timestamps = false;

    public function lesson() {
        return $this->belongsTo(Lesson::class, 'lesson_id', 'lesson_id');
    }

    public function question() {
        return $this->hasMany(Question::class, 'question_id', 'question_id');
    }
}
