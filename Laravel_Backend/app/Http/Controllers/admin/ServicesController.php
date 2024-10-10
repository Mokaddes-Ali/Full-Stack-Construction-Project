<?php

namespace App\Http\Controllers\admin;

use App\Models\services;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

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

        return response()->json([
            'status' => true,
            'message' => 'Service added successfully'
        ]);

    }





    public function edit($id)
    {
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

        return response()->json([
            'status' => true,
            'message' => 'Service updated successfully'
        ]);

    }

    public function destroy($id)
    {
        // $service = Services::find($id);

        // if ($service) {
        //     $service->delete();
        //     return response()->json([
        //         'status' => true,
        //         'message' => 'Service deleted successfully'
        //     ]);
        // } else {
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'Service not found'
        //     ]);
        // }
    }

}
