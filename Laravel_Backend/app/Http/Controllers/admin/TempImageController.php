<?php

namespace App\Http\Controllers\admin;

use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File; // To handle file deletion

class TempImageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors('image')
            ]);
        }

        $image = $request->image;

        $ext = $image->getClientOriginalExtension();
        $imageName = strtotime('now').'.'.$ext;

        $model = new TempImage();
        $model->name = $imageName;
        $model->save();
        $image->move(public_path('uploads/temp'), $imageName);

        // create new image instance (800 x 600)
        $sourcePath = public_path('uploads/temp/'.$imageName);
        $destPath = public_path('uploads/temp/thumb/'.$imageName);
        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(200, 300);
        $image->save($destPath);

        return response()->json([
            'status' => true,
            'data' => $model,
            'message' => 'Image uploaded successfully',
        ]);
    }

    // Update Method
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors('image')
            ]);
        }

        $model = TempImage::find($id);
        if (!$model) {
            return response()->json([
                'status' => false,
                'message' => 'Image not found.',
            ]);
        }

        // Delete old image and thumbnail if it exists
        $oldImagePath = public_path('uploads/temp/'.$model->name);
        $oldThumbPath = public_path('uploads/temp/thumb/'.$model->name);

        if (File::exists($oldImagePath)) {
            File::delete($oldImagePath);
        }

        if (File::exists($oldThumbPath)) {
            File::delete($oldThumbPath);
        }

        // Upload the new image
        $image = $request->image;
        $ext = $image->getClientOriginalExtension();
        $imageName = strtotime('now').'.'.$ext;

        // Update model
        $model->name = $imageName;
        $model->save();

        // Save the new image
        $image->move(public_path('uploads/temp'), $imageName);

        // Create new thumbnail
        $sourcePath = public_path('uploads/temp/'.$imageName);
        $destPath = public_path('uploads/temp/thumb/'.$imageName);
        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(200, 300);
        $image->save($destPath);

        return response()->json([
            'status' => true,
            'data' => $model,
            'message' => 'Image updated successfully',
        ]);
    }

    // Delete Method
    public function destroy($id)
    {
        $model = TempImage::find($id);
        if (!$model) {
            return response()->json([
                'status' => false,
                'message' => 'Image not found.',
            ]);
        }

        // Delete the image and its thumbnail
        $imagePath = public_path('uploads/temp/'.$model->name);
        $thumbPath = public_path('uploads/temp/thumb/'.$model->name);

        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        if (File::exists($thumbPath)) {
            File::delete($thumbPath);
        }

        // Delete the record from the database
        $model->delete();

        return response()->json([
            'status' => true,
            'message' => 'Image deleted successfully',
        ]);
    }
}
