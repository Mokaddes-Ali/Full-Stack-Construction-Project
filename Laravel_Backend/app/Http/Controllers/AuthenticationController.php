<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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
            //else
        } else{
            $credentials = [
                'email' => $request->email,
                 'password' => $request->password];

            if (Auth::attempt( $credentials)) {

                $user = User::find(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'token' => $token,
                    'id' => Auth::user()->id
                ]);



        } else {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
            ]);
        }
    }
   }

    public function logout()
    {
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged out',
        ]);
    }
}
