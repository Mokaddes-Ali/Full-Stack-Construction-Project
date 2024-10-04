<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json([
            'results' => $users
        ], 200);
    }

    public function show($id)
    {
        $users = User::find($id);
        if (!$users) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        return response()->json([
            'users' => User::find($id)], 200);
    }



    public function store(UserStoreRequest $request)
    {
        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);
            return response()->json([
                'message' => "User created successfully"
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong"
            ], 500);
        }

    }


    public function update(UserStoreRequest $request, $id)
    {
        try {
            $users = User::find($id);
            if (!$users) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            $users->name = $request->name;
            $users->email = $request->email;
            $users->password = bcrypt($request->password);

            $users->save();

            return response()->json([
                'message' => "User updated successfully"
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong"
            ], 500);
        }
        // $user = User::find($id);
        // $user->update($request->all());
        // return response()->json(['user' => $user], 200);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
