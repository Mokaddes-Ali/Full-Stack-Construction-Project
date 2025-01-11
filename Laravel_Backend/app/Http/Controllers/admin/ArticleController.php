<?php

namespace App\Http\Controllers\admin;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\TempImage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    public function index()
    {

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                    'status' => true,
                    'errors' => $validator->errors()
                ],
                400
            );
        }

        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug) ;
        $article->author = $request->author;
        $article->content = $request->content;
        $article->image = $request->image;
        $article->status = $request->status;
        $article->save();

          //save temp image

          if ($request->imageId > 0) {

           $tempImage = TempImage::find($request->imageId);
           if ($tempImage != null) {
               $extArray = explode('.',$tempImage->name);
               $ext = last($extArray);

               $fileName = strtotime('now').$article->id.'.'.$ext;

                // create new image instance (300 x 400)

                     $sourcePath = public_path('uploads/temp/'.$tempImage->name);

                      $destPath = public_path('uploads/Article/small/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> coverDown(300, 400);
                      $image -> save($destPath);

                      //large image size

                      $destPath = public_path('uploads/Article/large/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> scaleDown(1200);
                      $image -> save($destPath);

                      $article->image = $fileName;
                      $article->save();
                      }
             }


        return response()->json([
            'status' => true,
            'message' => 'Article created successfully'
        ]);

    }
}
