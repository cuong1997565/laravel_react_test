<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Http\Controllers\Controller;
use Validator;
use App\User;

class UserController extends Controller
{
    protected $validationRules = [
        'name' => 'required',
        'email' => 'required|email|unique:users,email',
        'password' => 'required'
    ];
    protected $validationMessages = [
        'name.required' => 'Name khong duoc de trong',
        'email.required' => 'Email khong duoc de trong',
        'email.email' => 'Email khong hop le',
        'email.unique' => 'Email da ton tai trong he thong',
        'password.required' => 'Password khong duoc de trong'
    ];
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $name = $request->input('sreach_name');
        $email = $request->input('sreach_email');
        if($name !== null) {
            $user = User::query()->orderBy('id', 'desc')->where('name' , 'LIKE', '%' . $name . '%')->paginate(10);
            return $user;
        } else if ($email !== null) {
            $user = User::query()->orderBy('id','desc')->where('email','LIKE','%'.$email.'%')->paginate(10);
            return $user;
        }
        else {
            $user = User::orderBy('id', 'desc')->paginate(10);
            return $user;
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validationRules, $this->validationMessages);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'email_verified_at' => date('Y-m-d H:i:s'),
            'remember_token' => substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyz", 10)), 0, 10)
        ];

        $user = User::create($data);
        return response()->json(['success' => 'Tạo thành công','user' => $user], 200);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return response()->json(['success' => 'Edit','user' => $user], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validationRules['email'] .= ',' .$id.',id';
        unset($this->validationRules['password']);
        $validator = Validator::make($request->all(), $this->validationRules, $this->validationMessages);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $user = User::findOrFail($id);
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->save();
        return response()->json(['success' => 'User edit thành công','user' => $user], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['success' => 'User delete thành công','user' => $user], 200);

    }
}
