<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Workbench\App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request)
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
        } else{
            $credentials = [
                'email' => $request->email,
                 'password' => $request->password];

            if (Auth::attempt( $credentials)) {

                $user = User::find(Auth::user()->id);
                $user->createToken('token')->delete();

                return Auth::user();

        } else {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
            ]);
        }
    }
}
}
