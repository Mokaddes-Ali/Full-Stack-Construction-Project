<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\services;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        // thuis method will return all active services
        $services = services::where('status',1)->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $services

        ]);

    }

    //this method will return latesty active serviices
    public function latestService(Request $request){
        $services = services::where('status',1)
        ->take($request ->get('limit'))
        ->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $services

        ]);

    }
}
