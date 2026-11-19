# Sabila Alifia Sundawa — Creative Portfolio & Management

Personal branding, editorial portfolio, dan Content Management System (CMS) untuk **Sabila Alifia Sundawa**, mahasiswa S1 Manajemen di Pradita University dengan fokus pada bisnis, e-commerce, digital marketing, dan komunikasi kreatif.

---

## 🌟 Fitur Utama

- **Editorial Studio Design & Typography:** Estetika editorial modern dengan kombinasi font *Cormorant Garamond*, *Syne*, dan *Plus Jakarta Sans*.
- **Asymmetric Layout & Animations:** Rotating seal badge stamp, offset floating cards, custom geometric botanical arch SVG placeholders, dan reveal animations.
- **Light & Dark Mode:** Palet warna editorial (Ivory, Baby Blue, Dusty Pink, Gold) di Light Mode, serta Deep Navy & Warm Gold di Dark Mode. Tersimpan persisten di Local Storage dan database.
- **Radial Orbit Compass Navigation:** Menu navigasi melingkar di pojok kanan bawah dengan pergerakan busur trigonometris dan dashed orbit ring.
- **Interactive Vertical Typography Showcase:** Arsip visual tipografi vertikal (`ABOUT ME`, `EXPERIENCE`, `ORGANIZATION`, `SELECTED WORKS`, `CREATIVE SPACE`) dengan animasi mask reveal interaktif.
- **Selected Works & Project Carousel Modal:** Filter kategori dinamis dan modal pop-up dengan galeri multi-dokumentasi.
- **Full In-App Admin Studio Dashboard:**
  - Tambah, edit, hapus, dan atur urutan project.
  - Tambah, edit, dan hapus pengalaman kerja.
  - Kelola profil, narasi about me, dan pendidikan.
  - Multi-upload galeri dokumentasi organisasi dan vertical showcase.
  - Pengaturan link kontak (WhatsApp, Email, LinkedIn, Instagram).
- **Supabase Integration & Storage:**
  - Database Postgres dengan Row Level Security (RLS).
  - Storage bucket `portfolio-media` untuk foto profil, pengalaman, cover project, dan galeri.
  - Kompresi gambar otomatis di sisi klien (WebP) sebelum upload untuk performa maksimal.
  - Realtime subscription: Perubahan yang disimpan admin langsung tampil di website tanpa refresh halaman.
- **Offline / Prototype Fallback:** Jika Supabase belum dikonfigurasi, website tetap berjalan 100% menggunakan data default dan mode demo admin (Passcode: `SABILA2025`).

---

## 📁 Struktur Direktori Project

```text
sabila-portfolio/
├── .env.example              # Template variabel lingkungan Supabase
├── .gitignore                # File & folder yang diabaikan Git
├── index.html                # Entrypoint HTML & Google Fonts
├── package.json              # Dependensi React, Tailwind, Vite, Supabase
├── postcss.config.js         # Konfigurasi PostCSS Tailwind
├── tailwind.config.js        # Konfigurasi warna, font, dan keyframe animasi
├── vercel.json               # Konfigurasi deployment & rewrite SPA Vercel
├── vite.config.js            # Konfigurasi bundling Vite
├── README.md                 # Dokumentasi panduan lengkap
├── supabase/
│   ├── schema.sql            # Skema tabel database, RLS policies, dan Storage
│   └── seed.sql              # Data inisial portofolio
└── src/
    ├── main.jsx              # Entrypoint React + Providers
    ├── App.jsx               # Master layout, scroll spy, dan orkestrasi modal
    ├── index.css             # Tailwind base & styling custom scrollbar / vertical
    ├── types/
    │   └── initialData.js    # Data konten portofolio default & fallback
    ├── lib/
    │   ├── supabase.js       # Inisialisasi Supabase client & cek konfigurasi
    │   ├── storage.js        # Upload, delete, dan kompresi media client-side
    │   └── api.js            # Fetch data, sinkronisasi cloud, dan Realtime
    ├── context/
    │   ├── ThemeContext.jsx  # Context tema Light / Dark mode
    │   └── AuthContext.jsx   # Context autentikasi Admin Supabase / Demo
    └── components/
        ├── common/
        │   ├── EditorialFrame.jsx # Frame gambar/video dengan SVG arch placeholder
        │   ├── Toast.jsx          # Notifikasi feedback aksi
        │   └── Lightbox.jsx       # Preview layar penuh media foto/video
        ├── layout/
        │   ├── Header.jsx         # Navbar atas & toggle mode
        │   ├── RadialNav.jsx      # Menu kompas melingkar melayang
        │   └── Footer.jsx         # Kontak & colophon
        ├── sections/
        │   ├── HeroSection.jsx    # Hero dengan rotating seal & asymmetric layout
        │   ├── AboutSection.jsx   # About me & education stamp card
        │   ├── ExperienceSection.jsx # Kartu pengalaman kerja
        │   ├── OrganizationSection.jsx # PKKMB Leadership & galeri organisasi
        │   ├── VerticalShowcaseSection.jsx # Visual index tipografi vertikal
        │   ├── ProjectsSection.jsx # Grid filterable selected works
        │   ├── ProjectModal.jsx   # Pop-up detail project & carousel
        │   └── SkillsSection.jsx  # Hard skills & soft skills non-coding
        └── admin/
            ├── AdminModal.jsx     # Master container modal studio admin
            ├── AdminLogin.jsx     # Form login admin Supabase / Passcode demo
            ├── ProfileTab.jsx     # Form edit profil, hero, & pendidikan
            ├── ExperienceTab.jsx  # Form kelola pengalaman kerja
            ├── OrganizationTab.jsx # Form kelola info organisasi & galeri
            ├── ProjectsTab.jsx    # Form kelola project, urutan, & cover
            ├── VerticalTab.jsx    # Form kelola foto vertical showcase
            └── ContactTab.jsx     # Form kelola link kontak sosial media
```

