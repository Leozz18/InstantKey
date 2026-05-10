<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function __construct(private CartService $cart) {}

    public function index(): Response
    {
        return Inertia::render('Cart/Index', [
            'cart' => $this->cart->summary(),
        ]);
    }

    public function add(Request $request, Product $product): RedirectResponse
    {
        $request->validate(['quantity' => 'nullable|integer|min:1|max:10']);

        if ($product->available_keys_count < ($request->input('quantity', 1))) {
            return back()->with('error', 'Stock chiavi insufficiente per questo prodotto.');
        }

        $this->cart->add($product->id, (int) $request->input('quantity', 1));

        return back()->with('success', "\"{$product->title}\" aggiunto al carrello!");
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate(['quantity' => 'required|integer|min:0|max:10']);

        $this->cart->update($product->id, (int) $data['quantity']);

        return back();
    }

    public function remove(Product $product): RedirectResponse
    {
        $this->cart->remove($product->id);

        return back()->with('success', 'Prodotto rimosso dal carrello.');
    }

    public function applyDiscount(Request $request): RedirectResponse
    {
        $data = $request->validate(['code' => 'required|string|max:64']);

        if ($this->cart->applyDiscount(strtoupper($data['code']))) {
            return back()->with('success', 'Codice sconto applicato!');
        }

        return back()->with('error', 'Codice sconto non valido o scaduto.');
    }

    public function removeDiscount(): RedirectResponse
    {
        $this->cart->removeDiscount();

        return back();
    }
}
