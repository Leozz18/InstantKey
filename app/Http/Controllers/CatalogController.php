<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Platform;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::with('platform', 'genre')->where('is_active', true);

        if ($search = $request->input('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('developer', 'like', "%{$search}%")
                    ->orWhere('publisher', 'like', "%{$search}%");
            });
        }

        if ($platform = $request->input('platform')) {
            $query->whereHas('platform', fn ($q) => $q->where('slug', $platform));
        }

        if ($genre = $request->input('genre')) {
            $query->whereHas('genre', fn ($q) => $q->where('slug', $genre));
        }

        if ($maxPrice = $request->input('max_price')) {
            $query->where('price', '<=', (float) $maxPrice);
        }

        if ($onSale = $request->boolean('on_sale')) {
            $query->whereNotNull('original_price')->whereColumn('price', '<', 'original_price');
        }

        $sort = $request->input('sort', 'popular');
        match ($sort) {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'newest' => $query->orderByDesc('release_date'),
            'rating' => $query->orderByDesc('rating_avg'),
            default => $query->orderByDesc('is_featured')->orderByDesc('rating_count'),
        };

        $products = $query->paginate(12)->withQueryString();

        return Inertia::render('Catalog/Index', [
            'products' => $products,
            'platforms' => Platform::orderBy('name')->get(),
            'genres' => Genre::orderBy('name')->get(),
            'filters' => $request->only(['q', 'platform', 'genre', 'max_price', 'on_sale', 'sort']),
        ]);
    }
}
