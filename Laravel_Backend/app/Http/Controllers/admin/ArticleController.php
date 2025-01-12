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

    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found'
            ], 404);
        }

        // Validate the input fields
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required',
            'imageId' => 'nullable|integer', // optional imageId for existing image
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // image validation
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        // Save old image name for deletion later
        $oldImage = $article->image;

        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;

        // Update image if provided via 'image' field
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $fileName = time() . '.' . $image->getClientOriginalExtension();

            // Resize and save image (small and large)
            $image->move(public_path('uploads/Article/large'), $fileName);
            $image->move(public_path('uploads/Article/small'), $fileName);

            // Save new image to the article
            $article->image = $fileName;
        }

        // Save temp image if imageId is provided
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $article->id . '.' . $ext;

                // Create new image instance (300 x 400)
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);

                // Small image size
                $destPath = public_path('uploads/Article/small/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(300, 400);
                $image->save($destPath);

                // Large image size
                $destPath = public_path('uploads/Article/large/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                // Update image in article
                $article->image = $fileName;
            }
        }

        // Save the article
        $article->save();

        // Delete old image from storage if there is one
        if ($oldImage != '') {
            File::delete(public_path('uploads/Article/small/' . $oldImage));
            File::delete(public_path('uploads/Article/large/' . $oldImage));
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
                'message' => 'Article not found'
            ], 404);
        }

        // Delete the image from storage
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

        $article->delete();

        return response()->json([
            'status' => true,
            'message' => 'Article deleted successfully'
        ]);
    }
}

