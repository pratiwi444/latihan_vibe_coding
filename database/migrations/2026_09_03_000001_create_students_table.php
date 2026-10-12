<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migrasi pembuatan tabel siswa.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nisn')->unique();
            $table->string('kelas');
            $table->string('jurusan');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->string('email')->unique();
            $table->string('no_hp');
            $table->timestamps();
        });
    }

    /**
     * Rollback migrasi jika dibutuhkan.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
