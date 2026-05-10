<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class KeyStock extends Model
{
    protected $table = 'keys_stock';

    protected $fillable = [
        'product_id',
        'key_code',
        'status',
        'reserved_at',
        'sold_at',
    ];

    protected $casts = [
        'reserved_at' => 'datetime',
        'sold_at' => 'datetime',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function orderItem(): HasOne
    {
        return $this->hasOne(OrderItem::class, 'key_id');
    }
}
