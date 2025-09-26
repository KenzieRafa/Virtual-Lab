function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    const selectedButton = document.querySelector(`[data-page="${pageId}"]`);
    if (selectedButton) selectedButton.classList.add('active');
    
    if (pageId === 'practice') {
        backToChapterSelection();
    }
    
    if (pageId === 'drag-drop') {
        resetDragExercise();
    }
}

function showChapterProblems(chapterNum) {
    document.getElementById('chapter-selection').style.display = 'none';
    document.getElementById('problems-container').style.display = 'block';
    
    const chapterTitles = {
        1: "Bab 1: Fondasi Pemrograman Python",
        2: "Bab 2: Mengontrol Alur Program", 
        3: "Bab 3: Bekerja dengan Kumpulan Data",
        4: "Bab 4: Struktur Data Lanjutan",
        5: "Bab 5: Membuat Kode Modular dengan Fungsi"
    };
    
    document.getElementById('current-chapter-title').textContent = chapterTitles[chapterNum];
    generateProblems(chapterNum);
}

function backToChapterSelection() {
    document.getElementById('chapter-selection').style.display = 'block';
    document.getElementById('problems-container').style.display = 'none';
}

const problemsData = {
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

function generateProblems(chapterNum) {
    const container = document.getElementById('dynamic-problems');
    container.innerHTML = '';
    
    const problems = problemsData[chapterNum];
    
    problems.forEach((problem, index) => {
        const problemId = `${chapterNum}-${index + 1}`;
        const problemElement = createProblemElement(problem, problemId, chapterNum);
        container.appendChild(problemElement);
    });
}

function createProblemElement(problem, problemId, chapterNum) {
    const problemDiv = document.createElement('div');
    problemDiv.className = 'problem-item';
    
    problemDiv.innerHTML = `
        <div class="problem-header">
            <h3 class="problem-title">${problem.title}</h3>
            <div class="problem-description">
                ${problem.description}
            </div>
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

function playVideo(chapterNumber) {
    const videoLinks = {
        1: "https://www.youtube.com/watch?v=gxmTFXfrMzk",
        2: "https://www.youtube.com/watch?v=Hqndpzj0ZFg",
        3: "https://www.youtube.com/watch?v=MPvC9uWATLI",
        4: "https://www.youtube.com/watch?v=6VDCFBKyn7Y",
        5: "https://www.youtube.com/watch?v=wQwf5eKpxqs"
    };

    if (videoLinks[chapterNumber]) {
        window.open(videoLinks[chapterNumber], "_blank"); 
    } else {
        alert("Video belum tersedia untuk bab ini.");
    }
}

function runCode(problemId) {
    const editor = document.getElementById(`editor-${problemId}`);
    const output = document.getElementById(`output-${problemId}`);
    const scoreDisplay = document.getElementById(`score-${problemId}`);
    
    const code = editor.value.trim();
    
    if (!code) {
        showMessage(output, 'error', 'Kode kosong! Silakan tulis kode Python Anda.');
        return;
    }
    
    const runButton = event.target.closest('.run-button');
    runButton.disabled = true;
    runButton.innerHTML = '<span>⏳</span><span>Menjalankan...</span>';
    
    setTimeout(() => {
        const result = simulatePythonExecution(code, problemId);
        output.innerHTML = result.output;
        
        const score = calculateScore(code, problemId);
        scoreDisplay.textContent = `Skor: ${score}/100`;
        
        if (score >= 70) {
            scoreDisplay.style.background = 'var(--gradient-accent)';
        } else if (score >= 40) {
            scoreDisplay.style.background = 'var(--text-muted)';
        } else {
            scoreDisplay.style.background = '#ef4444';
        }
        
        runButton.disabled = false;
        runButton.innerHTML = '<span>▶</span><span>Jalankan Kode</span>';
        
        if (score >= 70) {
            showMessage(output, 'success', 'Excellent! Kode Anda berjalan dengan baik!');
        }
    }, 1500);
}

function simulatePythonExecution(code, problemId) {
    let output = '';
    const [chapter, problem] = problemId.split('-').map(Number);
    
    try {
        switch(chapter) {
            case 1:
                output = simulateChapter1(code, problem);
                break;
            case 2:
                output = simulateChapter2(code, problem);
                break;
            case 3:
                output = simulateChapter3(code, problem);
                break;
            case 4:
                output = simulateChapter4(code, problem);
                break;
            case 5:
                output = simulateChapter5(code, problem);
                break;
        }
        
        if (!output) {
            output = 'Kode belum lengkap atau tidak sesuai dengan soal. Periksa kembali implementasi Anda.';
        }
    } catch (error) {
        output = `Error dalam kode:\n${error.message}`;
    }
    return { output };
}

function simulateChapter1(code, problem) {
    switch(problem) {
        case 1:
            if (code.includes('kangkung') && code.includes('input') && code.includes('print')) {
                return `Simulasi Soal 1.1:\nKeranjang kangkung: 2\nKeranjang wortel: 3\nKeranjang kol: 1\nHarga per keranjang (Rp): 50000\nBiaya transportasi (Rp): 20000\n\nPendapatan bersih: Rp 280,000.00`;
            }
            break;
        case 2:
            if (code.includes('9/5') && code.includes('273.15') && code.includes('input')) {
                return `Simulasi Soal 1.2:\nSuhu (°C): 25\n25.0 °C = 77.00 °F = 298.15 K`;
            }
            break;
        case 3:
            if (code.includes('0.11') && code.includes('subtotal') && code.includes('ppn')) {
                return `Simulasi Soal 1.3:\nNama barang 1: Buku\nHarga barang 1: Rp 50000\nJumlah barang 1: 2\nNama barang 2: Pensil\nHarga barang 2: Rp 5000\nJumlah barang 2: 5\n\nSubtotal: Rp 125,000.00\nPPN 11%: Rp 13,750.00\nTotal bayar: Rp 138,750.00`;
            }
            break;
        case 4:
            if (code.includes('if') && code.includes('tahun_target') && code.includes('tahun_lahir')) {
                return `Simulasi Soal 1.4:\nTahun lahir: 2000\nTahun target: 2025\nUmur pada tahun 2025: 25 tahun\n\nSimulasi error:\nTahun lahir: 2010\nTahun target: 2005\nTahun target harus >= tahun lahir.`;
            }
            break;
        case 5:
            if (code.includes('rata') && code.includes('60') && code.includes('/3')) {
                return `Simulasi Soal 1.5:\nNilai 1: 80\nNilai 2: 70\nNilai 3: 85\nRata-rata: 78.33 -> Lulus\n\nSimulasi kedua:\nNilai 1: 45\nNilai 2: 50\nNilai 3: 55\nRata-rata: 50.00 -> Tidak Lulus`;
            }
            break;
    }
    return '';
}

function simulateChapter2(code, problem) {
    switch(problem) {
        case 1:
            if (code.includes('while') && code.includes('elif') && code.includes('indeks')) {
                return `Simulasi Soal 2.1:\nMasukkan nilai (0-100): 150\nNilai tidak valid. Coba lagi.\nMasukkan nilai (0-100): 87\nIndeks: A`;
            }
            break;
        case 2:
            if (code.includes('range') && code.includes('i % 5') && code.includes('Istirahat')) {
                return `Simulasi Soal 2.2:\nBerapa tiket? 7\nNomor Antrian: 1\nNomor Antrian: 2\nNomor Antrian: 3\nNomor Antrian: 4\nNomor Antrian: 5\n----- Istirahat Operator -----\nNomor Antrian: 6\nNomor Antrian: 7`;
            }
            break;
        case 3:
            if (code.includes('random') && code.includes('kesempatan') && code.includes('tebakan')) {
                return `Simulasi Soal 2.3:\nAngka rahasia: 42\nTebakan ke-1: 50\nTerlalu besar.\nTebakan ke-2: 40\nTerlalu kecil.\nTebakan ke-3: 42\nBenar! Tebakan ke-3`;
            }
            break;
        case 4:
            if (code.includes('split()') && code.includes('% 2') && code.includes('genap')) {
                return `Simulasi Soal 2.4:\nMasukkan angka dipisah spasi: 1 2 3 4 5 6 7 8\nAngka genap: [2, 4, 6, 8]\nTotal genap: 4`;
            }
            break;
        case 5:
            if (code.includes('while True') && code.includes('pilih') && code.includes('break')) {
                return `Simulasi Soal 2.5:\n1.+ 2.- 3.* 4./ 5.Keluar\nPilih: 1\nAngka 1: 10\nAngka 2: 5\n15.0\n1.+ 2.- 3.* 4./ 5.Keluar\nPilih: 5\nTerima kasih.`;
            }
            break;
    }
    return '';
}

function simulateChapter3(code, problem) {
    switch(problem) {
        case 1:
            if (code.includes('len(pesan)') && code.includes('indeks')) {
                return `Simulasi Soal 3.1:\nPesan: HELLO\nIndeks k (0-based): 1\nKarakter: 'E'\n\nSimulasi error:\nPesan: HELLO\nIndeks k (0-based): 10\nIndeks tidak valid.`;
            }
            break;
        case 2:
            if (code.includes('[::-1]') && code.includes('lower()') && code.includes('YA')) {
                return `Simulasi Soal 3.2:\nKata: KATAK\nYA\n\nSimulasi kedua:\nKata: PYTHON\nTIDAK`;
            }
            break;
        case 3:
            if (code.includes('split(",")') && code.includes('split(":")') && code.includes('items')) {
                return `Simulasi Soal 3.3:\nMasukkan item (nama:harga, ...): susu:15000,roti:8000,telur:25000\nDaftar: [('susu', 15000.0), ('roti', 8000.0), ('telur', 25000.0)]\nTotal: Rp 48,000.00`;
            }
            break;
        case 4:
            if (code.includes('set') && code.includes('unik') && code.includes('split()')) {
                return `Simulasi Soal 3.4:\nKalimat: Python adalah bahasa pemrograman yang mudah dipelajari dan Python sangat populer\nJumlah kata unik: 8\nKata unik: ['adalah', 'bahasa', 'dan', 'dipelajari', 'mudah', 'pemrograman', 'populer', 'python', 'sangat', 'yang']`;
            }
            break;
        case 5:
            if (code.includes('copy()') && code.includes('sort') && code.includes('reverse=True')) {
                return `Simulasi Soal 3.5:\nNilai (spasi): 78 92 65 88 79 95 73\nTop 3: [95, 92, 88]`;
            }
            break;
    }
    return '';
}

function simulateChapter4(code, problem) {
    switch(problem) {
        case 1:
            if (code.includes('[[0') && code.includes('range(c)') && code.includes('range(r)')) {
                return `Simulasi Soal 4.1:\nBaris R: 3\nKolom C: 4\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n[0, 0, 0, 0]`;
            }
            break;
        case 2:
            if (code.includes("[['-'") && code.includes('join') && code.includes('papan[i][j]')) {
                return `Simulasi Soal 4.2:\nPapan awal:\n- - -\n- - -\n- - -\nBaris (0-2): 1\nKolom (0-2): 1\nPapan setelah move:\n- - -\n- X -\n- - -`;
            }
            break;
        case 3:
            if (code.includes('sum(row)') && code.includes('enumerate')) {
                return `Simulasi Soal 4.3:\nR C: 3 4\n10 20 30 40\n15 25 35 45\n5 10 15 20\nTotal tim 1: 100\nTotal tim 2: 120\nTotal tim 3: 50`;
            }
            break;
        case 4:
            if (code.includes('(i + j) % 2') && code.includes('"# "') && code.includes('range(n)')) {
                return `Simulasi Soal 4.4:\nN: 4\n# # \n # #\n# # \n # #`;
            }
            break;
        case 5:
            if (code.includes('mat[i][j] == x') && code.includes('found') && code.includes('break')) {
                return `Simulasi Soal 4.5:\nR C: 3 3\n1 2 3\n4 5 6\n7 8 9\nCari angka X: 5\nDitemukan di: 1, 1\n\nSimulasi tidak ditemukan:\nCari angka X: 15\nTidak ditemukan`;
            }
            break;
    }
    return '';
}

