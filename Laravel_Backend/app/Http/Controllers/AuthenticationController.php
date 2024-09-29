<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function authenticate($request)
    {
       $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()){
        return response()->json([
            'status' => false,
            'errors' => $validator->errors(),
        ]);
        }
    }
}
