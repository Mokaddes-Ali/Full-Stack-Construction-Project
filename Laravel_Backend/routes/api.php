<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServicesController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\HeroSliderController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Models\HeroSlider;
use App\Http\Controllers\ClientController;

Route::post('register', [AuthenticationController::class, 'authenticate']);
Route::post('/user_register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::get('get-services', [FrontServiceController::class, 'index']);
Route::get('get-latest-service', [FrontServiceController::class, 'latestService']);




//client

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/clients/store', [ClientController::class, 'store']);
    Route::get('/clients', [ClientController::class, 'index']);
});




Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('logout', [AuthenticationController::class, 'logout']);



    Route::get('services',[ServicesController::class, 'index']);
    Route::post('services/store',[ServicesController::class, 'store']);
    Route::get('services/{id}',[ServicesController::class, 'show']);
    Route::get('services/edit/{id}',[ServicesController::class, 'edit']);
    Route::put('services/{id}',[ServicesController::class, 'update']);
    Route::delete('services/delete/{id}',[ServicesController::class, 'destroy']);

    Route::post('temp-image',[TempImageController::class, 'store']);


    //Project
    Route::get('projects',[ProjectController::class, 'index']);
    Route::post('projects/store',[ProjectController::class, 'store']);
    Route::put('projects/{id}',[ProjectController::class, 'update']);
    Route::get('projects/{id}',[ProjectController::class, 'show']);
    Route::delete('projects/delete/{id}',[ProjectController::class, 'destroy']);

});

//Hero Slider Routes
Route::group(['middleware' => ['auth:sanctum']], function () {

Route::get('hero_slider',[HeroSliderController::class, 'index']);
Route::post('hero_slider/store',[HeroSliderController::class, 'store']);
Route::put('hero_slider/{id}',[HeroSliderController::class, 'update']);
Route::get('hero_slider/{id}',[HeroSliderController::class, 'show']);
Route::delete('hero_slider/delete/{id}',[HeroSliderController::class, 'destroy']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('users', [UserController::class, 'index']);
// Route::get('users/{id}', [UserController::class, 'show']);
// Route::post('address', [UserController::class, 'store']);
// Route::post('updates', [UserController::class, 'update']);




// Authentication Routes
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/register', [AuthController::class, 'register']);


    // Route::get('/posts', [PostController::class, 'index']);
    // Route::post('/posts/create', [PostController::class, 'store']);
    // Route::get('/posts/show/{id}', [PostController::class, 'show']);
    // Route::put('/posts/update/{id}', [PostController::class, 'update']);
    // Route::delete('/posts/delete/{id}', [PostController::class, 'destroy']);

    // Route::get('posts', [PostController::class, 'index']); // Get all posts
    // Route::get('posts/show', [PostController::class, 'show']); // Show a specific post
    // Route::post('posts/create', [PostController::class, 'store']); // Create a new post
    // Route::get('posts/edit/{id}', [PostController::class, 'show']); // Get a specific post for editing
    // Route::put('posts/update/{id}', [PostController::class, 'update']); // Update a post
    // Route::delete('posts/delete/{id}', [PostController::class, 'destroy']); // Delete a post



