<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Services\CartService;
use App\Services\KeyDeliveryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CheckoutController extends Controller
{
    public function __construct(
        private CartService $cart,
        private KeyDeliveryService $delivery,
    ) {}

    public function index(): Response|RedirectResponse
    {
        if ($this->cart->count() === 0) {
            return redirect()->route('catalog.index')
                ->with('error', 'Il tuo carrello è vuoto.');
        }

        return Inertia::render('Checkout/Index', [
            'cart' => $this->cart->summary(),
        ]);
    }

    public function process(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'payment_method' => 'required|in:stripe,paypal,demo',
        ]);

        if ($this->cart->count() === 0) {
            return redirect()->route('cart.index')
                ->with('error', 'Carrello vuoto.');
        }

        $items = $this->cart->items();
        if (! $this->delivery->checkAvailability($items)) {
            return redirect()->route('cart.index')
                ->with('error', 'Una o più chiavi non sono più disponibili.');
        }

        try {
            $order = DB::transaction(function () use ($data, $request, $items) {
                $detailedItems = $this->cart->detailedItems();

                $order = Order::create([
                    'order_number' => 'IK-' . strtoupper(Str::random(10)),
                    'user_id' => $request->user()->id,
                    'subtotal' => $this->cart->subtotal(),
                    'discount_amount' => $this->cart->discountAmount(),
                    'total_price' => $this->cart->total(),
                    'discount_code_id' => $this->cart->discount()?->id,
                    'payment_status' => 'pending',
                    'payment_method' => $data['payment_method'],
                ]);

                foreach ($detailedItems as $item) {
                    $quantity = $items[$item['id']] ?? 0;
                    for ($i = 0; $i < $quantity; $i++) {
                        OrderItem::create([
                            'order_id' => $order->id,
                            'product_id' => $item['id'],
                            'unit_price' => $item['price'],
                        ]);
                    }
                }

                if ($discount = $this->cart->discount()) {
                    $discount->increment('used_count');
                }

                return $order;
            });

            $order->update([
                'payment_status' => 'paid',
                'paid_at' => now(),
                'stripe_payment_id' => 'demo_' . Str::random(20),
            ]);

            $this->delivery->deliverKeys($order->fresh('items'));
            $this->cart->clear();

            return redirect()->route('orders.show', $order)
                ->with('success', 'Pagamento completato! Le tue chiavi sono pronte.');
        } catch (Throwable $e) {
            return redirect()->route('cart.index')
                ->with('error', 'Errore durante il pagamento: ' . $e->getMessage());
        }
    }
}
