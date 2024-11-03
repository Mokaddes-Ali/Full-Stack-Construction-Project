<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'details' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $client = Client::create($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Project updated successfully'
        ]);

    }


    public function index()
    {
        return Client::all();
    }
}

