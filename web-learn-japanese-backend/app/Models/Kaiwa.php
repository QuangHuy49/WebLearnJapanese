<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kaiwa extends Model
{
    use HasFactory;

    protected $table = 'tbl_kaiwa';
    protected $primaryKey = 'kaiwa_id';
    protected $fillable = ['lesson_id', 'kaiwa_name', 'kaiwa_mean', 'kaiwa_audio'];
    public $timestamps = false;

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id');
    }
}
