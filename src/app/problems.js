export const problemsData = {
    1: [
        {
            title: "Soal 1.1: Pendapatan Penjual Sayur",
            description: "Seorang pedagang sayur menjual 3 jenis sayur: kangkung, wortel, dan kol. Masukkan jumlah keranjang untuk tiap jenis dan harga per keranjang. Hitung total pendapatan kotor, potong biaya transportasi tetap, dan tampilkan pendapatan bersih.",
            placeholder: "# Soal 1.1 - Pendapatan Penjual Sayur\nkangkung = int(input('Keranjang kangkung: '))\nwortel = int(input('Keranjang wortel: '))\nkol = int(input('Keranjang kol: '))\nharga = float(input('Harga per keranjang (Rp): '))\n# Lengkapi program..."
        },
        {
            title: "Soal 1.2: Konverter Suhu Penangkaran", 
            description: "Peternak butuh bantuan: ia memberi suhu dalam Celcius. Buat program yang membaca suhu Celcius (float), konversi ke Fahrenheit dan Kelvin, lalu tampilkan keduanya.",
            placeholder: "# Soal 1.2 - Konverter Suhu\nc = float(input('Suhu (°C): '))\n# Rumus Fahrenheit: (c * 9/5) + 32\n# Rumus Kelvin: c + 273.15\n# Lengkapi program..."
        },
        {
            title: "Soal 1.3: Daftar Belanja dengan Total & PPN",
            description: "Seorang pembeli memasukkan nama barang, harga, dan jumlah barang. Program menerima 2 barang (sederhana), hitung subtotal, tambah PPN 11%, tampilkan ringkasan.",
            placeholder: "# Soal 1.3 - Daftar Belanja dengan PPN\nnama1 = input('Nama barang 1: ')\nharga1 = float(input('Harga barang 1: Rp '))\njml1 = int(input('Jumlah barang 1: '))\n# Lengkapi untuk barang kedua dan hitung PPN 11%..."
        },
        {
            title: "Soal 1.4: Umur di Tahun Tertentu",
            description: "Seorang siswa memasukkan tahun lahir. Buat program yang meminta juga tahun target (mis. 2030) dan menampilkan umur di tahun target. Validasi: jika tahun target < tahun lahir, tampilkan pesan error.",
            placeholder: "# Soal 1.4 - Hitung Umur di Tahun Target\ntahun_lahir = int(input('Tahun lahir: '))\ntahun_target = int(input('Tahun target: '))\n# Tambahkan validasi dan hitung umur..."
        },
        {
            title: "Soal 1.5: Hitung Rata-rata Nilai Sederhana",
            description: "Guru memasukkan 3 nilai ujian. Buat program menghitung rata-rata (float) dan cetak Lulus jika rata ≥ 60, selain itu Tidak Lulus.",
            placeholder: "# Soal 1.5 - Rata-rata Nilai\na = float(input('Nilai 1: '))\nb = float(input('Nilai 2: '))\nc = float(input('Nilai 3: '))\n# Hitung rata-rata dan tentukan status kelulusan..."
        }
    ],
    2: [
        {
            title: "Soal 2.1: Penentu Indeks Nilai",
            description: "Seorang dosen memiliki daftar nilai akhir mahasiswa. Program membaca satu nilai (0–100) dan tampilkan indeks A/B/C/D/E dengan rentang: A ≥85, B 75–84, C 60–74, D 45–59, E <45. Jika input di luar 0–100, minta ulang (gunakan loop).",
            placeholder: "# Soal 2.1 - Penentu Indeks Nilai\nwhile True:\n    nilai = int(input('Masukkan nilai (0-100): '))\n    if 0 <= nilai <= 100:\n        break\n    print('Nilai tidak valid. Coba lagi.')\n# Tambahkan logika if-elif-else untuk indeks..."
        },
        {
            title: "Soal 2.2: Mesin Cetak Tiket Antrian Bank",
            description: "Petugas memasukkan N (jumlah tiket). Cetak nomor antrian 1..N. Namun setiap 5 tiket cetak garis pemisah. (Gunakan loop)",
            placeholder: "# Soal 2.2 - Mesin Cetak Tiket Antrian\nn = int(input('Berapa tiket? '))\nfor i in range(1, n+1):\n    print(f'Nomor Antrian: {i}')\n    # Tambahkan kondisi untuk garis pemisah setiap 5 tiket..."
        },
        {
            title: "Soal 2.3: Tebak Angka Berulang (Game)",
            description: "Seorang pemain diberi 7 kesempatan menebak angka rahasia (1–100). Program memberi tahu lebih besar / lebih kecil. Jika menang, tampilkan jumlah percobaan; jika habis, tampilkan angka rahasia.",
            placeholder: "# Soal 2.3 - Game Tebak Angka\nimport random\nrahasia = random.randint(1, 100)\nkesempatan = 7\nfor i in range(1, kesempatan+1):\n    # Implementasi game tebak angka..."
        },
        {
            title: "Soal 2.4: Filter Bilangan",
            description: "Seorang analis punya daftar angka (dipisah spasi). Buat program yang menampilkan hanya angka genap dari daftar, dan beritahu total angka genap yang ditemukan.",
            placeholder: "# Soal 2.4 - Filter Bilangan Genap\ndata = input('Masukkan angka dipisah spasi: ')\nangka = [int(x) for x in data.split()]\n# Filter dan tampilkan angka genap..."
        },
        {
            title: "Soal 2.5: Kalkulator Sederhana Menu",
            description: "Buat program menu berulang: 1) Tambah, 2) Kurang, 3) Kali, 4) Bagi, 5) Keluar. Program menerima dua angka tiap operasi dan menampilkan hasil. Loop sampai user pilih Keluar.",
            placeholder: "# Soal 2.5 - Kalkulator Menu\nwhile True:\n    print('1.+ 2.- 3.* 4./ 5.Keluar')\n    pilih = input('Pilih: ')\n    if pilih == '5':\n        break\n    # Implementasi operasi matematika..."
        }
    ],
    3: [
        {
            title: "Soal 3.1: Dekripsi Karakter Kunci",
            description: "Seorang agen menerima pesan (string) dan indeks k. Tulis program yang mencetak karakter di posisi k. Jika indeks invalid, tampilkan pesan yang ramah. Gunakan 0-based index.",
            placeholder: "# Soal 3.1 - Dekripsi Karakter\npesan = input('Pesan: ')\nk = int(input('Indeks k (0-based): '))\n# Cek validitas indeks dan tampilkan karakter..."
        },
        {
            title: "Soal 3.2: Palindrom Manuskrip",
            description: "Arkeolog menemukan kata; program harus cek apakah kata itu palindrom (abaikan huruf besar kecil dan spasi). Tampilkan YA atau TIDAK.",
            placeholder: "# Soal 3.2 - Pengecekan Palindrom\nkata = input('Kata: ').lower().replace(' ', '')\n# Gunakan slicing [::-1] untuk membalik kata..."
        },
        {
            title: "Soal 3.3: Daftar Belanja Interaktif",
            description: "Buat program yang menerima beberapa item (nama:harga) dipisah koma, contoh: susu:10000,roti:5000. Parse menjadi list of tuples, tampilkan total harga dan daftar barang.",
            placeholder: "# Soal 3.3 - Daftar Belanja Interaktif\ndata = input('Masukkan item (nama:harga, ...): ')\nitems = []\ntotal = 0\nfor part in data.split(','):\n    # Parse nama dan harga..."
        },
        {
            title: "Soal 3.4: Hitung Kata Unik",
            description: "Seorang peneliti memberi kalimat panjang. Buat program yang menampilkan berapa banyak kata unik (case-insensitive) ada pada kalimat.",
            placeholder: "# Soal 3.4 - Hitung Kata Unik\nkalimat = input('Kalimat: ').lower()\nkata = [w for w in kalimat.split()]\n# Gunakan set untuk mencari kata unik..."
        },
        {
            title: "Soal 3.5: Urutkan Nilai Mahasiswa",
            description: "Koordinator memasukkan deretan nilai (dipisah spasi). Buat program yang mengurutkan nilai dari besar ke kecil dan menampilkan 3 nilai tertinggi tanpa mengubah daftar asli (gunakan copy).",
            placeholder: "# Soal 3.5 - Urutkan Nilai\ndata = input('Nilai (spasi): ')\nnilai = [int(x) for x in data.split()]\nsalinan = nilai.copy()\n# Urutkan dan ambil 3 tertinggi..."
        }
    ],
    4: [
        {
            title: "Soal 4.1: Buat Peta Grid",
            description: "Desainer ingin peta ukuran R x C. Buat program yang membaca R dan C lalu membuat matriks R×C berisi 0 dan menampilkannya baris per baris.",
            placeholder: "# Soal 4.1 - Generator Peta Grid\nr = int(input('Baris R: '))\nc = int(input('Kolom C: '))\npeta = [[0 for _ in range(c)] for _ in range(r)]\n# Tampilkan peta..."
        },
        {
            title: "Soal 4.2: Papan Tic-Tac-Toe",
            description: "Buat program yang menampilkan papan 3x3 (semua -) dan minta input koordinat (baris,kolom) untuk menaruh simbol X. Tampilkan papan setelah penempatan. (Tiap eksekusi hanya satu langkah).",
            placeholder: "# Soal 4.2 - Papan Tic-Tac-Toe\npapan = [['-' for _ in range(3)] for _ in range(3)]\nfor row in papan:\n    print(' '.join(row))\n# Minta input dan update papan..."
        },
        {
            title: "Soal 4.3: Jumlah Setiap Baris",
            description: "Seorang pelatih punya matriks skor tim (baris=tim, kolom=ronde). Program baca matriks (baris pertama: R C; lalu R baris angka) – tampilkan jumlah skor per tim (per baris).",
            placeholder: "# Soal 4.3 - Jumlah Skor per Tim\nr, c = map(int, input('R C: ').split())\nmat = []\nfor _ in range(r):\n    row = list(map(int, input().split()))\n    mat.append(row)\n# Hitung total per tim..."
        },
        {
            title: "Soal 4.4: Papan Catur",
            description: "Buat program mencetak pola papan catur N x N (input N) dengan # dan spasi bergantian, contoh N=4: # # / # # / # # / # #",
            placeholder: "# Soal 4.4 - Pola Papan Catur\nn = int(input('N: '))\nfor i in range(n):\n    row = ''\n    for j in range(n):\n        # Gunakan modulo untuk pola bergantian..."
        },
        {
            title: "Soal 4.5: Cari Angka di Matriks",
            description: "Seorang operator mencari sebuah nilai X di matriks R×C input. Bila ditemukan, cetak posisi (baris,kolom) pertama yang ditemukan; jika tidak, cetak 'Tidak ditemukan'.",
            placeholder: "# Soal 4.5 - Pencarian di Matriks\nr, c = map(int, input('R C: ').split())\nmat = [list(map(int, input().split())) for _ in range(r)]\nx = int(input('Cari angka X: '))\n# Cari menggunakan nested loop..."
        }
    ],
    5: [
        {
            title: "Soal 5.1: Fungsi Hitung Total Belanja",
            description: "Buat fungsi hitung_total(subtotal) yang menambahkan PPN 11% dan diskon 5% bila subtotal ≥ 500000. Program utama meminta subtotal, memanggil fungsi, dan menampilkan total.",
            placeholder: "# Soal 5.1 - Fungsi Hitung Total Belanja\ndef hitung_total(subtotal):\n    '''Hitung total dengan PPN 11% dan diskon 5% jika subtotal >= 500000'''\n    ppn = 0.11 * subtotal\n    total = subtotal + ppn\n    # Tambahkan logika diskon...\n    return total\n\n# Program utama\nsubtotal = float(input('Subtotal: Rp '))\nprint(f'Total bayar: Rp {hitung_total(subtotal):,.2f}')"
        },
        {
            title: "Soal 5.2: Cek Usia Pendaftar",
            description: "Buat fungsi cek_umur(umur, minimal=15) mengembalikan True/False. Dalam program utama, baca umur dan tampilkan pesan sesuai hasil fungsi.",
            placeholder: "# Soal 5.2 - Cek Usia Pendaftar\ndef cek_umur(umur, minimal=15):\n    return umur >= minimal\n\numur = int(input('Umur: '))\nif cek_umur(umur):\n    print('Memenuhi syarat.')\nelse:\n    print('Belum memenuhi syarat.')"
        },
        {
            title: "Soal 5.3: Modul Kalkulator Serbaguna",
            description: "Buat fungsi kalkulator(a, b, op) yang menerima operasi + - * / dan menangani pembagian oleh nol dan operasi tidak dikenal (kembalikan string error). Program utama baca a,b,op lalu tampil.",
            placeholder: "# Soal 5.3 - Kalkulator Serbaguna\ndef kalkulator(a, b, op):\n    if op == '+':\n        return a + b\n    elif op == '-':\n        return a - b\n    # Lengkapi untuk *, / dan error handling...\n\na = float(input('A: '))\nb = float(input('B: '))\nop = input('Operasi (+-*/): ')\nprint(kalkulator(a, b, op))"
        },
        {
            title: "Soal 5.4: Refactor Tic-Tac-Toe dengan Fungsi",
            description: "Refactor bagian ganti_giliran dan cetak_papan sebagai fungsi. Buat program sederhana yang membuat papan 3x3, memanggil cetak_papan, minta input sekali, ganti giliran menggunakan fungsi lalu cetak papan.",
            placeholder: "# Soal 5.4 - Tic-Tac-Toe dengan Fungsi\ndef cetak_papan(papan):\n    for row in papan:\n        print(' | '.join(row))\n\ndef ganti_giliran(g):\n    return 'O' if g == 'X' else 'X'\n\npapan = [['-' for _ in range(3)] for _ in range(3)]\ngiliran = 'X'\n# Gunakan fungsi untuk cetak dan ganti giliran..."
        },
        {
            title: "Soal 5.5: Fungsi Rata-rata List dengan Validasi",
            description: "Buat fungsi rata2(nums) yang menerima list angka. Jika list kosong, kembalikan None. Program utama baca angka (spasi), panggil fungsi, lalu tampilkan hasil atau pesan kalau data kosong.",
            placeholder: "# Soal 5.5 - Fungsi Rata-rata dengan Validasi\ndef rata2(nums):\n    if not nums:\n        return None\n    return sum(nums) / len(nums)\n\ndata = input('Masukkan angka (spasi): ').strip()\nif data == '':\n    nums = []\nelse:\n    nums = [float(x) for x in data.split()]\n# Gunakan fungsi dan tampilkan hasil..."
        }
    ]
};

