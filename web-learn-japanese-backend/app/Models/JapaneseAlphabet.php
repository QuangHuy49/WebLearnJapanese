<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JapaneseAlphabet extends Model
{
    use HasFactory;

    protected $table = 'tbl_japanese_alphabet';
    protected $primaryKey = 'alphabet_id';
    protected $fillable = ['lesson_id', 'alphabet_character', 'alphabet_romaji', 'alphabet_audio', 'alphabet_type'];
    public $timestamps = false;

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id');
    }
}