function simulateChapter5(code, problem) {
    switch(problem) {
        case 1:
            if (code.includes('def hitung_total') && code.includes('0.11') && code.includes('500000')) {
                return `Simulasi Soal 5.1:\nSubtotal: Rp 600000\nTotal bayar: Rp 632,700.00\n(Dengan diskon 5% karena >= 500000)\n\nSimulasi tanpa diskon:\nSubtotal: Rp 200000\nTotal bayar: Rp 222,000.00`;
            }
            break;
        case 2:
            if (code.includes('def cek_umur') && code.includes('minimal=15') && code.includes('return')) {
                return `Simulasi Soal 5.2:\nUmur: 17\nMemenuhi syarat.\n\nSimulasi kedua:\nUmur: 12\nBelum memenuhi syarat.`;
            }
            break;
        case 3:
            if (code.includes('def kalkulator') && code.includes('Error') && code.includes('return')) {
                return `Simulasi Soal 5.3:\nA: 10\nB: 3\nOperasi (+-*/): +\n13.0\n\nSimulasi pembagian nol:\nA: 10\nB: 0\nOperasi (+-*/): /\nError: pembagian 0`;
            }
            break;
        case 4:
            if (code.includes('def cetak_papan') && code.includes('def ganti_giliran') && code.includes("'|'")) {
                return `Simulasi Soal 5.4:\nPapan awal:\n- | - | -\n- | - | -\n- | - | -\nBaris: 0\nKolom: 0\nPapan setelah move:\nX | - | -\n- | - | -\n- | - | -\nGiliran selanjutnya: O`;
            }
            break;
        case 5:
            if (code.includes('def rata2') && code.includes('if not nums') && code.includes('return None')) {
                return `Simulasi Soal 5.5:\nMasukkan angka (spasi): 10 20 30 40 50\nRata-rata: 30.00\n\nSimulasi data kosong:\nMasukkan angka (spasi): \nTidak ada data.`;
            }
            break;
    }
    return '';
}

