<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KeyStock;
use App\Models\Order;
use App\Models\Product;
use App\Models\Ticket;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_revenue' => round((float) Order::where('payment_status', 'paid')->sum('total_price'), 2),
            'orders_count' => Order::where('payment_status', 'paid')->count(),
            'users_count' => User::count(),
            'products_count' => Product::where('is_active', true)->count(),
            'available_keys' => KeyStock::where('status', 'available')->count(),
            'sold_keys' => KeyStock::where('status', 'sold')->count(),
            'open_tickets' => Ticket::where('status', 'open')->count(),
        ];

        $latestOrders = Order::with('user', 'items.product')
            ->latest()
            ->take(10)
            ->get();

        $lowStock = Product::with('platform')
            ->withCount(['keys as available_keys' => fn ($q) => $q->where('status', 'available')])
            ->having('available_keys', '<', 5)
            ->orderBy('available_keys')
            ->take(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'latestOrders' => $latestOrders,
            'lowStock' => $lowStock,
        ]);
    }
}
