<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlider;
use Illuminate\Http\Request;
use App\Models\TempImage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use function Symfony\Component\Clock\now;

use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;


class HeroSliderController extends Controller
{
    public function index()
    {

        $heroSlider = HeroSlider::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $heroSlider
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
            'hero_title' => 'required',
            'slug' => 'required|unique:projects,slug',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $heroSlider = new HeroSlider();
        $heroSlider->hero_title = $request->hero_title;
        $heroSlider->hero_subtitle = $request->hero_subtitle;
        $heroSlider->image = $request->image;
        $heroSlider->button_text = $request->button_text;
        $heroSlider->button_link = $request->button_link;
        $heroSlider->slug = Str::slug($request->slug);
        $heroSlider->status = $request->status;
        $heroSlider->save();
         //save temp image

         if ($request->imageId > 0) {
            $oldImage =  $heroSlider->image;

           $tempImage = TempImage::find($request->imageId);
           if ($tempImage != null) {
               $extArray = explode('.',$tempImage->name);
               $ext = last($extArray);

               $fileName = strtotime('now').$heroSlider->id.'.'.$ext;

                // create new image instance (300 x 400)

                     $sourcePath = public_path('uploads/temp/'.$tempImage->name);

                      $destPath = public_path('uploads/heroSlider/small/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> coverDown(300, 400);
                      $image -> save($destPath);

                      //large image size

                      $destPath = public_path('uploads/heroSlider/large/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> scaleDown(1200);
                      $image -> save($destPath);

                      $heroSlider->image = $fileName;
                      $heroSlider->save();

                      if ($oldImage != '') {
                           File::delete(public_path('uploads/heroSlider/small/'.$oldImage));
                           File::delete(public_path('uploads/heroSlider/large/'.$oldImage));
                        }
                      }
             }

         return response()->json([
            'status' => true,
            'message' => 'heroSlider added successfully'
        ]);
    }

    public function edit($id)
    {
        $project = HeroSlider::find($id);

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = HeroSlider::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
            ]);
        }

        $request->merge([
            'slug' => Str::slug($request->slug)
        ]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,'.$id.',id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project->title = $request->title;
        $project->short_desc = $request->short_desc;
        $project->slug = Str::slug($request->slug);
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->status = $request->status;
        $project->save();

        //save temp image

        if ($request->imageId > 0) {
            $oldImage = $project->image;

           $tempImage = TempImage::find($request->imageId);
           if ($tempImage != null) {
               $extArray = explode('.',$tempImage->name);
               $ext = last($extArray);

               $fileName = strtotime('now').$project->id.'.'.$ext;

                // create new image instance (300 x 400)

                     $sourcePath = public_path('uploads/temp/'.$tempImage->name);

                      $destPath = public_path('uploads/projects/small/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> coverDown(300, 400);
                      $image -> save($destPath);

                      //large

                      $destPath = public_path('uploads/projects/large/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> scaleDown(1200);
                      $image -> save($destPath);

                      $project->image = $fileName;
                      $project->save();

                      }

                        if ($oldImage != '') {
                             File::delete(public_path('uploads/projects/small/'.$oldImage));
                             File::delete(public_path('uploads/projects/large/'.$oldImage));
                            }
                        }

                        return response()->json([
                            'status' => true,
                            'message' => 'Project updated successfully'
                        ]);

               }

    public function show($id)
    {
        $project = HeroSlider::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }


    public function destroy($id){
        $project = HeroSlider::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
            ]);
        }

        File::delete(public_path('uploads/projects/small/'. $project->image));
        File::delete(public_path('uploads/projects/large/'. $project->image));

        $project->delete();

        return response()->json([
            'status' => true,
            'message' => 'Project deleted successfully'
        ]);
    }
}