function calculateScore(code, problemId) {
    let score = 0;
    const [chapter, problem] = problemId.split('-').map(Number);
    const requirements = getRequirements(chapter, problem);
    
    requirements.forEach(req => {
        if (code.includes(req.keyword)) {
            score += req.points;
        }
    });
    
    if (code.includes('#')) score += 10;
    if (code.includes('print(f')) score += 5;
    
    return Math.min(score, 100);
}

function getRequirements(chapter, problem) {
    const requirements = {
        1: {
            1: [
                { keyword: 'kangkung', points: 15 },
                { keyword: 'input', points: 25 },
                { keyword: 'int(', points: 15 },
                { keyword: 'float(', points: 15 },
                { keyword: 'print', points: 20 },
                { keyword: '*', points: 10 }
            ],
            2: [
                { keyword: '9/5', points: 25 },
                { keyword: '273.15', points: 25 },
                { keyword: 'float(', points: 20 },
                { keyword: 'input', points: 20 },
                { keyword: 'print', points: 10 }
            ],
            3: [
                { keyword: '0.11', points: 25 },
                { keyword: 'subtotal', points: 20 },
                { keyword: 'ppn', points: 20 },
                { keyword: 'input', points: 15 },
                { keyword: 'print', points: 10 },
                { keyword: '*', points: 10 }
            ],
            4: [
                { keyword: 'if', points: 25 },
                { keyword: 'tahun_target', points: 20 },
                { keyword: 'tahun_lahir', points: 20 },
                { keyword: '<', points: 15 },
                { keyword: 'else', points: 10 },
                { keyword: 'print', points: 10 }
            ],
            5: [
                { keyword: '/3', points: 25 },
                { keyword: 'rata', points: 20 },
                { keyword: '>=', points: 20 },
                { keyword: '60', points: 15 },
                { keyword: 'if', points: 10 },
                { keyword: 'print', points: 10 }
            ]
        },
        2: {
            1: [
                { keyword: 'while', points: 25 },
                { keyword: 'elif', points: 25 },
                { keyword: 'indeks', points: 20 },
                { keyword: '>=', points: 15 },
                { keyword: 'break', points: 10 },
                { keyword: 'print', points: 5 }
            ],
            2: [
                { keyword: 'range', points: 25 },
                { keyword: '% 5', points: 25 },
                { keyword: 'Istirahat', points: 20 },
                { keyword: 'for', points: 15 },
                { keyword: 'if', points: 10 },
                { keyword: 'print', points: 5 }
            ],
            3: [
                { keyword: 'random', points: 25 },
                { keyword: 'kesempatan', points: 20 },
                { keyword: 'tebakan', points: 20 },
                { keyword: 'elif', points: 15 },
                { keyword: 'break', points: 10 },
                { keyword: 'for', points: 10 }
            ],
            4: [
                { keyword: 'split()', points: 25 },
                { keyword: '% 2', points: 25 },
                { keyword: 'genap', points: 20 },
                { keyword: '[x for x', points: 15 },
                { keyword: 'len', points: 10 },
                { keyword: 'print', points: 5 }
            ],
            5: [
                { keyword: 'while True', points: 25 },
                { keyword: 'pilih', points: 20 },
                { keyword: 'break', points: 20 },
                { keyword: 'elif', points: 15 },
                { keyword: 'float', points: 10 },
                { keyword: 'print', points: 10 }
            ]
        },
        3: {
            1: [
                { keyword: 'len(pesan)', points: 30 },
                { keyword: 'indeks', points: 25 },
                { keyword: 'if', points: 20 },
                { keyword: '<=', points: 15 },
                { keyword: 'else', points: 10 }
            ],
            2: [
                { keyword: '[::-1]', points: 30 },
                { keyword: 'lower()', points: 25 },
                { keyword: 'YA', points: 20 },
                { keyword: 'if', points: 15 },
                { keyword: 'else', points: 10 }
            ],
            3: [
                { keyword: 'split(",")', points: 25 },
                { keyword: 'split(":")', points: 25 },
                { keyword: 'items', points: 20 },
                { keyword: 'append', points: 15 },
                { keyword: 'total', points: 10 },
                { keyword: 'strip', points: 5 }
            ],
            4: [
                { keyword: 'set', points: 30 },
                { keyword: 'unik', points: 25 },
                { keyword: 'split()', points: 20 },
                { keyword: 'lower()', points: 15 },
                { keyword: 'len', points: 10 }
            ],
            5: [
                { keyword: 'copy()', points: 25 },
                { keyword: 'sort', points: 25 },
                { keyword: 'reverse=True', points: 25 },
                { keyword: '[:3]', points: 15 },
                { keyword: 'split()', points: 10 }
            ]
        },
        4: {
            1: [
                { keyword: '[[0', points: 30 },
                { keyword: 'range(c)', points: 25 },
                { keyword: 'range(r)', points: 20 },
                { keyword: 'for _', points: 15 },
                { keyword: 'print', points: 10 }
            ],
            2: [
                { keyword: "[['-'", points: 25 },
                { keyword: 'join', points: 25 },
                { keyword: 'papan[i][j]', points: 25 },
                { keyword: 'int(input', points: 15 },
                { keyword: 'if', points: 10 }
            ],
            3: [
                { keyword: 'sum(row)', points: 30 },
                { keyword: 'enumerate', points: 25 },
                { keyword: 'map(int', points: 20 },
                { keyword: 'append', points: 15 },
                { keyword: 'Total tim', points: 10 }
            ],
            4: [
                { keyword: '(i + j) % 2', points: 30 },
                { keyword: '"# "', points: 25 },
                { keyword: 'range(n)', points: 20 },
                { keyword: 'for i', points: 15 },
                { keyword: 'for j', points: 10 }
            ],
            5: [
                { keyword: 'mat[i][j] == x', points: 30 },
                { keyword: 'found', points: 25 },
                { keyword: 'break', points: 20 },
                { keyword: 'for i in range', points: 15 },
                { keyword: 'for j in range', points: 10 }
            ]
        },
        5: {
            1: [
                { keyword: 'def hitung_total', points: 30 },
                { keyword: '0.11', points: 20 },
                { keyword: '500000', points: 20 },
                { keyword: 'return', points: 20 },
                { keyword: 'if', points: 10 }
            ],
            2: [
                { keyword: 'def cek_umur', points: 30 },
                { keyword: 'minimal=15', points: 25 },
                { keyword: 'return', points: 25 },
                { keyword: '>=', points: 15 },
                { keyword: 'if', points: 5 }
            ],
            3: [
                { keyword: 'def kalkulator', points: 30 },
                { keyword: 'Error', points: 25 },
                { keyword: 'return', points: 20 },
                { keyword: 'if', points: 15 },
                { keyword: 'elif', points: 10 }
            ],
            4: [
                { keyword: 'def cetak_papan', points: 25 },
                { keyword: 'def ganti_giliran', points: 25 },
                { keyword: "|", points: 20 },
                { keyword: 'return', points: 15 },
                { keyword: 'for row', points: 15 }
            ],
            5: [
                { keyword: 'def rata2', points: 30 },
                { keyword: 'if not nums', points: 25 },
                { keyword: 'return None', points: 25 },
                { keyword: 'sum', points: 15 },
                { keyword: 'len', points: 5 }
            ]
        }
    };
    
    return requirements[chapter]?.[problem] || [];
}

