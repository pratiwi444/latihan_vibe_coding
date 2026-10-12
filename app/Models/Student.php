<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    /**
     * Nama tabel database yang digunakan.
     */
    protected $table = 'students';

    /**
     * Kolom yang boleh diisi saat proses create/update.
     */
    protected $fillable = [
        'nama',
        'nisn',
        'kelas',
        'jurusan',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat',
        'email',
        'no_hp',
    ];

    /**
     * Format data tanggal agar lebih mudah ditampilkan di Blade.
     */
    protected $casts = [
        'tanggal_lahir' => 'date',
    ];
}
