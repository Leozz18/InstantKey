<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(Request $request): Response
    {
        $tickets = $request->user()
            ->tickets()
            ->with(['orderItem.product', 'orderItem.order'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'order_item_id' => 'required|exists:order_items,id',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|min:10|max:2000',
        ]);

        $orderItem = OrderItem::with('order')->findOrFail($data['order_item_id']);
        abort_if($orderItem->order->user_id !== $request->user()->id, 403);

        Ticket::create([
            'user_id' => $request->user()->id,
            'order_item_id' => $orderItem->id,
            'subject' => $data['subject'],
            'message' => $data['message'],
            'status' => 'open',
        ]);

        return back()->with('success', 'Ticket creato. Verrai contattato a breve.');
    }
}