function resetCode(problemId) {
    const editor = document.getElementById(`editor-${problemId}`);
    const output = document.getElementById(`output-${problemId}`);
    const scoreDisplay = document.getElementById(`score-${problemId}`);
    
    editor.value = '';
    output.textContent = 'Tekan tombol "Jalankan Kode" untuk melihat hasil...';
    scoreDisplay.textContent = 'Skor: 0/100';
    scoreDisplay.style.background = 'var(--gradient-accent)';
}

function showMessage(container, type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    container.insertBefore(messageDiv, container.firstChild);
    setTimeout(() => {
        if (messageDiv.parentNode) messageDiv.parentNode.removeChild(messageDiv);
    }, 5000);
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        const activeEditor = document.activeElement;
        if (activeEditor && activeEditor.classList.contains('code-editor')) {
            const problemId = activeEditor.id.split('-').slice(1).join('-');
            runCode(problemId);
        }
        e.preventDefault();
    }
});


let draggedElement = null;

const dragDropProblems = [
    {
        title: "Menyusun Fungsi Hitung Rata-rata",
        blocks: [
            { id: '1', code: 'def hitung_rata(nilai):' },
            { id: '2', code: '    total = sum(nilai)' },
            { id: '3', code: '    return total / len(nilai)' },
            { id: '4', code: 'nilai_siswa = [80, 90, 75, 85]' },
            { id: '5', code: 'print(f"Rata-rata: {hitung_rata(nilai_siswa)}")' }
        ],
        correctOrder: ['4', '1', '2', '3', '5'],
        hint: "deklarasi variabel → definisi fungsi → pemanggilan fungsi"
    },
    {
        title: "Menyusun Loop dengan Kondisi",
        blocks: [
            { id: '1', code: 'for i in range(5):' },
            { id: '2', code: '    if i % 2 == 0:' },
            { id: '3', code: '        print("Genap")' },
            { id: '4', code: '    print(f"Angka: {i}")' }
        ],
        correctOrder: ['1', '2', '3', '4'],
        hint: "loop → kondisi → aksi kondisi → aksi loop"
    },
    {
        title: "Menyusun Program Input Output",
        blocks: [
            { id: '1', code: 'nama = input("Nama: ")' },
            { id: '2', code: 'umur = int(input("Umur: "))' },
            { id: '3', code: 'print(f"Halo {nama}!")' },
            { id: '4', code: 'print(f"Umur: {umur} tahun")' }
        ],
        correctOrder: ['1', '2', '3', '4'],
        hint: "input string → input dengan casting → output data"
    },
    {
        title: "Menyusun Fungsi Faktorial",
        blocks: [
            { id: '1', code: 'def faktorial(n):' },
            { id: '2', code: '    if n <= 1:' },
            { id: '3', code: '        return 1' },
            { id: '4', code: '    return n * faktorial(n-1)' },
            { id: '5', code: 'print(faktorial(5))' }
        ],
        correctOrder: ['1', '2', '3', '4', '5'],
        hint: "definisi fungsi → base case → recursive case → pemanggilan"
    },
    {
        title: "Menyusun Program List",
        blocks: [
            { id: '1', code: 'angka = [3, 1, 4, 1, 5]' },
            { id: '2', code: 'angka.sort()' },
            { id: '3', code: 'angka.append(9)' },
            { id: '4', code: 'print(angka)' }
        ],
        correctOrder: ['1', '2', '3', '4'],
        hint: "deklarasi list → sort → modifikasi → output"
    }
];

