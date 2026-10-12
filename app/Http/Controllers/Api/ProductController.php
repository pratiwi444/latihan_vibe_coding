<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Public: menampilkan daftar produk dengan filter kategori & shade_hijau.
     */
    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('shade_hijau')) {
            $query->where('shade_hijau', $request->shade_hijau);
        }

        return response()->json($query->latest()->get());
    }

    /**
     * Public: detail produk.
     */
    public function show(Product $product)
    {
        return response()->json($product->load('category'));
    }

    /**
     * Admin: daftar semua produk.
     */
    public function adminIndex()
    {
        return response()->json(Product::with('category')->latest()->get());
    }

    /**
     * Admin: tambah produk baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'string'],
            'shade_hijau' => ['required', 'in:sage,olive,mint,emerald,army'],
        ]);

        $validated['slug'] = strtolower(str_replace(' ', '-', $validated['name']));

        $product = Product::create($validated);

        return response()->json($product->load('category'), 201);
    }

    /**
     * Admin: update produk.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'string'],
            'shade_hijau' => ['required', 'in:sage,olive,mint,emerald,army'],
        ]);

        $validated['slug'] = strtolower(str_replace(' ', '-', $validated['name']));
        $product->update($validated);

        return response()->json($product->load('category'));
    }

    /**
     * Admin: hapus produk.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Produk berhasil dihapus']);
    }
}
