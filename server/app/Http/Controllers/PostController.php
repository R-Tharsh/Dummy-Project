<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PostController extends Controller
{

    public function getPosts()
    {
        // Fetch data from the external API
        $response = Http::get('https://jsonplaceholder.typicode.com/posts');

        // Check if the response is successful
        if ($response->successful()) {
            // Return the JSON data
            return response()->json($response->json(), 200);
        }

        // Handle error if the request fails
        return response()->json(['message' => 'Failed to fetch posts'], 500);
    }


    public function getPost($id)
    {

        $response = Http::get("https://jsonplaceholder.typicode.com/posts/{$id}");


        if ($response->successful()) {

            return response()->json($response->json(), 200);
        }

        // Handle error if the request fails
        return response()->json(['message' => 'Failed to fetch the post'], 500);
    }
}
