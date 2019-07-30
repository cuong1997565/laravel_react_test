<?php

namespace App;
use App\Task;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'project_id'];
    public function tasks()
    {
      return $this->hasMany(Task::class);
    }
}
