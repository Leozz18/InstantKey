<?php

namespace App\Services;

use App\Models\DiscountCode;
use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Session;

class CartService
{
    private const CART_KEY = 'cart_items';
    private const DISCOUNT_KEY = 'cart_discount_code';

    public function items(): array
    {
        return Session::get(self::CART_KEY, []);
    }

    public function add(int $productId, int $quantity = 1): void
    {
        $items = $this->items();

        if (isset($items[$productId])) {
            $items[$productId] += $quantity;
        } else {
            $items[$productId] = $quantity;
        }

        Session::put(self::CART_KEY, $items);
    }

    public function update(int $productId, int $quantity): void
    {
        $items = $this->items();

        if ($quantity <= 0) {
            unset($items[$productId]);
        } else {
            $items[$productId] = $quantity;
        }

        Session::put(self::CART_KEY, $items);
    }

    public function remove(int $productId): void
    {
        $items = $this->items();
        unset($items[$productId]);
        Session::put(self::CART_KEY, $items);
    }

    public function clear(): void
    {
        Session::forget(self::CART_KEY);
        Session::forget(self::DISCOUNT_KEY);
    }

    public function count(): int
    {
        return array_sum($this->items());
    }

    public function detailedItems(): Collection
    {
        $items = $this->items();
        if (empty($items)) {
            return collect();
        }

        $products = Product::with('platform')->whereIn('id', array_keys($items))->get();

        return $products->map(function (Product $product) use ($items) {
            $quantity = $items[$product->id] ?? 0;

            return [
                'id' => $product->id,
                'title' => $product->title,
                'slug' => $product->slug,
                'image_url' => $product->image_url,
                'platform' => $product->platform->name ?? null,
                'platform_color' => $product->platform->color ?? null,
                'price' => (float) $product->price,
                'quantity' => $quantity,
                'subtotal' => round($product->price * $quantity, 2),
                'available_keys' => $product->available_keys_count,
            ];
        })->values();
    }

    public function subtotal(): float
    {
        return (float) $this->detailedItems()->sum('subtotal');
    }

    public function applyDiscount(string $code): bool
    {
        $discount = DiscountCode::where('code', $code)->first();

        if (! $discount || ! $discount->isValid()) {
            return false;
        }

        Session::put(self::DISCOUNT_KEY, $discount->id);

        return true;
    }

    public function removeDiscount(): void
    {
        Session::forget(self::DISCOUNT_KEY);
    }

    public function discount(): ?DiscountCode
    {
        $id = Session::get(self::DISCOUNT_KEY);
        if (! $id) {
            return null;
        }

        return DiscountCode::find($id);
    }

    public function discountAmount(): float
    {
        $discount = $this->discount();
        if (! $discount) {
            return 0.0;
        }

        return $discount->calculateDiscount($this->subtotal());
    }

    public function total(): float
    {
        return max(0.0, round($this->subtotal() - $this->discountAmount(), 2));
    }

    public function summary(): array
    {
        return [
            'items' => $this->detailedItems(),
            'count' => $this->count(),
            'subtotal' => round($this->subtotal(), 2),
            'discount' => $this->discount() ? [
                'code' => $this->discount()->code,
                'amount' => round($this->discountAmount(), 2),
            ] : null,
            'total' => $this->total(),
        ];
    }
}
