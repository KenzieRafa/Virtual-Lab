export function simulateChapter1(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('kangkung') && lowerCode.includes('wortel') && 
                lowerCode.includes('kol') && lowerCode.includes('harga') && 
                lowerCode.includes('input') && lowerCode.includes('print')) {
                return `✅ Simulasi Soal 1.1:\nKeranjang kangkung: 2\nKeranjang wortel: 3\nKeranjang kol: 1\nHarga per keranjang (Rp): 50000\nBiaya transportasi (Rp): 20000\n\nTotal keranjang: 6\nPendapatan kotor: Rp 300,000.00\nPendapatan bersih: Rp 280,000.00`;
            }
            break;
        case 2:
            if ((lowerCode.includes('9/5') || lowerCode.includes('9 / 5')) && 
                lowerCode.includes('273.15') && lowerCode.includes('input')) {
                return `✅ Simulasi Soal 1.2:\nSuhu (°C): 25\n25.0 °C = 77.00 °F = 298.15 K`;
            }
            break;
        case 3:
            if (lowerCode.includes('0.11') && lowerCode.includes('ppn') && 
                lowerCode.includes('subtotal') && lowerCode.includes('total')) {
                return `✅ Simulasi Soal 1.3:\nNama barang 1: Buku\nHarga barang 1: Rp 50000\nJumlah barang 1: 2\nNama barang 2: Pensil\nHarga barang 2: Rp 5000\nJumlah barang 2: 5\n\nSubtotal: Rp 125,000.00\nPPN 11%: Rp 13,750.00\nTotal bayar: Rp 138,750.00`;
            }
            break;
        case 4:
            if (lowerCode.includes('tahun_lahir') && lowerCode.includes('tahun_target') && 
                lowerCode.includes('if') && (lowerCode.includes('<') || lowerCode.includes('>'))) {
                return `✅ Simulasi Soal 1.4:\nTahun lahir: 2000\nTahun target: 2025\nUmur pada tahun 2025: 25 tahun\n\nSimulasi dengan error:\nTahun lahir: 2010\nTahun target: 2005\nError: Tahun target harus >= tahun lahir`;
            }
            break;
        case 5:
            if ((lowerCode.includes('/ 3') || lowerCode.includes('/3')) && 
                (lowerCode.includes('rata') || lowerCode.includes('average')) && 
                lowerCode.includes('60') && lowerCode.includes('if')) {
                return `✅ Simulasi Soal 1.5:\nNilai 1: 80\nNilai 2: 70\nNilai 3: 85\nRata-rata: 78.33\nLulus\n\nSimulasi kedua:\nNilai 1: 45\nNilai 2: 50\nNilai 3: 55\nRata-rata: 50.00\nTidak Lulus`;
            }
            break;
    }
    return '';
}

export function simulateChapter2(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('while') && lowerCode.includes('elif') && 
                lowerCode.includes('indeks') && lowerCode.includes('break')) {
                return `✅ Simulasi Soal 2.1:\nMasukkan nilai (0-100): 150\nNilai tidak valid. Coba lagi.\nMasukkan nilai (0-100): 87\nIndeks: A`;
            }
            break;
        case 2:
            if (lowerCode.includes('range') && lowerCode.includes('% 5') && 
                (lowerCode.includes('istirahat') || lowerCode.includes('garis') || lowerCode.includes('-----'))) {
                return `✅ Simulasi Soal 2.2:\nBerapa tiket? 7\nNomor Antrian: 1\nNomor Antrian: 2\nNomor Antrian: 3\nNomor Antrian: 4\nNomor Antrian: 5\n----- Istirahat Operator -----\nNomor Antrian: 6\nNomor Antrian: 7`;
            }
            break;
        case 3:
            if (lowerCode.includes('random') && lowerCode.includes('rahasia') && 
                (lowerCode.includes('tebakan') || lowerCode.includes('tebak')) && lowerCode.includes('kesempatan')) {
                return `✅ Simulasi Soal 2.3:\nAngka rahasia: 42\nTebakan ke-1: 50\nTerlalu besar.\nTebakan ke-2: 40\nTerlalu kecil.\nTebakan ke-3: 42\nBenar! Tebakan ke-3`;
            }
            break;
        case 4:
            if (lowerCode.includes('split()') && lowerCode.includes('% 2') && 
                lowerCode.includes('genap')) {
                return `✅ Simulasi Soal 2.4:\nMasukkan angka dipisah spasi: 1 2 3 4 5 6 7 8\nAngka genap: [2, 4, 6, 8]\nTotal genap: 4`;
            }
            break;
        case 5:
            if (lowerCode.includes('while true') && lowerCode.includes('break') && 
                (lowerCode.includes('elif') || lowerCode.includes('else'))) {
                return `✅ Simulasi Soal 2.5:\n1.+ 2.- 3.* 4./ 5.Keluar\nPilih: 1\nAngka 1: 10\nAngka 2: 5\n15.0\n1.+ 2.- 3.* 4./ 5.Keluar\nPilih: 5\nTerima kasih.`;
            }
            break;
    }
    return '';
}