let currentProblemIndex = 0;

function initDragAndDrop() {
    const draggables = document.querySelectorAll('.code-block');
    const dropZones = document.querySelectorAll('.drag-zone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('dragenter', handleDragEnter);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.drag-zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    this.classList.remove('drag-over');

    if (draggedElement !== this) {
        const emptyMsg = this.querySelector('.empty-message');
        if (emptyMsg) {
            emptyMsg.remove();
        }

        const clone = draggedElement.cloneNode(true);
        clone.addEventListener('dragstart', handleDragStart);
        clone.addEventListener('dragend', handleDragEnd);
        this.appendChild(clone);
        
        if (draggedElement.parentElement.id === 'solution-area') {
            draggedElement.remove();
        }
    }

    return false;
}

function checkDragSolution() {
    const solutionArea = document.getElementById('solution-area');
    const blocks = solutionArea.querySelectorAll('.code-block');
    const feedback = document.getElementById('drag-feedback');
    
    if (blocks.length === 0) {
        feedback.textContent = 'Belum ada kode yang disusun! Drag blok kode ke area solusi.';
        feedback.className = 'feedback-area show incorrect';
        return;
    }

    const userOrder = Array.from(blocks).map(block => block.dataset.id);
    const problem = dragDropProblems[currentProblemIndex];
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(problem.correctOrder);
    
    if (isCorrect) {
        feedback.textContent = '🎉 Sempurna! Kode Anda sudah benar!';
        feedback.className = 'feedback-area show correct';
        
        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.animation = 'pulse 0.5s ease';
            }, index * 100);
        });
    } else {
        feedback.textContent = `❌ Belum tepat. Hint: ${problem.hint}`;
        feedback.className = 'feedback-area show incorrect';
    }
}

