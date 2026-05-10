<?php

namespace App\Services;

use App\Models\KeyStock;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class KeyDeliveryService
{
    /**
     * Assegna una chiave dal pool a ogni order item dell'ordine.
     * Operazione atomica: se non ci sono abbastanza chiavi, fallisce in toto.
     */
    public function deliverKeys(Order $order): void
    {
        DB::transaction(function () use ($order) {
            foreach ($order->items as $item) {
                if ($item->key_id) {
                    continue;
                }

                $key = KeyStock::where('product_id', $item->product_id)
                    ->where('status', 'available')
                    ->lockForUpdate()
                    ->first();

                if (! $key) {
                    throw new RuntimeException(
                        "Stock esaurito per il prodotto ID {$item->product_id}"
                    );
                }

                $key->update([
                    'status' => 'sold',
                    'sold_at' => now(),
                ]);

                $item->update(['key_id' => $key->id]);
            }
        });
    }

    /**
     * Verifica se per ogni item nel carrello ci sono abbastanza chiavi disponibili.
     */
    public function checkAvailability(array $cartItems): bool
    {
        foreach ($cartItems as $productId => $quantity) {
            $available = KeyStock::where('product_id', $productId)
                ->where('status', 'available')
                ->count();

            if ($available < $quantity) {
                return false;
            }
        }

        return true;
    }

    /**
     * Sostituisce una chiave non funzionante con una nuova dal pool.
     */
    public function replaceKey(OrderItem $item): ?KeyStock
    {
        return DB::transaction(function () use ($item) {
            if ($item->key) {
                $item->key->update(['status' => 'invalid']);
            }

            $newKey = KeyStock::where('product_id', $item->product_id)
                ->where('status', 'available')
                ->lockForUpdate()
                ->first();

            if (! $newKey) {
                return null;
            }

            $newKey->update([
                'status' => 'sold',
                'sold_at' => now(),
            ]);

            $item->update(['key_id' => $newKey->id]);

            return $newKey;
        });
    }
}
