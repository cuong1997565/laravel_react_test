<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;
use Validator;
use Illuminate\Support\Facades\Storage;
use File;
class PostController extends Controller
{
    protected  $validationRules = [
        'name' => 'required',
        'image' => 'required',
        'description' => 'required',
        'user_id' => 'required',
        'category_id' => 'required'
    ];

    protected $validationMessages = [
        'name.required' => 'Name khong duoc de trong',
        'image.required' => 'Image khong duoc de trong',
        'description.required' => "Description khong duoc de trong",
        'user_id.required' => "User khong duoc de trong",
        'category_id' => "Category khong duoc de trong"
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $post = Post::with(['category','user'])->orderBy('id','desc')->paginate(10);
        return response()->json(['success' => 'List danh sach thành công','post' => $post], 200);
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
        $validator = Validator::make($request->all(),$this->validationRules, $this->validationMessages);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }else {
            if($request->get('image')){
                $image = $request->get('image');
                $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                $destinationPath = public_path('/storage/images') . '/'.$name;
                file_put_contents($destinationPath, file_get_contents($image));
                $post = new Post;
                $post->name = $request->input('name');
                $post->description = $request->input('description');
                $post->images = $name;
                $post->status = $request->input('status') === true ? 1 : 0;
                $post->category_id = $request->input('category_id');
                $post->user_id = $request->input('user_id');
                $post->save();
                return response()->json(['success' => 'Them danh sach thành công','post' => $post], 200);
            }
        }

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
        $post = Post::with(['category','user'])->findOrFail($id);
        return response()->json(['success' => 'Edit danh sach thanh cong', 'post' => $post],200);
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
        unset($this->validationRules['image']);
        $validator = Validator::make($request->all(),$this->validationRules, $this->validationMessages);
        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        } else {
            $post = Post::findOrFail($id);
            $post->name = $request->input('name');
            $post->description = $request->input('description');
            $post->status = $request->input('status') === true ? 1 : 0;
            $post->category_id = $request->input('category_id');
            $post->user_id = $request->input('user_id');
            if($request->get('image') != null) {
               $public_path = public_path('storage/images/'.$post->images);
                if(File::exists($public_path)) {
                    unlink($public_path);
                }
                $image = $request->get('image');
                $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                $destinationPath = public_path('/storage/images') . '/'.$name;
                file_put_contents($destinationPath, file_get_contents($image));
                $post->images = $name;
            }
            $post->save();
            return response()->json(['success' => 'Update danh sach thanh cong','post' => $post],200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       $post = Post::findOrFail($id);
       $public_path = public_path('storage/images/'.$post->images);
       if(File::exists($public_path)) {
           unlink($public_path);
       }
       $post->delete();
       return response()->json(['success' => 'Delete danh sach thanh cong','post' => $post],200);
    }
}
