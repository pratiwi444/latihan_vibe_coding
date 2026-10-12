<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Pembeli: checkout dan simpan order ke database.
     */
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'items' => ['required', 'array'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'shipping_address' => ['required', 'string'],
        ]);

        $total = 0;

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $total += $product->price * $item['quantity'];
        }

        $order = Order::create([
            'user_id' => $request->user()->id,
            'order_code' => 'GREEN-' . strtoupper(Str::random(8)),
            'total' => $total,
            'status' => 'pending',
            'shipping_address' => $validated['shipping_address'],
        ]);

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price_at_time' => $product->price,
            ]);

            $product->decrement('stock', $item['quantity']);
        }

        return response()->json([
            'message' => 'Order berhasil dibuat',
            'order' => $order->load('items.product'),
        ], 201);
    }

    /**
     * Pembeli: riwayat pesanan sendiri.
     */
    public function history(Request $request)
    {
        $orders = Order::with('items.product')->where('user_id', $request->user()->id)->latest()->get();

        return response()->json($orders);
    }

    /**
     * Pembeli: detail order tertentu.
     */
    public function show(Request $request, Order $order)
    {
        abort_unless($order->user_id === $request->user()->id, 403, 'Anda tidak memiliki akses');

        return response()->json($order->load('items.product'));
    }
}
