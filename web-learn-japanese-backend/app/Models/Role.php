<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'tbl_role';
    protected $primaryKey = 'role_id';
    protected $fillable = ['role_type'];
    public $timestamps = false;
}
