# Simulasi CAT CPNS Guru

Sistem latihan mandiri seleksi CPNS/PPPK Guru: SKD (TWK, TIU, TKP) + Kompetensi Teknis Guru,
dengan timer per kategori, penilaian otomatis, dan pembahasan jawaban di akhir sesi.
Frontend statis (HTML/CSS/JS) — bisa di-host gratis di **GitHub Pages** — dan database soal
+ hasil memakai **Google Sheets** (lewat Google Apps Script sebagai API).

> **Catatan penting:** Ini adalah alat bantu latihan mandiri, bukan situs resmi BKN/Kemendikdasmen.
> Struktur soal (30 TWK / 35 TIU / 45 TKP) dan passing grade (TWK 65, TIU 80, TKP 166, total maks 550)
> mengikuti pola SKD CPNS yang berlaku umum. Nilai ambang batas resmi ditetapkan tiap tahun lewat
> Keputusan Menteri PANRB — selalu cek pengumuman resmi untuk tahun berjalan di sscasn.bkn.go.id.

## Struktur folder

```
cpns-sim/
├── index.html          # halaman biodata & mulai ujian
├── ujian.html           # halaman ujian (timer, navigasi soal)
├── hasil.html            # halaman skor & pembahasan
├── style.css
├── app.js                # konfigurasi API_URL + logika inti
├── soal-data.js          # bank soal contoh (fallback bila Sheet belum disambung)
├── soal-template.csv      # contoh struktur data untuk sheet "SOAL"
└── apps-script/
    └── Code.gs             # backend Google Apps Script
```

## 1. Menjalankan langsung (mode contoh, tanpa setup apa pun)

Buka `index.html` langsung di browser, atau unggah seluruh folder ke GitHub Pages.
Karena `CONFIG.API_URL` di `app.js` masih kosong, sistem otomatis memakai bank soal
contoh di `soal-data.js` (24 soal: 6 TWK, 6 TIU, 5 TKP, 6 Teknis).

## 2. Menghubungkan ke Google Sheets (soal penuh + rekap hasil)

### a. Buat Spreadsheet

1. Buat Google Spreadsheet baru.
2. Buat sheet (tab) bernama **`SOAL`** dengan header di baris 1 persis seperti berikut:

   | ID | Kategori | Soal | A | B | C | D | E | Kunci | Pembahasan |
   |----|----------|------|---|---|---|---|---|-------|------------|

   - `Kategori` isi salah satu: `TWK`, `TIU`, `TKP`, atau `Teknis`.
   - `Kunci` isi salah satu huruf: `A`–`E`.
   - Isi soal sesuai jumlah resmi jika ingin simulasi penuh: 30 TWK, 35 TIU, 45 TKP,
     ditambah soal Teknis sesuai kisi-kisi mapel yang diampu.
   - Contoh baris ada di `soal-template.csv` — bisa dibuka lalu disalin isinya ke sheet `SOAL`
     (File > Import > Upload, pilih "Insert new sheet" atau salin manual).
   - Sheet **`HASIL`** akan otomatis dibuat oleh skrip saat hasil pertama disimpan.

### b. Pasang Apps Script

1. Di Spreadsheet, buka **Extensions > Apps Script**.
2. Hapus kode default, tempel seluruh isi file `apps-script/Code.gs`.
3. Klik **Deploy > New deployment**.
4. Pilih tipe **Web app**, isi:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Klik **Deploy**, izinkan akses (authorize) saat diminta.
6. Salin **URL Web App** yang muncul (formatnya `https://script.google.com/macros/s/.../exec`).

### c. Hubungkan ke frontend

Buka `app.js`, isi baris berikut dengan URL dari langkah sebelumnya:

```js
const CONFIG = {
  API_URL: "https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXX/exec"
};
```

Simpan. Sistem sekarang akan mengambil soal dari Google Sheet dan menyimpan setiap
hasil simulasi (nama, skor per kategori, total SKD) ke sheet `HASIL`.

> Setiap kali Anda mengubah isi sheet `SOAL`, tidak perlu deploy ulang — cukup refresh halaman
> `index.html`. Jika Anda mengubah *kode* di `Code.gs`, deploy ulang lewat **Deploy > Manage deployments > Edit > New version**.

