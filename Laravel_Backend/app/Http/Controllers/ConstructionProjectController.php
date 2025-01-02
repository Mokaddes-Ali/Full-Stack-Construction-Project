<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ConstructionProject;

class ConstructionProjectController extends Controller
{
    // Fetch all projects
    public function index()
    {
        $projects = ConstructionProject::all()->map(function ($project) {
            $project->status_label = ucfirst(str_replace('-', ' ', $project->status));
            return $project;
        });

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    // Store a new project
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'client' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'status' => 'nullable|in:pending,in-progress,completed,on-hold',
        ]);

        $validated['status'] = $validated['status'] ?? 'pending';

        $project = ConstructionProject::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully.',
            'data' => $project,
        ], 201);
    }

    // Show a specific project
    public function show($id)
    {
        $project = ConstructionProject::findOrFail($id);
        $project->status_label = ucfirst(str_replace('-', ' ', $project->status));

        return response()->json([
            'success' => true,
            'data' => $project,
        ]);
    }

    // Update a specific project
    public function update(Request $request, $id)
    {
        $project = ConstructionProject::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'client' => 'nullable|string|max:255',
            'sector' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'status' => 'nullable|in:pending,in-progress,completed,on-hold',
        ]);

        $project->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully.',
            'data' => $project,
        ]);
    }

    // Delete a specific project
    public function destroy($id)
    {
        $project = ConstructionProject::findOrFail($id);
        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.',
        ]);
    }
}

