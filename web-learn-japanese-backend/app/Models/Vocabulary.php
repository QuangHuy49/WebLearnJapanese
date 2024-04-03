<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vocabulary extends Model
{
    use HasFactory;

    protected $table = 'tbl_vocabulary';
    protected $primaryKey = 'vocabulary_id';
    protected $fillable = ['lesson_id', 'vocabulary_name', 'vocabulary_character', 'vocabulary_yin_han', 'vocabulary_mean', 'vocabulary_audio', 'vocabulary_status'];
    public $timestamps = false;

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id');
    }
}
