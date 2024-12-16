<?php

namespace App\Http\Controllers\front;

use App\Mail\ContactEmail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
            'subject' => 'required',
            'phone' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ]);
        }
        $mailData = [
    'name' => $request->name,
    'email' => $request->email,
    'message' => $request->message ?? '', // Provide default values
    'subject' => $request->subject ?? '',
    'phone' => $request->phone ?? ''
];


        Mail::to('admin@gmail.com')->send(new ContactEmail($mailData));

        return response()->json([
            'status' => true,
            'message' => 'Thanks for contacting us! We will get back to you soon!'
        ]);

    }
}
