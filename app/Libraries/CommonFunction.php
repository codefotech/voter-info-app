<?php

namespace App\Libraries;

use Illuminate\Support\Facades\Auth;


class CommonFunction
{
    public static function getUserId()
    {
        if (Auth::user()) {
            return Auth::user()->id;
        } else {
            return 0;
        }
    }

}