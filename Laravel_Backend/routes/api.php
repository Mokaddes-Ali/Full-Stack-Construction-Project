<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\PostController;


Route::post('register', [AuthenticationController::class, 'authenticate']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);

});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('users', [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::post('address', [UserController::class, 'store']);
Route::post('updates', [UserController::class, 'update']);




// Authentication Routes
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/register', [AuthController::class, 'register']);


    Route::get('posts', [PostController::class, 'index']);
    Route::post('posts/create', [PostController::class, 'store']);
    Route::get('posts/show/{id}', [PostController::class, 'show']);
    Route::put('posts/update/{id}', [PostController::class, 'update']);
    Route::delete('/posts/delete/{id}', [PostController::class, 'destroy']);



