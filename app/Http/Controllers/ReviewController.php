<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'body' => 'required|string|min:10|max:1000',
        ]);

        $user = $request->user();

        $verified = $user->orders()
            ->where('payment_status', 'paid')
            ->whereHas('items', fn ($q) => $q->where('product_id', $product->id))
            ->exists();

        if (! $verified) {
            return back()->with('error', 'Puoi recensire solo i giochi che hai acquistato.');
        }

        Review::updateOrCreate(
            ['user_id' => $user->id, 'product_id' => $product->id],
            [
                'rating' => $data['rating'],
                'body' => $data['body'],
                'verified_purchase' => true,
            ]
        );

        $product->update([
            'rating_avg' => $product->reviews()->avg('rating') ?? 0,
            'rating_count' => $product->reviews()->count(),
        ]);

        return back()->with('success', 'Recensione pubblicata!');
    }
}
