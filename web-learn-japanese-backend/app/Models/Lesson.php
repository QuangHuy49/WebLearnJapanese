<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'tbl_lesson';
    protected $primaryKey = 'lesson_id';
    protected $fillable = ['user_id', 'type_id', 'lesson_name', 'lesson_description', 'lesson_img', 'lesson_status'];
    public $timestamps = false;

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
  
    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }
}
