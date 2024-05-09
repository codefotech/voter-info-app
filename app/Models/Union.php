<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Libraries\CommonFunction;
use Illuminate\Support\Facades\Auth;

class Union extends Model
{
    protected $table = 'union';

    protected $fillable = [
        'name',
        'upazila',
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
