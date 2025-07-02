<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'Index'])->name('dashboard');
    Route::get('point-of-sale', [OrderController::class, 'point_of_sale'])->name('point-of-sale');
    Route::get('product', [ProductController::class, 'index'])->name('product');
    Route::post('/product/store', [ProductController::class, 'store'])->name('product.store');
    Route::post('/product/delete/{id}', [ProductController::class, 'delete'])->name('product.delete');
    Route::post('/store/order', [OrderController::class, 'store_order'])->name('store.order');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
