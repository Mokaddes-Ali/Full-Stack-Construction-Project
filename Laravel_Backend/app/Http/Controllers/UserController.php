<?php

namespace App\Http\Controllers;

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

    

    public function store(Request $request)
    {
        $user = User::create($request->all());
        return response()->json(['user' => $user], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->update($request->all());
        return response()->json(['user' => $user], 200);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
