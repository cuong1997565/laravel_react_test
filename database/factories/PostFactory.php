<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Post;
use App\User;
use App\Category;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Post::class, function (Faker $faker) {
    $user = User::all()->pluck('id')->toArray();
    $category = Category::all()->pluck('id')->toArray();
    return [
        'name' => $faker->name,
        'description' =>$faker->realText($maxNbChars = 200),
        'status' => $faker->numberBetween($min = 0, $max = 1),
        'user_id' =>   $faker->randomElement($user),
        'category_id' => $faker->rarandomElement($category)
    ];
});
