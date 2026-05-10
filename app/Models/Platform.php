<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Platform extends Model
{
    protected $fillable = ['name', 'slug', 'logo_url', 'color'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
