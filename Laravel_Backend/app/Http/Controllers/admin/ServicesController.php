<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\services;
use Illuminate\Support\Facades\Validator;

class ServicesController extends Controller
{
    public function index()
    {
        return view('admin.services.index');
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:services,slug',
            // 'short_desc' => 'required',
            // 'content' => 'required',
            // 'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // $imageName = time().'.'.$request->image->extension();
        // $request->image->move(public_path('images'), $imageName);



        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ]);
        }

        $model = new services();
        $model->title = $request->title;
        $model->short_desc = $request->short_desc;
        $model->slug = $request->title;
        $model->content = $request->content;
        $model->status = $request->status;
        $model->save();

        // return redirect()->route('admin.services.index')
        //                 ->with('success','Service created successfully.');
    }

}