---

## 🚀 Panduan Setup & Instalasi Lokal

### 1. Prasyarat
- **Node.js**: Versi 18 ke atas
- **npm** atau **pnpm** / **yarn**

### 2. Instalasi Dependensi
Buka terminal di direktori project:
```bash
cd sabila-portfolio
npm install
```

### 3. Jalankan Server Development
```bash
npm run dev
```
Buka browser pada alamat `http://localhost:3000`.

---

## 🗄️ Panduan Integrasi Supabase

### Langkah 1: Buat Project Baru di Supabase
1. Masuk ke [Supabase Dashboard](https://supabase.com/dashboard).
2. Klik **New Project**, tentukan nama project (misalnya: `sabila-portfolio`) dan buat password database.
3. Pilih region terdekat (misalnya: Singapore).

### Langkah 2: Jalankan Skrip SQL Database & Storage
1. Pada menu dashboard Supabase, buka menu **SQL Editor**.
2. Salin seluruh isi file [`supabase/schema.sql`](supabase/schema.sql) dan klik **Run**.
   - Skrip ini akan membuat tabel-tabel data, mengaktifkan Row Level Security (RLS), membuat storage bucket `portfolio-media`, dan mengatur hak akses publik & admin.
3. Salin seluruh isi file [`supabase/seed.sql`](supabase/seed.sql) dan klik **Run** untuk memasukkan data awal.

### Langkah 3: Buat Akun Admin
1. Pada dashboard Supabase, buka menu **Authentication** -> **Users**.
2. Klik **Add User** -> **Create User**.
3. Masukkan Email dan Password untuk akun Admin Anda, lalu klik **Create User**.

### Langkah 4: Hubungkan Kredensial ke Aplikasi
1. Buka menu **Project Settings** -> **API** di Supabase.
2. Salin **Project URL** dan **anon / public key**.
3. Buat file `.env` di direktori utama project (salin dari `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Masukkan kredensial Anda:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. Restart development server (`npm run dev`).

---

## 🔒 Keamanan (Security & Row Level Security)

- **Row Level Security (RLS):**
  - Seluruh pengguna umum (pengunjung publik) hanya memiliki hak akses `SELECT` (baca).
  - Operasi perubahan data (`INSERT`, `UPDATE`, `DELETE`) dan upload media ke Storage hanya dapat dilakukan oleh Admin yang terautentikasi (`auth.role() = 'authenticated'`).
- **Anon Key vs Service Role:**
  - Frontend hanya menggunakan `VITE_SUPABASE_ANON_KEY`.
  - **PENTING:** Jangan pernah memasukkan `service_role key` ke dalam kode frontend atau repository GitHub.

---

## 🌐 Panduan Deployment ke GitHub & Vercel

### 1. Simpan ke GitHub
```bash
# Inisialisasi Git repository jika belum
git init
git add .
git commit -m "feat: initial commit structured sabila portfolio"

# Hubungkan ke repository GitHub Anda
git branch -M main
git remote add origin https://github.com/USERNAME/sabila-portfolio.git
git push -u origin main
```

### 2. Deploy ke Vercel
1. Masuk ke [Vercel](https://vercel.com/) menggunakan akun GitHub.
2. Klik **Add New Project** dan pilih repository `sabila-portfolio`.
3. Pada bagian **Environment Variables**, tambahkan:
   - `VITE_SUPABASE_URL`: URL project Supabase Anda.
   - `VITE_SUPABASE_ANON_KEY`: Anon public key Supabase Anda.
4. Klik **Deploy**.
5. Vercel akan secara otomatis membangun project menggunakan konfigurasi yang ada di `vercel.json` dan `package.json`.

---

## 🎨 Akses Studio Admin

1. Klik tombol **Studio Admin** di pojok kanan atas website (atau tautan **Admin Dashboard** di footer).
2. Jika Supabase telah terhubung: Masukkan **Email & Password Admin** yang dibuat di Supabase Auth.
3. Jika masih dalam mode uji coba/offline: Masukkan Passcode default `SABILA2025`.
4. Anda dapat langsung mengunggah foto, mengganti teks, menambahkan proyek, dan menekan tombol **Simpan Semua Perubahan**.

---

## 📄 Lisensi
Hak cipta © 2026 **Sabila Alifia Sundawa**. Seluruh hak cipta dilindungi undang-undang.
