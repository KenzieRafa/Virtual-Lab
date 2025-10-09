# Virtual Lab - Berpikir Komputasional TPB ITB
Link Deployment Wesbite VIRTUAL LAB: https://virtual-lab-five.vercel.app/

## Author / Tim Proyek

| Nama       | NIM           |
|------------|----------------------|
| Kenzie Raffa Ardhana   | 18223127 |

---

## Deskripsi Proyek

**Virtual Lab** adalah platform pembelajaran **interaktif berbasis web** yang dibuat khusus untuk mendukung mahasiswa TPB ITB dalam memahami dasar-dasar pemrograman Python.  
Platform ini memungkinkan pengguna untuk:

- Membaca materi yang disusun per bab  
- Menjalankan simulasi kode Python langsung di browser (editor interaktif)  
- Menyelesaikan latihan soal otomatis dengan feedback langsung  
- Menonton video pendukung untuk setiap bab  
- Menggunakan aktivitas tambahan seperti drag-and-drop & visualisasi untuk memperkuat konsep  

Tujuan utama: membuat proses belajar pemrograman menjadi lebih intuitif, engaging, dan mudah diakses.


---

## Prasyarat Sistem

Sebelum menjalankan proyek ini, pastikan:

- Browser modern (Chrome, Firefox, Edge)  
- Editor kode seperti VS Code (opsional, untuk modifikasi)  
- Git (untuk clone dan version control)  
- (Opsional) Akun GitHub  
- (Opsional) Akun Vercel, jika kamu ingin deploy secara online  

---

## Cara Menjalankan Secara Lokal

1. Clone repository ini:
   ```bash
   git clone https://github.com/KenzieRafa/Virtual-Lab.git
   cd Virtual-Lab
   ```

2. Buka `index.html` menggunakan browser — tidak perlu server khusus.

3. (Opsional) Edit materi, CSS, atau logika dengan VS Code:
   - File `index.html` → struktur tampilan halaman  
   - File `styles.css` → styling & tema  
   - File `script.js` → logika interaktif, materi, soal  

---

## Cara Deploy (ke Vercel)

1. Login ke [Vercel](https://vercel.com).  
2. Pilih **New Project** → import repository `KenzieRafa/Virtual-Lab`.  
3. Deploy → akan menghasilkan URL seperti: `virtual-lab-five.vercel.app`.  
4. Setelah deploy berhasil, aplikasi bisa diakses secara publik di internet.

---

## Fitur Utama

- 📚 **Materi Terstruktur**: Beberapa bab dari dasar hingga fungsi modular  
- 🖥️ **Editor Kode Interaktif**: Menulis & mencoba kode Python dalam browser  
- 📝 **Latihan Soal Terintegrasi**: Skor & umpan balik otomatis  
- 🎥 **Video Pendukung per Bab**  
- 🎮 **Aktivitas Interaktif**: Drag-and-drop & visualisasi  
- 🌙 **UI Modern & Responsif**: tema gelap, mobile friendly, animasi halus  

---

## Catatan & Tips Pengembangan

- Editor di sini bertipe **simulasi**, bukan interpreter Python sesungguhnya  
- Jika ingin menambah soal atau materi baru: ubah objek `problemsData` di `script.js`  
- Untuk styling tambahan atau modifikasi tema, edit `styles.css`  
- Gunakan browser desktop untuk pengalaman optimal  
- Backup perubahan sebelum deploy ulang agar tidak kehilangan data  

---

## Referensi

- Materi kuliah *Berpikir Komputasional* TPB ITB  
- Python Documentation — https://docs.python.org/3  
- MDN Web Docs — https://developer.mozilla.org  
- Vercel Documentation — https://vercel.com/docs  

---

Terima kasih telah menggunakan **Virtual Lab** 🎉  
Selamat belajar dan semoga proyek ini bermanfaat!  
