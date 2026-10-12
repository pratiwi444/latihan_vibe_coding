<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class StudentCrudTest extends TestCase
{
    use WithoutMiddleware;

    public function test_can_access_student_index_page(): void
    {
        $response = $this->get('/students');

        $response->assertOk();
    }

    public function test_can_create_a_student_record(): void
    {
        $response = $this->post('/students', [
            'nama' => 'Andi Wijaya',
            'nisn' => '1234567890',
            'kelas' => 'XII-A',
            'jurusan' => 'Rekayasa Perangkat Lunak',
            'jenis_kelamin' => 'Laki-laki',
            'tanggal_lahir' => '2008-05-12',
            'alamat' => 'Jl. Mawar No. 10',
            'email' => 'andi@example.com',
            'no_hp' => '081234567890',
        ]);

        $response->assertRedirect('/students');
    }
}
