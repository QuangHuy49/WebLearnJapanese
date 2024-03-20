<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    protected $table = 'tbl_language';
    protected $primaryKey = 'language_id';
    protected $fillable = ['language_name', 'language_img'];
    public $timestamps = false;
}
