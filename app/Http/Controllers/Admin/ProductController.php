<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\KeyStock;
use App\Models\Platform;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::with(['platform', 'genre'])
            ->withCount(['keys as available_keys' => fn ($q) => $q->where('status', 'available')])
            ->orderBy('id', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Create', [
            'platforms' => Platform::all(),
            'genres' => Genre::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'platform_id' => 'required|exists:platforms,id',
            'genre_id' => 'required|exists:genres,id',
            'developer' => 'nullable|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'description' => 'required|string',
            'system_requirements' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'image_url' => 'nullable|url',
            'cover_url' => 'nullable|url',
            'youtube_id' => 'nullable|string|max:50',
            'release_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Prodotto creato con successo.');
    }

    public function edit(Product $product): Response
    {
        $product->loadCount(['keys as available_keys' => fn ($q) => $q->where('status', 'available')]);
        
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'platforms' => Platform::all(),
            'genres' => Genre::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'platform_id' => 'required|exists:platforms,id',
            'genre_id' => 'required|exists:genres,id',
            'developer' => 'nullable|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'description' => 'required|string',
            'system_requirements' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'image_url' => 'nullable|url',
            'cover_url' => 'nullable|url',
            'youtube_id' => 'nullable|string|max:50',
            'release_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        if ($request->title !== $product->title) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . uniqid();
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Prodotto aggiornato con successo.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Prodotto eliminato.');
    }

    public function addKeys(Request $request, Product $product)
    {
        $validated = $request->validate([
            'keys' => 'required|string',
        ]);

        $keysList = array_filter(array_map('trim', explode("\n", $validated['keys'])));
        
        $added = 0;
        foreach ($keysList as $key) {
            if (!empty($key)) {
                KeyStock::create([
                    'product_id' => $product->id,
                    'key_code' => $key,
                    'status' => 'available',
                ]);
                $added++;
            }
        }

        return redirect()->back()->with('success', "$added chiavi aggiunte al prodotto.");
    }
}