export function simulateChapter3(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('len(') && lowerCode.includes('pesan') && 
                lowerCode.includes('if')) {
                return `✅ Simulasi Soal 3.1:\nPesan: HELLO\nIndeks k (0-based): 1\nKarakter: 'E'\n\nSimulasi dengan error:\nPesan: HELLO\nIndeks k (0-based): 10\nIndeks tidak valid.`;
            }
            break;
        case 2:
            if (lowerCode.includes('[::-1]') && lowerCode.includes('lower()') && 
                (lowerCode.includes('ya') || lowerCode.includes('tidak'))) {
                return `✅ Simulasi Soal 3.2:\nKata: KATAK\nYA\n\nSimulasi kedua:\nKata: PYTHON\nTIDAK`;
            }
            break;
        case 3:
            if (lowerCode.includes('split(\',\')') && lowerCode.includes('split(\':\')') && 
                lowerCode.includes('total')) {
                return `✅ Simulasi Soal 3.3:\nMasukkan item (nama:harga, ...): susu:15000,roti:8000,telur:25000\nDaftar: [('susu', 15000.0), ('roti', 8000.0), ('telur', 25000.0)]\nTotal: Rp 48,000.00`;
            }
            break;
        case 4:
            if (lowerCode.includes('set') && (lowerCode.includes('unik') || lowerCode.includes('unique')) && 
                lowerCode.includes('split()')) {
                return `✅ Simulasi Soal 3.4:\nKalimat: Python adalah bahasa pemrograman yang mudah dipelajari dan Python sangat populer\nJumlah kata unik: 8`;
            }
            break;
        case 5:
            if (lowerCode.includes('copy()') && lowerCode.includes('sort') && 
                (lowerCode.includes('reverse=true') || lowerCode.includes('[:3]'))) {
                return `✅ Simulasi Soal 3.5:\nNilai (spasi): 78 92 65 88 79 95 73\nTop 3: [95, 92, 88]`;
            }
            break;
    }
    return '';
}

export function simulateChapter4(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('[[0') && lowerCode.includes('range(c)') && 
                lowerCode.includes('range(r)')) {
                return `✅ Simulasi Soal 4.1:\nBaris R: 3\nKolom C: 4\n[0, 0, 0, 0]\n[0, 0, 0, 0]\n[0, 0, 0, 0]`;
            }
            break;
        case 2:
            if ((lowerCode.includes('[[\'-\'') || lowerCode.includes('[[\"-\"]')) && 
                lowerCode.includes('join') && lowerCode.includes('papan')) {
                return `✅ Simulasi Soal 4.2:\nPapan awal:\n- - -\n- - -\n- - -\nBaris (0-2): 1\nKolom (0-2): 1\nPapan setelah move:\n- - -\n- X -\n- - -`;
            }
            break;
        case 3:
            if (lowerCode.includes('sum(row)') && lowerCode.includes('enumerate')) {
                return `✅ Simulasi Soal 4.3:\nR C: 3 4\n10 20 30 40\n15 25 35 45\n5 10 15 20\nTotal tim 1: 100\nTotal tim 2: 120\nTotal tim 3: 50`;
            }
            break;
        case 4:
            if (lowerCode.includes('(i + j) % 2') && (lowerCode.includes('"# "') || lowerCode.includes('\'# \'')) && 
                lowerCode.includes('range(n)')) {
                return `✅ Simulasi Soal 4.4:\nN: 4\n# # \n # #\n# # \n # #`;
            }
            break;
        case 5:
            if (lowerCode.includes('mat[i][j]') && lowerCode.includes('found') && 
                lowerCode.includes('break')) {
                return `✅ Simulasi Soal 4.5:\nR C: 3 3\n1 2 3\n4 5 6\n7 8 9\nCari angka X: 5\nDitemukan di: 1, 1\n\nSimulasi tidak ditemukan:\nCari angka X: 15\nTidak ditemukan`;
            }
            break;
    }
    return '';
}

export function simulateChapter5(code, problem) {
    const lowerCode = code.toLowerCase();
    
    switch(problem) {
        case 1:
            if (lowerCode.includes('def hitung_total') && lowerCode.includes('0.11') && 
                lowerCode.includes('500000') && lowerCode.includes('return')) {
                return `✅ Simulasi Soal 5.1:\nSubtotal: Rp 600000\nTotal bayar: Rp 632,700.00\n(Dengan diskon 5% karena >= 500000)\n\nSimulasi tanpa diskon:\nSubtotal: Rp 200000\nTotal bayar: Rp 222,000.00`;
            }
            break;
        case 2:
            if (lowerCode.includes('def cek_umur') && lowerCode.includes('minimal=15') && 
                lowerCode.includes('return')) {
                return `✅ Simulasi Soal 5.2:\nUmur: 17\nMemenuhi syarat.\n\nSimulasi kedua:\nUmur: 12\nBelum memenuhi syarat.`;
            }
            break;
        case 3:
            if (lowerCode.includes('def kalkulator') && lowerCode.includes('error') && 
                lowerCode.includes('return') && lowerCode.includes('elif')) {
                return `✅ Simulasi Soal 5.3:\nA: 10\nB: 3\nOperasi (+-*/): +\n13.0\n\nSimulasi pembagian nol:\nA: 10\nB: 0\nOperasi (+-*/): /\nError: pembagian 0`;
            }
            break;
        case 4:
            if (lowerCode.includes('def cetak_papan') && lowerCode.includes('def ganti_giliran') && 
                (lowerCode.includes('\'|\'') || lowerCode.includes('\"|\"'))) {
                return `✅ Simulasi Soal 5.4:\nPapan awal:\n- | - | -\n- | - | -\n- | - | -\nBaris: 0\nKolom: 0\nPapan setelah move:\nX | - | -\n- | - | -\n- | - | -\nGiliran selanjutnya: O`;
            }
            break;
        case 5:
            if (lowerCode.includes('def rata2') && lowerCode.includes('if not nums') && 
                lowerCode.includes('return none')) {
                return `✅ Simulasi Soal 5.5:\nMasukkan angka (spasi): 10 20 30 40 50\nRata-rata: 30.00\n\nSimulasi data kosong:\nMasukkan angka (spasi): \nTidak ada data.`;
            }
            break;
    }
    return '';
}