<?php

namespace App\Http\Controllers\admin;

use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;


class ProjectController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => 'ProjectController@index'
        ]);
    }

    public function store(Request $request)
    {
        //dummy title
        // Str::singular($value)

        $request->merge([
            'slug' => Str::slug($request->slug)
        ]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project = new Project();
        $project->title = $request->title;
        $project->short_desc = $request->short_desc;
        $project->slug = Str::slug($request->slug);
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->image = $request->image;
        $project->status = $request->status;
        $project->save();

         //save temp image

         if ($request->imageId > 0) {
            $oldImage =   $project->image;

           $tempImage = TempImage::find($request->imageId);
           if ($tempImage != null) {
               $extArray = explode('.',$tempImage->name);
               $ext = last($extArray);

               $fileName = strtotime('now'). $project->id.'.'.$ext;

                // create new image instance (300 x 400)

                     $sourcePath = public_path('uploads/temp/'.$tempImage->name);

                      $destPath = public_path('uploads/projects/small/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> coverDown(300, 400);
                      $image -> save($destPath);

                      //large image size

                      $destPath = public_path('uploads/projects/large/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> scaleDown(1200);
                      $image -> save($destPath);

                      $project->image = $fileName;
                      $project->save();

                      if ($oldImage != '') {
                           File::delete(public_path('uploads/projects/small/'.$oldImage));
                           File::delete(public_path('uploads/projects/large/'.$oldImage));
                        }
                      }
             }

         return response()->json([
            'status' => true,
            'message' => 'Project added successfully'
        ]);
    }
}
