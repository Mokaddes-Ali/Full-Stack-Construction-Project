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
         return   $services;
    }
}
