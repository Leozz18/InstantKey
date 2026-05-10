<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/catalogo', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/giochi/{slug}', [ProductController::class, 'show'])->name('products.show');

Route::get('/carrello', [CartController::class, 'index'])->name('cart.index');
Route::post('/carrello/{product}', [CartController::class, 'add'])->name('cart.add');
Route::patch('/carrello/{product}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/carrello/{product}', [CartController::class, 'remove'])->name('cart.remove');
Route::post('/carrello/sconto', [CartController::class, 'applyDiscount'])->name('cart.discount.apply');
Route::delete('/carrello/sconto', [CartController::class, 'removeDiscount'])->name('cart.discount.remove');

Route::get('/contatti', fn () => Inertia::render('Contact'))->name('contact');
Route::get('/faq', fn () => Inertia::render('Faq'))->name('faq');
Route::get('/chi-siamo', fn () => Inertia::render('About'))->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'process'])->name('checkout.process');

    Route::get('/ordini', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/ordini/{order}', [OrderController::class, 'show'])->name('orders.show');

    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist/{product}', [WishlistController::class, 'toggle'])->name('wishlist.toggle');
    Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

    Route::post('/giochi/{product}/recensioni', [ReviewController::class, 'store'])->name('reviews.store');

    Route::get('/ticket', [TicketController::class, 'index'])->name('tickets.index');
    Route::post('/ticket', [TicketController::class, 'store'])->name('tickets.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profilo', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profilo', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profilo', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/auth.php';
