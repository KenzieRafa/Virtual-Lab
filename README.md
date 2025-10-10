# 📚 Virtual Lab - Berpikir Komputasional TPB ITB

<div align="center">

![Virtual Lab Banner](https://img.shields.io/badge/Virtual%20Lab-v2.0-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-Learning-green?style=for-the-badge&logo=python)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**Platform pembelajaran interaktif pemrograman Python untuk mahasiswa TPB Institut Teknologi Bandung**

[🌐 Live Demo](http://virtual-lab-five.vercel.app) | [📖 Documentation](#dokumentasi) | [🐛 Report Bug](https://github.com/KenzieRafa/Virtual-Lab/issues)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Fitur Baru V2.0](#-fitur-baru-v20)
- [Teknologi](#-teknologi-yang-digunakan)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Struktur Database](#%EF%B8%8F-struktur-database)
- [Deployment](#-deployment)
- [Cara Penggunaan](#-cara-penggunaan)
- [Author](#-author)

---

## 🎯 Tentang Proyek

**Virtual Lab** adalah platform pembelajaran berbasis web yang dikembangkan untuk mendukung mata kuliah **Berpikir Komputasional** di TPB Institut Teknologi Bandung. Platform ini mengatasi tantangan pembelajaran pemrograman dengan menyediakan lingkungan belajar yang interaktif, mudah diakses, dan tidak memerlukan instalasi software tambahan.

### 🎓 Latar Belakang

Mata kuliah Berpikir Komputasional sering menjadi tantangan bagi mahasiswa baru karena:

- 📚 Konsep pemrograman yang abstrak dan teoritis
- 💻 Kebutuhan instalasi software yang kompleks (Python, IDE, dll)
- ⏱️ Kurangnya feedback instan saat belajar
- 📊 Kesulitan tracking progress pembelajaran

Virtual Lab hadir sebagai solusi dengan menyediakan:
- ✅ Akses langsung via browser tanpa instalasi
- ✅ Feedback real-time untuk setiap kode yang ditulis
- ✅ Sistem tracking progress otomatis
- ✅ Pembelajaran yang gamified dan interaktif

### 📚 Kurikulum

Platform mengikuti kurikulum resmi mata kuliah dengan 5 bab pembelajaran:

| Bab | Topik | Soal |
|-----|-------|------|
| 1️⃣ | **Fondasi Pemrograman Python** | 5 |
| 2️⃣ | **Mengontrol Alur Program** | 5 |
| 3️⃣ | **Bekerja dengan Kumpulan Data** | 5 |
| 4️⃣ | **Struktur Data Lanjutan** | 5 |
| 5️⃣ | **Membuat Kode Modular dengan Fungsi** | 5 |

**Total: 25 Soal Latihan + Aktivitas Interaktif**

---

## ✨ Fitur Utama

### 1️⃣ Materi Pembelajaran Terstruktur
- 📖 5 bab lengkap dengan penjelasan detail
- 🎥 Video pembelajaran terintegrasi (YouTube)
- 📝 Tujuan pembelajaran yang jelas setiap bab
- ✅ Tombol "Tandai Selesai" untuk tracking

### 2️⃣ Editor Kode Interaktif
- 💻 Code editor dengan syntax highlighting
- ▶️ Simulasi eksekusi Python di browser
- 📊 Console output real-time
- 🔄 Tombol Reset dan auto-save
- ⌨️ Keyboard shortcuts (Ctrl+Enter)

### 3️⃣ Sistem Latihan Soal
- 📝 25 soal berbasis kasus nyata
- 🎯 Penilaian otomatis (0-100)
- 🏆 Badge warna berdasarkan performa:
  - 🟢 **Excellent** (≥70): Hijau
  - 🟡 **Good** (40-69): Kuning
  - 🔴 **Need Improvement** (<40): Merah

### 4️⃣ Aktivitas Tambahan
- 🖱️ **Drag & Drop**: Susun blok kode dengan cara drag
- 📈 **Visualisasi Algoritma**: Lihat sorting algorithm secara visual
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
- 🎨 Canvas interaktif dengan animasi real-time

### 5️⃣ Mobile Responsive
- 📱 Hamburger menu untuk navigasi mobile
- 👆 Touch events untuk drag & drop
- 🎨 UI adaptif (Desktop, Tablet, Mobile)

---

## 🆕 Fitur Baru V2.0

### 🔐 1. Autentikasi Multi-Metode

**Implementasi server-side authentication dengan Supabase Auth**

#### a) Email & Password Authentication
```javascript
// Register
const { user, error } = await supabase.auth.signUp({
  email: 'student@itb.ac.id',
  password: 'secure_password',
  options: {
    data: { display_name: 'Kenzie R' }
  }
})

// Login
const { user, error } = await supabase.auth.signInWithPassword({
  email: 'student@itb.ac.id',
  password: 'secure_password'
})
```

#### b) Google OAuth Integration
```javascript
// Sign in with Google
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://virtual-lab-five.vercel.app'
  }
})
```

**Keunggulan:**
- 🔒 Secure session management dengan JWT
- 📧 Email verification otomatis
- 🔄 Auto-sync progress antar device
- 🛡️ Row Level Security (RLS) di database

### 💾 2. Penyimpanan State Pengguna

**Database: PostgreSQL (Supabase)**

#### a) Progress Pembelajaran
- ✅ Bab yang sudah diselesaikan
- ✅ Timestamp setiap pembelajaran
- ✅ Badge "Pembelajaran Selesai"

#### b) Hasil Simulasi & Nilai
```javascript
// Auto-save skor
{
  "bab1": { 
    "soal1": 100, 
    "soal2": 85, 
    "soal3": 90,
    "soal4": 100,
    "soal5": 75 
  },
  "bab2": { 
    "soal1": 70, 
    "soal2": 95 
  }
}
```

#### c) Statistik Aktivitas
- ✅ Jumlah percobaan drag & drop
- ✅ Tingkat akurasi jawaban
- ✅ Best score tracking per soal
- ✅ Total skor akumulatif per bab

### 🏆 3. Leaderboard Real-time

**Kompetisi sehat dengan mahasiswa lain!**

- 🥇 Badge khusus Top 3: Gold 🥇, Silver 🥈, Bronze 🥉
- 📊 Ranking berdasarkan total nilai (max 500 poin)
- 📈 Progress modul yang diselesaikan
- 🔄 Update real-time via Supabase Realtime
- 👥 Anonymous leaderboard (display name only)

**Formula Skor:**
```
Total Skor = Σ(Rata-rata per Bab)
Maximum = 100 + 100 + 100 + 100 + 100 = 500 poin
```

### 👤 4. Academic Progress Page

**Dashboard monitoring pembelajaran lengkap**

```
📚 Modul Selesai: 3 / 5 bab
📝 Total Nilai: 385 / 500 poin
🎯 Akurasi Drag & Drop: 85%

Bab 1 (5/5 soal) ━━━━━ 85 / 100
  ✓ Soal 1.1 ━━━━━ 100 ⭐ Perfect!
  ○ Soal 1.2 ━━━━━ 85
  ○ Soal 1.3 ━━━━━ 90
  ✓ Soal 1.4 ━━━━━ 100 ⭐ Perfect!
  ○ Soal 1.5 ━━━━━ 75
```

### 🎉 5. Welcome Modal

**Modal interaktif untuk first-time visitors**

- ✅ Prompt untuk sign in/sign up
- ✅ Opsi "Lanjutkan Tanpa Akun"
- ✅ Session tracking (hanya muncul sekali)
- ✅ Responsive untuk mobile

### 🔄 6. Auto-Save System

**Tidak perlu khawatir lupa save!**

```javascript
// Auto-save hanya jika skor lebih tinggi
if (newScore > currentBestScore) {
  await saveToDatabase(userId, problemId, newScore);
  showNotification('✅ Progress tersimpan!');
}
```

---

## 🛠️ Teknologi yang Digunakan

### Frontend

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| HTML5 | - | Struktur halaman semantic |
| CSS3 | - | Modern styling dengan CSS Variables |
| JavaScript | ES6+ | Vanilla JS untuk logika interaktif |
| Canvas API | - | Visualisasi algoritma sorting |

**Why Vanilla JS?**
- ⚡ Lightweight & fast loading
- 📦 No build tools required
- 🎯 Learning-friendly untuk pemula
- 🔧 Easy to customize

### Backend (Serverless)

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| Supabase | v2.x | Backend-as-a-Service (BaaS) |
| PostgreSQL | 14 | Relational database |
| Supabase Auth | - | Authentication & OAuth |
| Supabase Realtime | - | Real-time data sync |

**Supabase Features:**
- ✅ Built-in authentication (Email + OAuth)
- ✅ PostgreSQL dengan Row Level Security
- ✅ Real-time subscriptions
- ✅ Auto-generated REST API
- ✅ Free tier: 500MB database, 2GB bandwidth

### Deployment

| Service | Kegunaan | Status |
|---------|----------|--------|
| Vercel | Frontend hosting | ✅ Active |
| Supabase Cloud | Backend serverless | ✅ Active |

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │  index.html │  │  styles.css  │  │   script.js    │ │
│  │             │  │              │  │                │ │
│  │  Structure  │  │   Styling    │  │  Logic + Auth  │ │
│  └─────────────┘  └──────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS / WebSocket
                            ▼
┌─────────────────────────────────────────────────────────┐
│              SUPABASE (Backend Serverless)               │
│  ┌──────────────────┐  ┌─────────────────────────────┐ │
│  │  Supabase Auth   │  │    PostgreSQL Database      │ │
│  │  • Email/Pass    │  │  • user_profiles            │ │
│  │  • Google OAuth  │  │  • user_progress            │ │
│  │  • JWT Sessions  │  │  • Row Level Security (RLS) │ │
│  └──────────────────┘  └─────────────────────────────┘ │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Supabase Realtime (WebSocket)            │  │
│  │         • Leaderboard live updates               │  │
│  │         • Progress synchronization               │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action (Run Code) 
    ↓
Simulate Execution (JavaScript)
    ↓
Calculate Score
    ↓
Check if score > best_score
    ↓
Save to Supabase (if higher)
    ↓
Update UI + Leaderboard
```

---

## 📦 Prasyarat Sistem

### Required:
- ✅ **Browser Modern**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- ✅ **Git**: untuk clone repository ([Download](https://git-scm.com/))
- ✅ **Code Editor**: VS Code, Sublime, atau sejenisnya ([Download VS Code](https://code.visualstudio.com/))

### Optional (untuk fitur database):
- ✅ **Akun Supabase**: Gratis di [supabase.com](https://supabase.com)
- ✅ **Akun Google Cloud**: Untuk Google OAuth ([console.cloud.google.com](https://console.cloud.google.com))
- ✅ **Akun Vercel/Netlify**: Untuk deployment ([vercel.com](https://vercel.com) / [netlify.com](https://netlify.com))

---

## 🚀 Instalasi & Setup

### Step 1: Clone Repository

```bash
# Clone repository
git clone https://github.com/KenzieRafa/Virtual-Lab.git

# Masuk ke folder proyek
cd Virtual-Lab

# (Opsional) Buat branch baru untuk development
git checkout -b development
```

### Step 2: Struktur File

```
Virtual-Lab/
├── index.html          # File HTML utama
├── styles.css          # File CSS styling
├── script.js           # File JavaScript logic
├── README.md           # Dokumentasi
└── .gitignore          # (Opsional) Ignore files
```

### Step 3: Jalankan Secara Lokal

**Metode 1: Double-click**
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

**Metode 2: VS Code Live Server**
```bash
# Install extension "Live Server" di VS Code
# Klik kanan index.html > "Open with Live Server"
```

**Metode 3: Python HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Buka browser: http://localhost:8000
```

### Step 4: Konfigurasi Supabase

⚠️ **PENTING**: Tanpa konfigurasi Supabase, fitur berikut TIDAK akan berfungsi:
- ❌ Autentikasi (Sign In/Sign Up)
- ❌ Penyimpanan progress
- ❌ Auto-save skor
- ❌ Leaderboard
- ❌ Academic Progress page

#### Setup Supabase:

1. **Buat Project Supabase**
   - Login ke [Supabase Dashboard](https://app.supabase.com)
   - Klik "New Project"
   - Isi form:
     - Project name: `virtual-lab`
     - Database password: (buat password kuat)
     - Region: `Southeast Asia (Singapore)`
   - Klik "Create new project"

2. **Dapatkan API Credentials**
   - Masuk ke Settings → API
   - Copy:
     - `Project URL`: `https://xxx.supabase.co`
     - `anon public`: `eyJhbGci...`

3. **Update script.js**
   ```javascript
   // Ganti baris 1-2 di script.js
   const SUPABASE_URL = 'https://xxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGci...';
   ```

4. **Save & Refresh**
   - Save file `script.js`
   - Refresh browser (F5)
   - Cek console: `✅ Supabase connected successfully`

---

## 🗄️ Struktur Database

### Tabel 1: `user_profiles`

Menyimpan informasi profil pengguna.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `user_id` | UUID | Foreign key ke `auth.users` |
| `display_name` | TEXT | Nama tampilan user |
| `created_at` | TIMESTAMP | Waktu pembuatan akun |

### Tabel 2: `user_progress`

Menyimpan progress pembelajaran dan skor.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `user_id` | UUID | Foreign key ke `auth.users` |
| `completed_modules` | JSONB | Array bab yang sudah selesai `[1, 2, 3]` |
| `chapter_scores` | JSONB | Object skor per bab `{"bab1": {...}}` |
| `drag_drop_stats` | JSONB | Statistik drag & drop |
| `created_at` | TIMESTAMP | Waktu pembuatan record |
| `updated_at` | TIMESTAMP | Waktu update terakhir |

### Setup Database (SQL Script Lengkap)

Copy-paste script berikut ke **SQL Editor** di Supabase Dashboard:

```sql
-- Cleanup (hapus tabel lama jika ada)
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  completed_modules JSONB DEFAULT '[]'::jsonb,
  chapter_scores JSONB DEFAULT '{}'::jsonb,
  drag_drop_stats JSONB DEFAULT '{"attempts": 0, "correct": 0}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Enable read for authenticated users own data"
ON user_profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert for authenticated users"
ON user_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for authenticated users"
ON user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable read for all users (leaderboard)"
ON user_profiles FOR SELECT
TO authenticated
USING (true);

-- Policies for user_progress
CREATE POLICY "Enable read for authenticated users own progress"
ON user_progress FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert for authenticated users progress"
ON user_progress FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for authenticated users progress"
ON user_progress FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Enable read for all users progress (leaderboard)"
ON user_progress FOR SELECT
TO authenticated
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);

-- Cleanup tabel yang tidak perlu
DROP TABLE IF EXISTS chapter_scores CASCADE;
DROP TABLE IF EXISTS completed_modules CASCADE;
DROP TABLE IF EXISTS drag_drop_stats CASCADE;
```

### Penjelasan Row Level Security (RLS)

RLS memastikan keamanan data dengan aturan:

1. **Read Own Data**: User hanya bisa baca data mereka sendiri
   ```sql
   USING (auth.uid() = user_id)
   ```

2. **Insert/Update Own Data**: User hanya bisa insert/update data mereka
   ```sql
   WITH CHECK (auth.uid() = user_id)
   ```

3. **Public Leaderboard**: Semua authenticated user bisa baca semua data (untuk leaderboard)
   ```sql
   USING (true)
   ```

### Verifikasi Database

Setelah run SQL script, verifikasi dengan:

1. Masuk ke **Table Editor** di Supabase
2. Pastikan ada 2 tabel:
   - ✅ `user_profiles`
   - ✅ `user_progress`
3. Cek **Policies** (RLS tab):
   - ✅ 4 policies untuk `user_profiles`
   - ✅ 4 policies untuk `user_progress`
4. Cek **Indexes**:
   - ✅ `idx_user_profiles_user_id`
   - ✅ `idx_user_progress_user_id`

---

## 🌐 Deployment

### Option 1: Deploy ke Vercel (Recommended)

**Why Vercel?**
- ⚡ Super fast (global CDN)
- 🆓 Free tier unlimited
- 🔄 Auto-deploy on git push
- 🌐 Custom domain support

**Steps:**

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit with auth features"
   git remote add origin https://github.com/USERNAME/Virtual-Lab.git
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Login ke [vercel.com](https://vercel.com)
   - Klik "Add New..." → "Project"
   - Import repository `Virtual-Lab`
   - Framework Preset: **Other**
   - Klik "Deploy"
   - ✅ Done! Website live di `https://virtual-lab-xxx.vercel.app`

### Option 2: Deploy ke Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 💡 Cara Penggunaan

### Mode 1: Guest (Tanpa Login)

**Fitur yang Tersedia:**
- ✅ Baca materi semua bab
- ✅ Tonton video pembelajaran
- ✅ Tulis & jalankan kode di editor
- ✅ Lihat skor simulasi
- ✅ Main drag & drop
- ✅ Lihat visualisasi sorting

**Keterbatasan:**
- ❌ Progress tidak tersimpan
- ❌ Tidak muncul di leaderboard

### Mode 2: User Terdaftar (Recommended)

**Registrasi:**
1. Klik "Sign In" di header
2. Klik tab "Sign Up"
3. Isi form (nama, email, password)
4. Verifikasi email
5. Login

**Atau Sign In dengan Google:**
1. Klik "Sign In" → "Continue with Google"
2. Pilih akun Google
3. Done! Auto-login

**Cara Belajar Efektif:**

1. **Baca Materi** 📖
   - Pilih Bab → Pahami konsep → Tonton video
   - Klik "Tandai Pembelajaran Selesai" ✓

2. **Kerjakan Latihan** ✍️
   - Pilih soal → Tulis kode → Jalankan (Ctrl+Enter)
   - Target skor ≥70 untuk badge hijau

3. **Latihan Drag & Drop** 🎯
   - Susun blok kode dengan urutan benar
   - Gunakan hint jika kesulitan

4. **Visualisasi Algoritma** 📊
   - Generate array → Pilih algoritma → Mulai sorting
   - Amati proses secara visual

5. **Monitoring Progress** 📈
   - Cek "Academic Progress"
   - Target: ≥400 poin (Excellent)

---

## 👤 Author

**Kenzie Raffa Ardhana**
- NIM: 18223127
- Program Studi: Sistem dan Teknologi Informasi
- Institusi: Institut Teknologi Bandung
- GitHub: [@KenzieRafa](https://github.com/KenzieRafa)

**Dosen Pembimbing:**
- Daniel Wiyogo Dwiputro, S.T., M.T.
- Atina Putri, S.Kom., M.T.
- Dr. Fadhil Hidayat, S.Kom., M.T.

**Mata Kuliah:** II3140 - Pengembangan Aplikasi Web dan Mobile

---

<div align="center">

**Terima kasih telah menggunakan Virtual Lab!** 🎉

Selamat belajar dan semoga proyek ini bermanfaat!

[⬆ Back to Top](#-virtual-lab---berpikir-komputasional-tpb-itb)

</div>