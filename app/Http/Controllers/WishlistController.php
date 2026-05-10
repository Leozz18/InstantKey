<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    public function index(Request $request): Response
    {
        $items = $request->user()
            ->wishlist()
            ->with('platform', 'genre')
            ->paginate(12);

        return Inertia::render('Wishlist/Index', [
            'items' => $items,
        ]);
    }

    public function toggle(Request $request, Product $product): RedirectResponse
    {
        $user = $request->user();

        if ($user->wishlist()->where('product_id', $product->id)->exists()) {
            $user->wishlist()->detach($product->id);
            return back()->with('success', 'Rimosso dalla wishlist.');
        }

        $user->wishlist()->attach($product->id, [
            'price_alert' => $request->input('price_alert'),
        ]);

        return back()->with('success', 'Aggiunto alla wishlist!');
    }

    public function destroy(Request $request, Product $product): RedirectResponse
    {
        $request->user()->wishlist()->detach($product->id);

        return back()->with('success', 'Rimosso dalla wishlist.');
    }
}
