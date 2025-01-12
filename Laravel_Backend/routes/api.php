<?php

use App\Models\HeroSlider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\front\ContactController;
use App\Http\Controllers\admin\ServicesController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\HeroSliderController;
use App\Http\Controllers\ConstructionProjectController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;

Route::post('authenticate', [AuthenticationController::class, 'authenticate']);
Route::get('get-services', [FrontServiceController::class, 'index']);
Route::get('get-latest-service', [FrontServiceController::class, 'latestService']);

Route::middleware('auth:sanctum')->post('/logout', [AuthenticationController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [AuthenticationController::class, 'user']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AuthenticationController::class, 'index']);
});

Route::post('contact', [ContactController::class, 'index']);


Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/user/dashboard', [UserController::class, 'dashboard']);
});




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




    //Project
    Route::get('projects',[ProjectController::class, 'index']);
    Route::post('projects/store',[ProjectController::class, 'store']);
    Route::put('projects/{id}',[ProjectController::class, 'update']);
    Route::get('projects/{id}',[ProjectController::class, 'show']);
    Route::delete('projects/delete/{id}',[ProjectController::class, 'destroy']);
});

Route::post('temp-image',[TempImageController::class, 'store']);
Route::put('temp-image/{id}',[TempImageController::class, 'update']);
Route::delete('temp-image/{id}',[TempImageController::class, 'destroy']);

//Hero Slider Routes
Route::group(['middleware' => ['auth:sanctum']], function () {

Route::get('hero_slider',[HeroSliderController::class, 'index']);
Route::post('hero_slider/store',[HeroSliderController::class, 'store']);
Route::put('hero_slider/{id}',[HeroSliderController::class, 'update']);
Route::get('hero_slider/{id}',[HeroSliderController::class, 'show']);
Route::delete('hero_slider/delete/{id}',[HeroSliderController::class, 'destroy']);
});



//construction project



Route::prefix('construction-projects')->group(function () {
    Route::get('/', [ConstructionProjectController::class, 'index']); // Fetch all projects
    Route::post('/', [ConstructionProjectController::class, 'store']); // Add a new project
    Route::get('/{id}', [ConstructionProjectController::class, 'show']); // View a single project
    Route::put('/{id}', [ConstructionProjectController::class, 'update']); // Update a project
    Route::delete('/{id}', [ConstructionProjectController::class, 'destroy']); // Delete a project
});


//Article Routes
Route::get('articles', [ArticleController::class, 'index']);
Route::post('articles/store', [ArticleController::class, 'store']);
Route::get('articles/{id}', [ArticleController::class, 'show']);
Route::put('articles/{id}', [ArticleController::class, 'update']);
Route::delete('articles/delete/{id}', [ArticleController::class, 'destroy']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
