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
        $articles = Article::orderBy('id', 'desc')->get();
        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }

    public function show($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
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
            ], 400);
        }

        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->image = $request->image;
        $article->status = $request->status;
        $article->save();

        // save temp image
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $article->id . '.' . $ext;

                // create new image instance (300 x 400)
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);

                // small image size
                $destPath = public_path('uploads/Article/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 400);
                $image->save($destPath);

                // large image size
                $destPath = public_path('uploads/Article/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $article->image = $fileName;
                $article->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Article created successfully'
        ]);
    }
    // public function update(Request $request, $id)
    // {
    //     $article = Article::find($id);
    //     if ($article === null) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Article not found'
    //         ], 404);
    //     }

    //     $validator = Validator::make($request->all(), [
    //         'title' => 'required',
    //         'slug' => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => false,
    //             'errors' => $validator->errors()
    //         ], 400);
    //     }

    //     $article->title = $request->title;
    //     $article->slug = Str::slug($request->slug);
    //     $article->author = $request->author;
    //     $article->content = $request->content;
    //     $article->status = $request->status;
    //     $article->save();

    //     // Handle image update if imageId exists
    //     if ($request->imageId > 0) {
    //         $oldImage = $article->image;  // Save the old image for deletion

    //         $tempImage = TempImage::find($request->imageId);
    //         if ($tempImage != null) {
    //             $extArray = explode('.', $tempImage->name);
    //             $ext = last($extArray);
    //             $fileName = strtotime('now') . $article->id . '.' . $ext;

    //             // Create new image instance (300 x 400)
    //             $sourcePath = public_path('uploads/temp/' . $tempImage->name);

    //             // Small image size
    //             $destPath = public_path('uploads/Article/small/' . $fileName);
    //             $manager = new ImageManager(Driver::class);
    //             $image = $manager->read($sourcePath);
    //             $image->coverDown(300, 400);
    //             $image->save($destPath);

    //             // Large image size
    //             $destPath = public_path('uploads/Article/large/' . $fileName);
    //             $image->scaleDown(1200);
    //             $image->save($destPath);
    //             $article->image = $fileName;
    //             $article->save();
    //         }

    //         if (!empty($oldImage)) {
    //             File::delete(public_path('uploads/Article/small/' . $oldImage));
    //             File::delete(public_path('uploads/Article/large/' . $oldImage));
    //         }
    //     }

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Article updated successfully'
    //     ]);
    // }


    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        if ($article === null) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        // Update article details
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

        // Check if a new image has been uploaded
        if ($request->imageId > 0) {
            $oldImage = $article->image;  // Save the old image for deletion

            // Find the temp image by ID
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now') . $article->id . '.' . $ext;

                // Create new image instance (small and large sizes)
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);

                // Small image size (300x400)
                $destPath = public_path('uploads/Article/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 400);
                $image->save($destPath);

                // Large image size (1200x?)
                $destPath = public_path('uploads/Article/large/' . $fileName);
                $image->scaleDown(1200);
                $image->save($destPath);

                // Save the new image name to the article
                $article->image = $fileName;
                $article->save();

                // Delete the temp image from storage
                File::delete(public_path('uploads/temp/'.$tempImage->name));
                File::delete(public_path('uploads/temp/thumb/'.$tempImage->name));
                $tempImage->delete(); // Remove the temp image record
            }

            // Delete the old image if it exists
            if (!empty($oldImage)) {
                File::delete(public_path('uploads/Article/small/' . $oldImage));
                File::delete(public_path('uploads/Article/large/' . $oldImage));
            }
        } else {
            // No new image uploaded, keep the temporary image unchanged
            $tempImage = TempImage::where('name', $article->image)->first();
            if ($tempImage) {
                // Temporary image still exists
                $tempImage->touch(); // Update the "updated_at" timestamp for the temporary image
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Article updated successfully'
        ]);
    }

public function destroy($id)
{
    $article = Article::find($id);

    if (!$article) {
        return response()->json([
            'status' => false,
            'message' => 'Article not found.',
        ], 404);
    }
    if ($article->image) {
        $smallImagePath = public_path('uploads/Article/small/' . $article->image);
        $largeImagePath = public_path('uploads/Article/large/' . $article->image);

        if (File::exists($smallImagePath)) {
            File::delete($smallImagePath);
        }

        if (File::exists($largeImagePath)) {
            File::delete($largeImagePath);
        }
    }

    $tempImage = TempImage::find($id);
    if ($tempImage) {
        $imagePath = public_path('uploads/temp/'.$tempImage->name);
        $thumbPath = public_path('uploads/temp/thumb/'.$tempImage->name);

        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        if (File::exists($thumbPath)) {
            File::delete($thumbPath);
        }
        $tempImage->delete();
    }
    $article->delete();

    return response()->json([
        'status' => true,
        'message' => 'Article and related images deleted successfully.',
    ]);
}
}
