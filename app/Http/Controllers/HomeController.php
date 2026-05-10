<?php

namespace App\Http\Controllers;

use App\Models\Platform;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featured = Product::with('platform', 'genre')
            ->where('is_active', true)
            ->where('is_featured', true)
            ->latest()
            ->take(6)
            ->get();

        $newReleases = Product::with('platform', 'genre')
            ->where('is_active', true)
            ->orderByDesc('release_date')
            ->take(8)
            ->get();

        $deals = Product::with('platform', 'genre')
            ->where('is_active', true)
            ->whereNotNull('original_price')
            ->whereColumn('price', '<', 'original_price')
            ->take(8)
            ->get();

        $platforms = Platform::orderBy('name')->get();

        return Inertia::render('Home', [
            'featured' => $featured,
            'newReleases' => $newReleases,
            'deals' => $deals,
            'platforms' => $platforms,
        ]);
    }
}
