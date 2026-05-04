<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class TestController extends Controller
{

    public function index()
    {
        $users = User::all();

        $new_arr  = $users->filter(function ($user) {
            return  $user->city == 'Safi';
        });

        print($new_arr);

    }
}
