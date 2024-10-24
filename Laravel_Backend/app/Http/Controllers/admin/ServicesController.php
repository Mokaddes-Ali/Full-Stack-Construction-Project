<?php

namespace App\Http\Controllers\admin;

use App\Models\services;
use App\Models\TempImage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use function Symfony\Component\Clock\now;

use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;

class ServicesController extends Controller
{
    public function index()
    {

        $services = Services::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $services
        ]);


    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:services,slug',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $model = new services();
        $model->title = $request->title;
        $model->short_desc = $request->short_desc;
        $model->slug = Str::slug($request->slug) ;
        $model->content = $request->content;
        $model->status = $request->status;
        $model->save();

        //save temp image

        if ($request->imageId > 0) {

           $tempImage = TempImage::find($request->imageId);
           if ($tempImage != null) {
               $extArray = explode('.',$tempImage->name);
               $ext = last($extArray);

               $fileName = strtotime('now').$model->id.'.'.$ext;

                // create new image instance (300 x 400)
                     $sourcePath = public_path('uploads/temp/'.$tempImage->name);

                      $destPath = public_path('uploads/services/small/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> coverDown(300, 400);
                      $image -> save($destPath);

                      //large

                      $destPath = public_path('uploads/services/large/'.$fileName);
                      $manager = new ImageManager(Driver::class);
                      $image = $manager->read($sourcePath);
                      $image -> scaleDown(1200);
                      $image -> save($destPath);

                      $model->image = $fileName;
                      $model->save();


                      }
           }



        return response()->json([
            'status' => true,
            'message' => 'Service added successfully'
        ]);

    }

   public function show($id)
   {
        $service = Services::find($id);

        if ($service === null) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }



    public function edit($id){
        // $service = Services::find($id);

        // if ($service) {
        //     return response()->json([
        //         'status' => true,
        //         'data' => $service
        //     ]);
        // } else {
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'Service not found'
        //     ]);
        // }

    }

    public function update(Request $request, $id)
    {

        $service = Services::find($id);

        if ($service === null) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ]);
        }

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:services,slug,'.$id.',id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }


        $service->title = $request->title;
        $service->short_desc = $request->short_desc;
        $service->slug = Str::slug($request->slug) ;
        $service->content = $request->content;
        $service->status = $request->status;
        $service->save();

        //save temp image

        if ($request->imageId > 0) {
             $oldImage = $service->image;

            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$service->id.'.'.$ext;

                 // create new image instance (300 x 400)

                      $sourcePath = public_path('uploads/temp/'.$tempImage->name);

                       $destPath = public_path('uploads/services/small/'.$fileName);
                       $manager = new ImageManager(Driver::class);
                       $image = $manager->read($sourcePath);
                       $image -> coverDown(300, 400);
                       $image -> save($destPath);

                       //large

                       $destPath = public_path('uploads/services/large/'.$fileName);
                       $manager = new ImageManager(Driver::class);
                       $image = $manager->read($sourcePath);
                       $image -> scaleDown(1200);
                       $image -> save($destPath);

                       $service->image = $fileName;
                       $service->save();

                       if ($oldImage != '') {
                            File::delete(public_path('uploads/services/small/'.$oldImage));
                            File::delete(public_path('uploads/services/large/'.$oldImage));
                         }

                       }
            }

        return response()->json([
            'status' => true,
            'message' => 'Service updated successfully'
        ]);

    }

    public function destroy($id)
    {
        $service = Services::find($id);

        if ($service == null) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ]);
    }

    $service->delete();

    return response()->json([
        'status' => true,
        'message' => 'Service deleted successfully'
    ]);

}
}
