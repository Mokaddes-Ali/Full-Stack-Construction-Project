<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;

Route::post('register', [AuthenticationController::class, 'authenticate']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('dashboard', [DashboardController::class, 'index']);


});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


