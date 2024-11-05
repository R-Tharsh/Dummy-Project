<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // Register User API
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Store image if uploaded and save only relative path
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    // Login User API
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'User logged in successfully', 'token' => $token, 'user' => $user], 200);
    }

    // Fetch All Users API
    public function getAllUsers()
    {
        $users = User::all(); // Fetch all users
        return response()->json($users);
    }

    // Update User Details API
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'username' => 'nullable|string|max:255|unique:users,username,' . $user->id,
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update username and email if provided
        if ($request->has('username')) {
            $user->username = $request->username;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }

        // Store new image if uploaded and delete old one
        if ($request->hasFile('image')) {
            if ($user->image) {
                Storage::delete('public/' . $user->image);
            }
            $imagePath = $request->file('image')->store('images', 'public');
            $user->image = $imagePath; // Store only the relative path
        }

        $user->save();

        return response()->json(['message' => 'User details updated successfully', 'user' => $user], 200);
    }

    // Delete User API
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        // Delete the user's image if it exists
        if ($user->image) {
            Storage::delete('public/' . basename($user->image));
        }

        // Delete the user from the database
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    // Delete User Image API
    public function deleteUserImage($id)
    {
        $user = User::findOrFail($id);

        if ($user->image) {
            Storage::delete('public/' . basename($user->image));
            $user->image = null;
            $user->save();
            return response()->json(['message' => 'Image deleted successfully'], 200);
        }

        return response()->json(['message' => 'No image found'], 404);
    }

    // Change Password API
    public function changePassword(Request $request, $id)
    {
        $user = User::findOrFail($id); // Retrieve user by ID

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 401);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }
}
