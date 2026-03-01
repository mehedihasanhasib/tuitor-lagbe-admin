<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $queryParams = request()->query();

        $subjects = Subject::query()
            ->when(isset($queryParams['q']), function ($subject) use ($queryParams) {
                $subject->where('name', 'like', '&' . $queryParams['q'] . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate();

        return inertia('subjects/Index', [
            'subjects' => SubjectResource::collection($subjects)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:subjects,slug'],
        ]);

        Subject::create($validatedData);

        return redirect()->route('subjects.index')->with('success', 'Subject created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:subjects,slug,' . $subject->id],
        ]);

        $subject->update($validatedData);

        return redirect()->route('subjects.index')->with('success', 'Subject updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        // if ($subject->tuitions()->count() > 0) {
        //     return redirect()->route('subjects.index')->with('error', 'Subject has tuitions');
        // }
        $subject->delete();

        return redirect()->route('subjects.index')->with('success', 'Subject deleted successfully');
    }
}
