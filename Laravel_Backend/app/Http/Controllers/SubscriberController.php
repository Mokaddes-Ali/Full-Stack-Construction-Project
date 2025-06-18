<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:subscribers,email'
        ]);

        Subscriber::create([
            'email' => $request ->email
        ]);

        return response()->json([
            'message'=> 'Subscribed Successfully!'
        ]);
    }

    public function index()
    {
        return Subscriber::orderBy('id', 'desc')->select('id','email')->get();
    }

    public function destroy($id)
    {
        $subscriber = Subscriber::findOrFail($id);

        if(!$subscriber){
            return response()->json([
                'message' => 'Subscriber Not Found!'
            ],404);
        }
         $subscriber->delete();

        return response()->json([
             'message' => 'Subscriber deleted successfully.'
        ]);
    }
}
