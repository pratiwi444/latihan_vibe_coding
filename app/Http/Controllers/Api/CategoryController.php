<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Public: menampilkan semua kategori.
     */
    public function index()
    {
        return response()->json(Category::all());
    }

    /**
     * Public: detail kategori.
     */
    public function show(Category $category)
    {
        return response()->json($category->load('products'));
    }

    /**
     * Admin: daftar kategori untuk panel admin.
     */
    public function adminIndex()
    {
        return response()->json(Category::all());
    }

    /**
     * Admin: tambah kategori baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
        ]);

        $validated['slug'] = strtolower(str_replace(' ', '-', $validated['name']));

        $category = Category::create($validated);

        return response()->json($category, 201);
    }

    /**
     * Admin: update kategori.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
        ]);

        $validated['slug'] = strtolower(str_replace(' ', '-', $validated['name']));
        $category->update($validated);

        return response()->json($category);
    }

    /**
     * Admin: hapus kategori.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message' => 'Kategori berhasil dihapus']);
    }
}
