// app.js — logika bersama untuk semua halaman
// ======================================================================
// ISI URL WEB APP GOOGLE APPS SCRIPT ANDA DI SINI setelah deploy (lihat README.md).
// Jika dikosongkan, sistem otomatis memakai bank soal contoh di soal-data.js.
const CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbzUPKm7oeRII0Zn22MKsV90juf7TdsAhvDKnQhgpm0sLXYYySpJGOMebCPuE2MpKUQRFw/exec" // contoh: "https://script.google.com/macros/s/XXXXXXXXXXXX/exec"
};
// ======================================================================

const Store = {
  set(key, val){ sessionStorage.setItem(key, JSON.stringify(val)); },
  get(key, def=null){
    try { const v = sessionStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch(e){ return def; }
  },
  clear(){ sessionStorage.clear(); }
};

// Menyimpan diagnosa terakhir agar bisa ditampilkan di UI (mis. status di index.html)
const KoneksiInfo = { sumber: "contoh", pesan: "", detail: "" };

async function ujiKoneksiApi(){
  // Dipakai tombol "Tes Koneksi" di index.html untuk diagnosa langsung ke pengguna.
  if (!CONFIG.API_URL) {
    return { ok:false, pesan:"API_URL masih kosong di app.js." };
  }
  try {
    const res = await fetch(CONFIG.API_URL + "?action=soal", { cache:"no-store" });
    const teks = await res.text();
    let data;
    try { data = JSON.parse(teks); }
    catch(parseErr){
      return {
        ok:false,
        pesan:"Respons dari Apps Script bukan JSON (kemungkinan halaman error/izin login Google).",
        detail: teks.slice(0,300)
      };
    }
    if (data && data.error){
      return { ok:false, pesan:"Apps Script mengembalikan error: " + data.error, detail: JSON.stringify(data) };
    }
    if (!Array.isArray(data)){
      return { ok:false, pesan:"Format data tidak sesuai (bukan array soal).", detail: JSON.stringify(data).slice(0,300) };
    }
    if (data.length === 0){
      return { ok:false, pesan:"Terhubung, tetapi sheet 'SOAL' kosong atau header kolom tidak cocok persis (ID, Kategori, Soal, A, B, C, D, E, Kunci, Pembahasan)." };
    }
    return { ok:true, pesan:`Terhubung. ${data.length} soal terbaca dari Google Sheet.`, jumlah:data.length };
  } catch(e){
    return {
      ok:false,
      pesan:"Gagal fetch ke Apps Script (kemungkinan CORS/izin akses atau URL salah).",
      detail: String(e)
    };
  }
}

async function ambilSoal(){
  if (!CONFIG.API_URL) {
    KoneksiInfo.sumber = "contoh";
    KoneksiInfo.pesan = "API_URL belum diisi.";
    return SOAL_BANK;
  }
  const uji = await ujiKoneksiApi();
  if (uji.ok) {
    try {
      const res = await fetch(CONFIG.API_URL + "?action=soal", { cache:"no-store" });
      const data = await res.json();
      KoneksiInfo.sumber = "sheet";
      KoneksiInfo.pesan = uji.pesan;
      return data;
    } catch(e){
      // fallback tak terduga meski uji koneksi sukses
    }
  }
  KoneksiInfo.sumber = "contoh";
  KoneksiInfo.pesan = uji.pesan + (uji.detail ? " Detail: " + uji.detail : "");
  console.warn("Memakai bank soal contoh. Alasan:", uji.pesan, uji.detail || "");
  return SOAL_BANK;
}

async function simpanHasil(payload){
  if (!CONFIG.API_URL) return { ok:false, info:"API_URL belum diatur, hasil hanya tersimpan di sesi ini." };
  try {
    const res = await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // hindari preflight CORS pada Apps Script
      body: JSON.stringify({ action: "simpanHasil", ...payload })
    });
    const teks = await res.text();
    let data;
    try { data = JSON.parse(teks); } catch(e){
      return { ok:false, info:"Respons Apps Script bukan JSON (cek deployment/izin akses)." };
    }
    if (data && data.ok) return { ok:true };
    return { ok:false, info: "Apps Script menolak: " + (data && data.error ? data.error : "alasan tidak diketahui") };
  } catch(e){
    console.warn("Gagal menyimpan hasil ke Google Sheet.", e);
    return { ok:false, info:"Gagal terhubung ke Google Sheet (cek koneksi/deployment). Detail: " + String(e) };
  }
}

function kelompokkanPerKategori(soalList){
  const map = {};
  soalList.forEach(s=>{
    if (!map[s.kategori]) map[s.kategori] = [];
    map[s.kategori].push(s);
  });
  return map;
}

function hitungSkor(soalList, jawaban){
  // jawaban: { [id]: "A" }
  const hasilPerKategori = {};
  soalList.forEach(s=>{
    if (!hasilPerKategori[s.kategori]) {
      hasilPerKategori[s.kategori] = { benar:0, salah:0, kosong:0, total:0, skor:0 };
    }
    const h = hasilPerKategori[s.kategori];
    h.total++;
    const jwb = jawaban[s.id];
    if (!jwb) { h.kosong++; return; }
    if (jwb === s.kunci) {
      h.benar++;
      // TKP: benar bernilai 1-5 (di bank contoh kita anggap kunci = skor 5, opsi lain granular tidak dimodelkan
      // agar tetap sederhana untuk latihan; untuk simulasi resmi lengkap, tambahkan bobot per opsi di Sheet).
      h.skor += (s.kategori === "TKP") ? 5 : 5;
    } else {
      h.salah++;
    }
  });
  return hasilPerKategori;
}

function formatWaktu(detik){
  const m = Math.floor(detik/60).toString().padStart(2,"0");
  const s = Math.floor(detik%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}
