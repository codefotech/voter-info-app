<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Libraries\CommonFunction;
use Illuminate\Support\Facades\Auth;

class Upazila extends Model
{
    protected $table = 'upazila_info';

    protected $fillable = [
        'si',
        'name',
        'district',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->created_by = self::getUserId();
            $model->updated_by = self::getUserId();
        });

        static::updating(function ($model) {
            $model->updated_by = self::getUserId();
        });
    }

    public static function getUserId()
    {
        if (Auth::user()) {
            return Auth::user()->id;
        } else {
            return 0;
        }
    }
}
