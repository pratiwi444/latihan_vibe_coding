<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Admin: ringkasan dashboard.
     */
    public function summary()
    {
        $totalSales = Order::whereIn('status', ['paid', 'processing', 'shipped', 'completed'])->sum('total');
        $ordersCount = Order::count();
        $usersCount = User::count();

        return response()->json([
            'total_sales' => (float) $totalSales,
            'orders_count' => $ordersCount,
            'users_count' => $usersCount,
        ]);
    }

    /**
     * Admin: daftar semua users.
     */
    public function users()
    {
        return response()->json(User::latest()->get());
    }

    /**
     * Admin: daftar semua orders.
     */
    public function orders()
    {
        return response()->json(Order::with('user', 'items.product')->latest()->get());
    }

    /**
     * Admin: ubah status order.
     */
    public function updateOrderStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,paid,processing,shipped,completed,cancelled'],
        ]);

        $order->update($validated);

        return response()->json($order);
    }

    /**
     * Admin: laporan penjualan per bulan.
     */
    public function salesReport()
    {
        $report = Order::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, SUM(total) as total')
            ->whereIn('status', ['paid', 'processing', 'shipped', 'completed'])
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($report);
    }
}
