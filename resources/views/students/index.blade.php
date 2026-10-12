<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Siswa | Green Campus</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[radial-gradient(circle_at_top,_#f4f9f3,_#edf5ee_30%,_#e8f2e9_100%)] min-h-screen text-slate-800 antialiased">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <!-- Header aplikasi -->
        <header class="mb-8 rounded-3xl border border-emerald-200/80 bg-white/80 p-6 shadow-[0_18px_55px_-25px_rgba(22,101,52,0.35)] backdrop-blur-sm">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p class="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">School Management</p>
                    <h1 class="text-3xl font-bold text-slate-900">Data Siswa</h1>
                </div>
                <div class="flex items-center gap-3">
                    <div class="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-2">
                        <p class="text-xs text-emerald-700">Total Siswa</p>
                        <p class="text-xl font-bold text-emerald-900">{{ $students->count() }}</p>
                    </div>
                    <div class="rounded-2xl border border-lime-100 bg-lime-50 px-4 py-2">
                        <p class="text-xs text-lime-700">Aktif</p>
                        <p class="text-xl font-bold text-lime-900">{{ $students->count() }}</p>
                    </div>
                </div>
            </div>
        </header>

        <!-- Notifikasi sukses -->
        @if (session('success'))
            <div class="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm">
                {{ session('success') }}
            </div>
        @endif

        <!-- Tampilkan error validasi -->
        @if ($errors->any())
            <div class="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <ul class="list-disc space-y-1 pl-5">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
            <!-- Form siswa -->
            <section class="rounded-3xl border border-emerald-100 bg-white p-5 shadow-[0_16px_50px_-24px_rgba(22,101,52,0.35)]">
                <div class="mb-5 flex items-center justify-between">
                    <h2 class="text-xl font-bold text-slate-900">
                        {{ $student ? 'Edit Siswa' : 'Tambah Siswa' }}
                    </h2>
                    @if ($student)
                        <a href="{{ route('students.index') }}" class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
                            Batal
                        </a>
                    @endif
                </div>

                <form action="{{ $student ? route('students.update', $student) : route('students.store') }}" method="POST" class="space-y-4">
                    @csrf
                    @if ($student)
                        @method('PUT')
                    @endif

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="sm:col-span-2">
                            <label for="nama" class="mb-1.5 block text-sm font-medium text-slate-700">Nama Lengkap</label>
                            <input type="text" id="nama" name="nama" value="{{ old('nama', $student?->nama ?? '') }}" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Masukkan nama lengkap">
                        </div>

                        <div>
                            <label for="nisn" class="mb-1.5 block text-sm font-medium text-slate-700">NISN</label>
                            <input type="text" id="nisn" name="nisn" value="{{ old('nisn', $student?->nisn ?? '') }}" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Contoh: 1234567890">
                        </div>

                        <div>
                            <label for="kelas" class="mb-1.5 block text-sm font-medium text-slate-700">Kelas</label>
                            <input type="text" id="kelas" name="kelas" value="{{ old('kelas', $student?->kelas ?? '') }}" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Contoh: XII-A">
                        </div>

                        <div>
                            <label for="jurusan" class="mb-1.5 block text-sm font-medium text-slate-700">Jurusan</label>
                            <input type="text" id="jurusan" name="jurusan" value="{{ old('jurusan', $student?->jurusan ?? '') }}" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Contoh: RPL">
                        </div>

                        <div>
                            <label for="jenis_kelamin" class="mb-1.5 block text-sm font-medium text-slate-700">Jenis Kelamin</label>
                            <select id="jenis_kelamin" name="jenis_kelamin" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                                <option value="">Pilih</option>
                                <option value="Laki-laki" {{ old('jenis_kelamin', $student?->jenis_kelamin ?? '') == 'Laki-laki' ? 'selected' : '' }}>Laki-laki</option>
                                <option value="Perempuan" {{ old('jenis_kelamin', $student?->jenis_kelamin ?? '') == 'Perempuan' ? 'selected' : '' }}>Perempuan</option>
                            </select>
                        </div>

                        <div>
                            <label for="tanggal_lahir" class="mb-1.5 block text-sm font-medium text-slate-700">Tanggal Lahir</label>
                            <input type="date" id="tanggal_lahir" name="tanggal_lahir" value="{{ old('tanggal_lahir', isset($student) && $student->tanggal_lahir ? $student->tanggal_lahir->format('Y-m-d') : '') }}" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                        </div>

                        <div class="sm:col-span-2">
                            <label for="alamat" class="mb-1.5 block text-sm font-medium text-slate-700">Alamat</label>
                            <textarea id="alamat" name="alamat" rows="3" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="Masukkan alamat lengkap">{{ old('alamat', $student?->alamat ?? '') }}</textarea>
                        </div>

                        <div>
                            <label for="email" class="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                            <input type="email" id="email" name="email" value="{{ old('email', $student?->email ?? '') }}" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="contoh@mail.com">
                        </div>

                        <div>
                            <label for="no_hp" class="mb-1.5 block text-sm font-medium text-slate-700">No. HP</label>
                            <input type="text" id="no_hp" name="no_hp" value="{{ old('no_hp', $student?->no_hp ?? '') }}" class="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" placeholder="08xxxxxxxxxx">
                        </div>
                    </div>

                    <button type="submit" class="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:scale-[1.01] hover:from-emerald-500 hover:to-green-400">
                        {{ $student ? 'Perbarui Data Siswa' : 'Simpan Data Siswa' }}
                    </button>
                </form>
            </section>

            <!-- Tabel daftar siswa -->
            <section class="rounded-3xl border border-emerald-100 bg-white p-5 shadow-[0_18px_55px_-25px_rgba(22,101,52,0.35)]">
                <div class="mb-5 flex items-center justify-between">
                    <h2 class="text-xl font-bold text-slate-900">Daftar Siswa</h2>
                    <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">{{ $students->count() }} data</span>
                </div>

                <div class="overflow-hidden rounded-2xl border border-slate-200">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
                            <thead class="bg-emerald-50">
                                <tr>
                                    <th class="px-4 py-3 font-semibold text-slate-700">Nama</th>
                                    <th class="px-4 py-3 font-semibold text-slate-700">NISN</th>
                                    <th class="px-4 py-3 font-semibold text-slate-700">Kelas</th>
                                    <th class="px-4 py-3 font-semibold text-slate-700">Jurusan</th>
                                    <th class="px-4 py-3 font-semibold text-slate-700">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 bg-white">
                                @forelse ($students as $item)
                                    <tr class="transition hover:bg-emerald-50/50">
                                        <td class="px-4 py-3">
                                            <div class="font-semibold text-slate-800">{{ $item->nama }}</div>
                                            <div class="text-xs text-slate-500">{{ $item->email }}</div>
                                        </td>
                                        <td class="px-4 py-3 text-slate-600">{{ $item->nisn }}</td>
                                        <td class="px-4 py-3 text-slate-600">{{ $item->kelas }}</td>
                                        <td class="px-4 py-3 text-slate-600">{{ $item->jurusan }}</td>
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <a href="{{ route('students.edit', $item) }}" class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition hover:bg-amber-100">Edit</a>

                                                <form action="{{ route('students.destroy', $item) }}" method="POST" onsubmit="return confirm('Yakin ingin menghapus data ini?')">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100">Hapus</button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="px-4 py-10 text-center text-slate-500">
                                            Belum ada data siswa. Tambahkan data pertama Anda.
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
</body>
</html>