## 2.d Troubleshooting: "sudah dihubungkan tapi tetap pakai soal contoh / gagal simpan"

Di `index.html` sekarang ada tombol **"Tes Koneksi Google Sheet"** — klik ini dulu untuk melihat
pesan error yang sebenarnya (bukan sekadar gagal generik). Penyebab paling umum:

1. **Deployment belum di-update setelah edit `Code.gs`.**
   Mengubah kode script *tidak* otomatis memperbarui URL `/exec` yang sudah ada. Setiap habis
   mengubah `Code.gs`, buka **Deploy > Manage deployments > (ikon pensil) Edit > Version: New version > Deploy**.

2. **Akses deployment bukan "Anyone".**
   Saat deploy, pastikan *Who has access* diatur **Anyone** (bukan "Anyone with Google account" atau
   "Only myself"), kalau tidak, permintaan dari GitHub Pages akan ditolak/redirect ke halaman login Google.

3. **Belum melakukan authorize.**
   Saat pertama kali Deploy, akan muncul layar izin (Authorize access) — klik akun Google Anda,
   klik "Advanced" > "Go to (nama project) (unsafe)" jika muncul peringatan, lalu Allow. Tanpa ini,
   Apps Script akan membalas halaman HTML "membutuhkan otorisasi", bukan JSON.

4. **Nama sheet atau header kolom tidak persis sama.**
   Nama tab harus **`SOAL`** (huruf besar semua, tanpa spasi). Header baris 1 harus persis:
   `ID, Kategori, Soal, A, B, C, D, E, Kunci, Pembahasan` — beda huruf besar/kecil atau ada
   spasi ekstra akan membuat sistem menganggap data kosong.

5. **URL yang dipakai adalah URL `/dev`, bukan `/exec`.**
   Gunakan URL hasil **Deploy** (berakhiran `/exec`), bukan URL dari mode "Test deployments" (`/dev`)
   yang hanya bisa diakses oleh akun Anda sendiri.

Cara cek manual paling cepat: tempel URL Web App + `?action=soal` (contoh:
`https://script.google.com/macros/s/xxxx/exec?action=soal`) langsung ke address bar browser.
Jika muncul JSON berisi daftar soal, berarti backend sudah benar dan masalahnya ada di sisi
frontend (`API_URL` di `app.js` salah salin/ada spasi). Jika muncul halaman HTML/izin login,
berarti masalah ada di poin 2 atau 3 di atas.

## 3. Deploy ke GitHub Pages

1. Buat repository baru di GitHub, unggah seluruh isi folder `cpns-sim/` (bukan folder `apps-script`
   wajib diunggah juga, tidak masalah — file itu hanya referensi, tidak dieksekusi di GitHub).
2. Buka **Settings > Pages** pada repo tersebut.
3. Pilih **Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Tunggu beberapa menit, situs akan aktif di `https://<username>.github.io/<nama-repo>/`.

## 4. Kustomisasi

- **Durasi per kategori**: atur `detikPerSoal` pada `KATEGORI_INFO` di `soal-data.js`
  (durasi total kategori = jumlah soal × detikPerSoal).
- **Passing grade**: field `passingGrade` di `KATEGORI_INFO` (sesuaikan dengan
  ketetapan resmi tahun berjalan bila diperlukan).
- **Bobot skor TKP granular (1–5 per opsi)**: saat ini setiap jawaban benar TKP diberi skor 5
  (skor biner: benar/salah) agar sistem tetap sederhana. Untuk mereplikasi bobot 1–5 per pilihan
  seperti SKD asli, tambahkan kolom skor per opsi di sheet `SOAL` dan sesuaikan fungsi
  `hitungSkor()` di `app.js`.

## Sumber acuan struktur SKD

Jumlah soal (TWK 30, TIU 35, TKP 45 — total 110 soal, 100 menit) dan passing grade
(TWK 65, TIU 80, TKP 166, nilai maksimal 550) mengacu pada pola yang konsisten diterapkan
Kemenpan RB/BKN pada seleksi CPNS beberapa tahun terakhir. Selalu verifikasi ke
pengumuman resmi (KepmenPANRB tahun berjalan, sscasn.bkn.go.id) karena angka ini
dapat berubah setiap tahun.
