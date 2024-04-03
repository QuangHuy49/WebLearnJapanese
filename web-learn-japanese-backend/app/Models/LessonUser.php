<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonUser extends Model
{
    use HasFactory;

    protected $table = 'tbl_lesson_user';
    protected $primaryKey = 'id';
    protected $fillable = ['lesson_id', 'user_id'];
    public $timestamps = false;

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id', 'lesson_id');
    }
}