function resetDragExercise() {
    currentProblemIndex = Math.floor(Math.random() * dragDropProblems.length);
    const problem = dragDropProblems[currentProblemIndex];
    
    document.querySelector('#drag-drop .page-title').textContent = `Latihan Drag & Drop - ${problem.title}`;
    
    const solutionArea = document.getElementById('solution-area');
    const codeBlocksArea = document.getElementById('code-blocks');
    const feedback = document.getElementById('drag-feedback');
    
    const blocksInSolution = solutionArea.querySelectorAll('.code-block');
    blocksInSolution.forEach(block => block.remove());
    solutionArea.innerHTML = '<h3>Area Solusi (Drag di sini)</h3><p class="empty-message">Drag blok kode ke sini untuk menyusun program</p>';
    
    feedback.className = 'feedback-area';
    feedback.textContent = '';
    
    codeBlocksArea.innerHTML = '<h3>Blok Kode Tersedia</h3>';
    const shuffledBlocks = [...problem.blocks].sort(() => Math.random() - 0.5);
    
    shuffledBlocks.forEach(item => {
        const block = document.createElement('div');
        block.className = 'code-block';
        block.draggable = true;
        block.dataset.id = item.id;
        block.innerHTML = `<code>${item.code}</code>`;
        
        block.addEventListener('dragstart', handleDragStart);
        block.addEventListener('dragend', handleDragEnd);
        
        block.addEventListener('touchstart', handleTouchStart, { passive: false });
        block.addEventListener('touchmove', handleTouchMove, { passive: false });
        block.addEventListener('touchend', handleTouchEnd, { passive: false });
        codeBlocksArea.appendChild(block);
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const editors = document.querySelectorAll('.code-editor');
    editors.forEach(editor => {
        editor.addEventListener('input', function() {
            this.style.color = 'var(--text-primary)';
        });
    });

    document.documentElement.style.scrollBehavior = 'smooth';
    
    if (document.querySelector('.code-block')) {
        resetDragExercise();
        initDragAndDrop();
    }
});

function handleTouchStart(e) {
    e.preventDefault();
    draggedElement = this;
    this.classList.add('dragging');
    
    this.style.opacity = '0.5';
}

function handleTouchMove(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const touch = e.touches[0];
    const afterElement = getDragAfterElement(document.getElementById('solution-area'), touch.clientY);
    const dropZone = document.getElementById('solution-area');
    
    const rect = dropZone.getBoundingClientRect();
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        dropZone.classList.add('drag-over');
    } else {
        dropZone.classList.remove('drag-over');
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    const touch = e.changedTouches[0];
    const dropZone = document.getElementById('solution-area');
    const rect = dropZone.getBoundingClientRect();
    
    draggedElement.style.opacity = '';
    draggedElement.classList.remove('dragging');
    dropZone.classList.remove('drag-over');
    
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        
        const emptyMsg = dropZone.querySelector('.empty-message');
        if (emptyMsg) emptyMsg.remove();
        
        const clone = draggedElement.cloneNode(true);
        clone.addEventListener('touchstart', handleTouchStart, { passive: false });
        clone.addEventListener('touchmove', handleTouchMove, { passive: false });
        clone.addEventListener('touchend', handleTouchEnd, { passive: false });
        clone.addEventListener('dragstart', handleDragStart);
        clone.addEventListener('dragend', handleDragEnd);
        
        dropZone.appendChild(clone);
        
        if (draggedElement.parentElement.id === 'solution-area') {
            draggedElement.remove();
        }
    }
    
    draggedElement = null;
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.code-block:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const canvas = document.getElementById('sortCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let array = [];
let comparisons = 0;
let swaps = 0;
let isSorting = false;

function generateRandomArray() {
    if (isSorting) return;
    
    array = [];
    const arraySize = 40;
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 350) + 20);
    }
    
    comparisons = 0;
    swaps = 0;
    updateStats();
    drawArray();
    document.getElementById('sortStatus').textContent = 'Siap';
}

