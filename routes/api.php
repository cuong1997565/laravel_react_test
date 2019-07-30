<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('projects', 'Api\ProjectController@index');
Route::post('projects', 'Api\ProjectController@store');
Route::get('projects/{id}','Api\ProjectController@show');
Route::put('projects/{project}', 'Api\ProjectController@markAsCompleted');
Route::post('tasks', 'Api\TaskController@store');
Route::put('tasks/{task}', 'Api\TaskController@markAsCompleted');

Route::get('users','Api\UserController@index');
