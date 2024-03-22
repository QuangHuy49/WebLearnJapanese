<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use JWTException;
use Validator;
    
class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'user_name' => 'required',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'user_avatar' => 'storage/app/public/img/avatar/male-student.png',
            'user_role_id' => 2,
        ]);

        return response()->json(['message' => 'User successfully registered', 'user' => $user], 201);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function profile()
    {
        return response()->json(auth()->user());
    }


    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    // public function refresh()
    // {
    //     $refreshToken = request()->refresh_token;
    //     try {
    //         $decoded = JWTAuth::getJWTProvider()->decode($refreshToken);
    //         $user = User::find($decoded['user_id']);
    //         if (!$user) {
    //             return response()->json(['error' => "User not found"], 404);
    //         }
    //         auth()->invalidate();
    //         $token = auth()->login($user);
    //         $refreshToken = $this->createRefreshToken();
    //         return $this->respondWithToken($token, $refreshToken);
    //     } catch (JWTException $exception) {
    //         return response()->json($exception);
    //     }
    //     // return $this->respondWithToken(auth()->refresh());
    // }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
