<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function show(Request $request, string $slug): Response
    {
        $product = Product::with(['platform', 'genre', 'reviews.user'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $related = Product::with('platform')
            ->where('genre_id', $product->genre_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->take(4)
            ->get();

        $isInWishlist = false;
        $canReview = false;
        $hasReviewed = false;

        if ($user = $request->user()) {
            $isInWishlist = $user->wishlist()->where('product_id', $product->id)->exists();
            $canReview = $user->orders()
                ->where('payment_status', 'paid')
                ->whereHas('items', fn ($q) => $q->where('product_id', $product->id))
                ->exists();
            $hasReviewed = $product->reviews()->where('user_id', $user->id)->exists();
        }

        return Inertia::render('Products/Show', [
            'product' => $product,
            'related' => $related,
            'available_keys' => $product->available_keys_count,
            'is_in_wishlist' => $isInWishlist,
            'can_review' => $canReview,
            'has_reviewed' => $hasReviewed,
        ]);
    }
}
