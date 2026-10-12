<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed data awal untuk toko fashion hijau.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@greenstyle.com'],
            [
                'name' => 'Admin GreenStyle',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'phone' => '081234567890',
                'address' => 'Jakarta Selatan',
            ]
        );

        User::firstOrCreate(
            ['email' => 'buyer@greenstyle.com'],
            [
                'name' => 'Pembeli GreenStyle',
                'password' => Hash::make('buyer123'),
                'role' => 'pembeli',
                'phone' => '081298765432',
                'address' => 'Bandung',
            ]
        );

        $categories = [
            ['name' => 'Dress Kasual', 'slug' => 'dress-kasual', 'description' => 'Dress hijau santai untuk hari-hari ringan dan nyaman.'],
            ['name' => 'Dress Pesta', 'slug' => 'dress-pesta', 'description' => 'Dress hijau elegan untuk acara spesial dan malam istimewa.'],
            ['name' => 'Dress Kerja', 'slug' => 'dress-kerja', 'description' => 'Dress hijau profesional untuk tampilan rapi di kantor.'],
            ['name' => 'Midi Dress', 'slug' => 'midi-dress', 'description' => 'Midi dress dengan siluet menenangkan dan modern.'],
            ['name' => 'Maxi Dress', 'slug' => 'maxi-dress', 'description' => 'Maxi dress hijau yang anggun dan flowy.'],
        ];

        foreach ($categories as $categoryData) {
            Category::firstOrCreate(['slug' => $categoryData['slug']], $categoryData);
        }

        $greenImageFor = function (string $label, string $color): string {
            $svg = sprintf(
                '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0%%" stop-color="%s"/><stop offset="1" stop-color="#f4efe8"/></linearGradient></defs><rect width="800" height="1000" fill="url(#g)"/><path d="M290 130 C330 90, 470 90, 510 130 L560 295 L530 760 C510 840, 455 890, 400 890 C345 890, 290 840, 270 760 L240 295 Z" fill="rgba(255,255,255,0.22)"/><path d="M345 160 L400 90 L455 160 L515 330 L490 820 L400 910 L310 820 L285 330 Z" fill="rgba(26,73,44,0.4)"/><path d="M340 180 L400 120 L460 180 L500 340 L400 500 L300 340 Z" fill="rgba(255,255,255,0.10)"/><circle cx="400" cy="250" r="82" fill="rgba(255,255,255,0.12)"/><text x="400" y="810" text-anchor="middle" font-size="42" font-family="Arial, sans-serif" font-weight="700" fill="#173b2a">%s</text></svg>',
                $color,
                htmlspecialchars($label, ENT_XML1, 'UTF-8')
            );

            return 'data:image/svg+xml;charset=UTF-8,' . rawurlencode($svg);
        };

        $products = [
            ['category' => 'Dress Kasual', 'name' => 'Sage Casual Dress', 'price' => 299000, 'stock' => 12, 'shade' => 'sage', 'color' => '#9eb77f'],
            ['category' => 'Dress Kasual', 'name' => 'Mint Daily Dress', 'price' => 279000, 'stock' => 14, 'shade' => 'mint', 'color' => '#8ec7a0'],
            ['category' => 'Dress Pesta', 'name' => 'Emerald Satin Dress', 'price' => 520000, 'stock' => 8, 'shade' => 'emerald', 'color' => '#3e7a52'],
            ['category' => 'Dress Pesta', 'name' => 'Olive Evening Dress', 'price' => 560000, 'stock' => 7, 'shade' => 'olive', 'color' => '#7a8d59'],
            ['category' => 'Dress Kerja', 'name' => 'Army Green Work Dress', 'price' => 430000, 'stock' => 10, 'shade' => 'army', 'color' => '#5f6b46'],
            ['category' => 'Dress Kerja', 'name' => 'Sage Office Dress', 'price' => 410000, 'stock' => 11, 'shade' => 'sage', 'color' => '#9eb77f'],
            ['category' => 'Midi Dress', 'name' => 'Olive Midi Dress', 'price' => 390000, 'stock' => 9, 'shade' => 'olive', 'color' => '#7a8d59'],
            ['category' => 'Maxi Dress', 'name' => 'Mint Maxi Dress', 'price' => 470000, 'stock' => 6, 'shade' => 'mint', 'color' => '#8ec7a0'],
        ];

        foreach ($products as $productData) {
            $category = Category::where('name', $productData['category'])->first();

            Product::firstOrCreate(
                ['slug' => strtolower(str_replace(' ', '-', $productData['name']))],
                [
                    'category_id' => $category->id,
                    'name' => $productData['name'],
                    'slug' => strtolower(str_replace(' ', '-', $productData['name'])),
                    'description' => 'Dress hijau ' . strtolower($productData['category']) . ' dengan warna ' . $productData['shade'] . ' yang lembut, stylish, dan nyaman dipakai sepanjang hari.',
                    'price' => $productData['price'],
                    'stock' => $productData['stock'],
                    'image' => $greenImageFor($productData['name'], $productData['color']),
                    'shade_hijau' => $productData['shade'],
                ]
            );
        }
    }
}
