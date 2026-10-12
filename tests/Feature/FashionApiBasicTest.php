<?php

namespace Tests\Feature;

use Tests\TestCase;

class FashionApiBasicTest extends TestCase
{
    public function test_public_products_endpoint_returns_ok(): void
    {
        $response = $this->getJson('/api/products');

        $response->assertOk();
    }

    public function test_public_categories_endpoint_returns_ok(): void
    {
        $response = $this->getJson('/api/categories');

        $response->assertOk();
    }
}
