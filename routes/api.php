<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

// Endpoint publik: daftar produk, detail, kategori, dan health check.
Route::get('/health', fn () => ['status' => 'ok']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Route autentikasi pembeli.
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Pembeli: checkout + riwayat pesanan.
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'history']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
});

// Route admin: validasi role admin menggunakan middleware role.
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/summary', [AdminController::class, 'summary']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/admin/orders', [AdminController::class, 'orders']);
    Route::patch('/admin/orders/{order}/status', [AdminController::class, 'updateOrderStatus']);
    Route::get('/admin/sales-report', [AdminController::class, 'salesReport']);

    Route::get('/admin/categories', [CategoryController::class, 'adminIndex']);
    Route::post('/admin/categories', [CategoryController::class, 'store']);
    Route::put('/admin/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy']);

    Route::get('/admin/products', [ProductController::class, 'adminIndex']);
    Route::post('/admin/products', [ProductController::class, 'store']);
    Route::put('/admin/products/{product}', [ProductController::class, 'update']);
    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy']);
});
