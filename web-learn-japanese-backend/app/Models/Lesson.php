<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'tbl_lesson';
    protected $primaryKey = 'lesson_id';
    protected $fillable = ['type_id', 'lesson_name', 'lesson_description', 'lesson_img', 'lesson_status'];
  
    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    public function vocabulary()
    {
        return $this->hasMany(Vocabulary::class, 'lesson_id');
    }

    public function kaiwa()
    {
        return $this->hasMany(Kaiwa::class, 'lesson_id');
    }

    public function grammar()
    {
        return $this->hasMany(Grammar::class, 'lesson_id');
    }

    public function lessonUsers()
    {
        return $this->hasMany(LessonUser::class, 'lesson_id', 'lesson_id');
    }

    public function test()
    {
        return $this->hasMany(Test::class, 'lesson_id', 'lesson_id');
    }
}