function drawArray(colorArray = []) {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = canvas.width / array.length;
    
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = colorArray[i] || '#3b82f6';
        ctx.fillRect(i * barWidth, canvas.height - array[i], barWidth - 2, array[i]);
        
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Arial';
        ctx.fillText(array[i], i * barWidth + 2, canvas.height - array[i] - 5);
    }
}

function updateStats() {
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!isSorting) return;
            
            comparisons++;
            updateStats();
            
            const colorArray = array.map((_, idx) => {
                if (idx === j || idx === j + 1) return '#ef4444';
                if (idx >= n - i) return '#22c55e';
                return '#3b82f6';
            });
            drawArray(colorArray);
            await sleep(50);
            
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
                updateStats();
            }
        }
    }
    
    drawArray(array.map(() => '#22c55e'));
}

async function selectionSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        if (!isSorting) return;
        
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (!isSorting) return;
            
            comparisons++;
            updateStats();
            
            const colorArray = array.map((_, idx) => {
                if (idx === minIdx) return '#f59e0b';
                if (idx === j) return '#ef4444';
                if (idx < i) return '#22c55e';
                return '#3b82f6';
            });
            drawArray(colorArray);
            await sleep(50);
            
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            swaps++;
            updateStats();
        }
    }
    
    drawArray(array.map(() => '#22c55e'));
}

