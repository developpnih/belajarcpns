// app.js — logika bersama untuk semua halaman
// ======================================================================
// ISI URL WEB APP GOOGLE APPS SCRIPT ANDA DI SINI setelah deploy (lihat README.md).
// Jika dikosongkan, sistem otomatis memakai bank soal contoh di soal-data.js.
const CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbzVadz9viNVoVkXTJABqz6muYwuI3m_On5ygoGEoN7KzQKeMys6D34Uje8OGA2FtQ3LmA/exec" // contoh: "https://script.google.com/macros/s/XXXXXXXXXXXX/exec"
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

async function ambilSoal(){
  if (CONFIG.API_URL) {
    try {
      const res = await fetch(CONFIG.API_URL + "?action=soal");
      const data = await res.json();
      if (Array.isArray(data) && data.length) return data;
    } catch (e) {
      console.warn("Gagal ambil soal dari Google Sheet, memakai bank soal contoh.", e);
    }
  }
  return SOAL_BANK;
}

async function simpanHasil(payload){
  if (!CONFIG.API_URL) return { ok:false, info:"API_URL belum diatur, hasil hanya tersimpan di sesi ini." };
  try {
    await fetch(CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // hindari preflight CORS pada Apps Script
      body: JSON.stringify({ action: "simpanHasil", ...payload })
    });
    return { ok:true };
  } catch(e){
    console.warn("Gagal menyimpan hasil ke Google Sheet.", e);
    return { ok:false, info:"Gagal terhubung ke Google Sheet." };
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