export function generateProblems(chapterNum) {
    const container = document.getElementById('dynamic-problems');
    container.innerHTML = '';
    const problems = problemsData[chapterNum];
    problems.forEach((problem, index) => {
        const problemId = `${chapterNum}-${index + 1}`;
        const problemElement = createProblemElement(problem, problemId, chapterNum);
        container.appendChild(problemElement);
    });
}

export function createProblemElement(problem, problemId, chapterNum) {
    const problemDiv = document.createElement('div');
    problemDiv.className = 'problem-item';
    problemDiv.innerHTML = `
        <div class="problem-header">
            <h3 class="problem-title">${problem.title}</h3>
            <div class="problem-description">${problem.description}</div>
        </div>
        <div class="code-workspace">
            <div class="code-editor-section">
                <div class="editor-toolbar">
                    <span>Python Editor</span>
                    <span>Bab ${chapterNum}</span>
                </div>
                <textarea class="code-editor" id="editor-${problemId}" placeholder="${problem.placeholder}"></textarea>
            </div>
            <div class="output-section">
                <div class="editor-toolbar">
                    <span>Output Console</span>
                    <span>Hasil Eksekusi</span>
                </div>
                <div class="output-display" id="output-${problemId}">Tekan tombol "Jalankan Kode" untuk melihat hasil...</div>
            </div>
        </div>
        <div class="control-bar">
            <button class="run-button" onclick="runCode('${problemId}')">
                <span>▶</span>
                <span>Jalankan Kode</span>
            </button>
            <button class="reset-button" onclick="resetCode('${problemId}')">Reset</button>
            <div class="score-badge" id="score-${problemId}">Skor: 0/100</div>
        </div>
    `;
    return problemDiv;
}