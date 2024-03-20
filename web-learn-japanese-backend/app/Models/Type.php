<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    protected $table = 'tbl_type';
    protected $primaryKey = 'type_id';
    protected $fillable = ['type_name', 'type_status'];
    public $timestamps = false;
}
