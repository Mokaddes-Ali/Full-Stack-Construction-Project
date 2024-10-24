<?php

namespace App\Http\Controllers\admin;

use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

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

        return response()->json([
            'status' => true,
            'message' => 'Project added successfully'
        ]);
    }
}
