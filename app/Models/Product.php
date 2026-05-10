<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'platform_id',
        'genre_id',
        'developer',
        'publisher',
        'description',
        'system_requirements',
        'price',
        'original_price',
        'image_url',
        'cover_url',
        'youtube_id',
        'release_date',
        'is_featured',
        'is_active',
        'rating_avg',
        'rating_count',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'release_date' => 'date',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'rating_avg' => 'decimal:2',
    ];

    public function platform(): BelongsTo
    {
        return $this->belongsTo(Platform::class);
    }

    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }

    public function keys(): HasMany
    {
        return $this->hasMany(KeyStock::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function wishlistedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'wishlists')
            ->withPivot('price_alert')
            ->withTimestamps();
    }

    public function getDiscountPercentAttribute(): ?int
    {
        if (! $this->original_price || $this->original_price <= $this->price) {
            return null;
        }

        return (int) round((($this->original_price - $this->price) / $this->original_price) * 100);
    }

    public function getAvailableKeysCountAttribute(): int
    {
        return $this->keys()->where('status', 'available')->count();
    }
}
