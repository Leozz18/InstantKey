<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\KeyDeliveryService;

class TicketController extends Controller
{
    public function index(): Response
    {
        $tickets = Ticket::with(['user', 'orderItem.product'])
            ->orderByRaw("FIELD(status, 'open', 'resolved')")
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function show(Ticket $ticket): Response
    {
        $ticket->load(['user', 'orderItem.product.platform', 'orderItem.key']);
        
        return Inertia::render('Admin/Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function resolve(Request $request, Ticket $ticket, KeyDeliveryService $keyDeliveryService)
    {
        $validated = $request->validate([
            'resolution' => 'required|string',
            'replace_key' => 'boolean',
        ]);

        if ($ticket->status === 'resolved') {
            return redirect()->back()->with('error', 'Il ticket è già stato risolto.');
        }

        $message = 'Ticket risolto. ' . $validated['resolution'];

        if ($request->boolean('replace_key')) {
            $newKey = $keyDeliveryService->replaceKey($ticket->orderItem);
            
            if ($newKey) {
                $message .= ' (Chiave sostituita con successo).';
            } else {
                return redirect()->back()->with('error', 'Impossibile sostituire la chiave: stock esaurito.');
            }
        }

        $ticket->update([
            'status' => 'resolved',
            'admin_response' => $validated['resolution'],
            'resolved_at' => now(),
        ]);

        return redirect()->route('admin.tickets.index')->with('success', $message);
    }
}
