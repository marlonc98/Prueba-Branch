<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected  $primaryKey = 'id';

    protected $fillable  = [
        'name', 'email', 'state', 'city'
    ];
    public $timestamps = false;

}
