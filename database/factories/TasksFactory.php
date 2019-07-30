<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Task;
use App\Project;
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

$factory->define(Task::class, function (Faker $faker) {
    $data = Project::all()->pluck('id')->toArray();
    return [
		'title'      => $faker->name,
        'project_id' => $faker->randomElement($data),
        'is_completed' => $faker->numberBetween($min = 0, $max = 1)
	];
});
