<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_buyer_can_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'New Buyer',
            'email' => 'newbuyer@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '081234567890',
            'address' => 'Bandung',
        ]);

        $response
            ->assertStatus(201)
            ->assertJsonPath('user.role', 'pembeli')
            ->assertJsonStructure(['user', 'token']);

        $this->assertDatabaseHas('users', [
            'email' => 'newbuyer@example.com',
            'role' => 'pembeli',
        ]);
    }

    public function test_buyer_can_login(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Buyer Login',
            'email' => 'buyerlogin@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '081234567891',
            'address' => 'Jakarta',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'buyerlogin@example.com',
            'password' => 'password123',
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonPath('user.role', 'pembeli')
            ->assertJsonStructure(['user', 'token']);
    }

    public function test_admin_can_login(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Admin User',
            'email' => 'adminlogin@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '081234567892',
            'address' => 'Surabaya',
        ]);

        $user = \App\Models\User::find(1);
        if ($user) {
            $user->role = 'admin';
            $user->save();
        }

        $response = $this->postJson('/api/admin/login', [
            'email' => 'adminlogin@example.com',
            'password' => 'password123',
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonPath('user.role', 'admin')
            ->assertJsonStructure(['user', 'token']);
    }
}