async function insertionSort() {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        if (!isSorting) return;
        
        let key = array[i];
        let j = i - 1;
        
        while (j >= 0 && array[j] > key) {
            if (!isSorting) return;
            
            comparisons++;
            updateStats();
            
            const colorArray = array.map((_, idx) => {
                if (idx === j || idx === j + 1) return '#ef4444';
                if (idx < i) return '#22c55e';
                return '#3b82f6';
            });
            drawArray(colorArray);
            await sleep(50);
            
            array[j + 1] = array[j];
            j--;
            swaps++;
            updateStats();
        }
        
        array[j + 1] = key;
    }
    
    drawArray(array.map(() => '#22c55e'));
}

async function startSorting() {
    if (isSorting) return;
    if (array.length === 0) {
        generateRandomArray();
    }
    
    isSorting = true;
    const algorithm = document.getElementById('sortAlgorithm').value;
    document.getElementById('sortStatus').textContent = 'Sorting...';
    
    const explanations = {
        bubble: '<p><strong>Bubble Sort:</strong> Membandingkan elemen bersebelahan dan menukarnya jika urutannya salah. Proses ini diulang hingga tidak ada lagi pertukaran. Kompleksitas: O(n²)</p>',
        selection: '<p><strong>Selection Sort:</strong> Mencari elemen terkecil dari array yang belum terurut, lalu menukarnya dengan elemen pertama yang belum terurut. Kompleksitas: O(n²)</p>',
        insertion: '<p><strong>Insertion Sort:</strong> Membangun array terurut satu elemen pada satu waktu dengan memasukkan elemen ke posisi yang tepat. Kompleksitas: O(n²)</p>'
    };
    document.getElementById('algoExplanation').innerHTML = explanations[algorithm];
    
    if (algorithm === 'bubble') {
        await bubbleSort();
    } else if (algorithm === 'selection') {
        await selectionSort();
    } else if (algorithm === 'insertion') {
        await insertionSort();
    }
    
    isSorting = false;
    document.getElementById('sortStatus').textContent = 'Selesai!';
}

function resetCanvas() {
    isSorting = false;
    generateRandomArray();
}

document.addEventListener('DOMContentLoaded', function() {
    if (canvas) {
        generateRandomArray();
    }
});