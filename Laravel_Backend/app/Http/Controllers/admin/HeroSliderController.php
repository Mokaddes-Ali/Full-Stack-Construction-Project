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
        $heroSlider = HeroSlider::find($id);

        return response()->json([
            'status' => true,
            'data' => $heroSlider
        ]);
    }

    public function update(Request $request, $id)
    {
        $heroSlider = HeroSlider::find($id);

        if ($heroSlider == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
            ]);
        }

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
            'message' => 'heroSlider Updated successfully'
        ]);
    }



    public function show($id)
    {
        $heroSlider = HeroSlider::find($id);

        if ($heroSlider == null) {
            return response()->json([
                'status' => false,
                'message' => 'Hero Slider not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $heroSlider
        ]);
    }


    public function destroy($id){

        $heroSlider  = HeroSlider::find($id);

        if (  $heroSlider  == null) {
            return response()->json([
                'status' => false,
                'message' => 'Hero Slider not found'
            ]);
        }

        File::delete(public_path('uploads/heroSlider/small/'. $heroSlider->image));
        File::delete(public_path('uploads/heroSlider/large/'. $heroSlider->image));

        $heroSlider->delete();

        return response()->json([
            'status' => true,
            'message' => 'Hero Slider deleted successfully'
        ]);
    }
}

