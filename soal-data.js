// soal-data.js
// Bank soal CONTOH/LATIHAN bergaya SKD CPNS Guru (TWK, TIU, TKP) + Kompetensi Teknis Guru.
// Ini dipakai sebagai fallback bila Google Apps Script (API_URL di app.js) belum diisi.
// Untuk simulasi penuh (110 soal SKD sesuai jumlah resmi + soal teknis per mapel),
// isi soal Anda sendiri di Google Sheet mengikuti struktur kolom pada README.md.

const SOAL_BANK = [
  // ===================== TWK =====================
  {
    id: "TWK-01", kategori: "TWK",
    soal: "Nilai dasar yang terkandung dalam sila ke-3 Pancasila, 'Persatuan Indonesia', paling tepat diwujudkan seorang guru di kelas melalui sikap...",
    pilihan: {
      A: "Memberi nilai tambahan kepada siswa yang seagama dengan guru",
      B: "Menumbuhkan rasa kebangsaan dan menghargai keberagaman suku, agama, dan latar belakang siswa",
      C: "Mengutamakan siswa dari daerah asal guru mengajar",
      D: "Membiarkan siswa berkelompok hanya dengan suku yang sama",
      E: "Menerapkan bahasa daerah sebagai satu-satunya bahasa pengantar"
    },
    kunci: "B",
    pembahasan: "Sila ke-3 Pancasila menekankan persatuan di tengah keberagaman. Bagi guru, nilai ini diwujudkan dengan membangun rasa kebangsaan dan sikap inklusif terhadap keberagaman siswa, bukan dengan memberi perlakuan istimewa berdasarkan kesamaan latar belakang (opsi A, C, D, E justru bertentangan dengan semangat persatuan)."
  },
  {
    id: "TWK-02", kategori: "TWK",
    soal: "UUD 1945 hasil amandemen menegaskan bahwa kedaulatan berada di tangan rakyat dan dilaksanakan menurut...",
    pilihan: { A: "Keputusan Presiden", B: "Undang-Undang Dasar", C: "Kebijakan partai mayoritas", D: "Musyawarah adat", E: "Peraturan Pemerintah" },
    kunci: "B",
    pembahasan: "Pasal 1 ayat (2) UUD 1945 hasil amandemen berbunyi: kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar. Ini mengganti rumusan lama 'dilaksanakan sepenuhnya oleh MPR'."
  },
  {
    id: "TWK-03", kategori: "TWK",
    soal: "Semboyan 'Bhinneka Tunggal Ika' berasal dari kitab...",
    pilihan: { A: "Negarakertagama", B: "Sutasoma", C: "Arjunawiwaha", D: "Pararaton", E: "Sundayana" },
    kunci: "B",
    pembahasan: "Semboyan Bhinneka Tunggal Ika dikutip dari kitab Sutasoma karya Mpu Tantular pada masa Majapahit, yang secara harfiah berarti 'berbeda-beda tetapi tetap satu jua'."
  },
  {
    id: "TWK-04", kategori: "TWK",
    soal: "Fungsi ASN sebagai pelaksana kebijakan publik, pelayan publik, dan perekat pemersatu bangsa diatur dalam...",
    pilihan: { A: "UU No. 5 Tahun 2014", B: "UU No. 20 Tahun 2003", C: "UU No. 14 Tahun 2005", D: "PP No. 53 Tahun 2010", E: "UU No. 6 Tahun 2014" },
    kunci: "A",
    pembahasan: "UU No. 5 Tahun 2014 tentang Aparatur Sipil Negara mengatur tiga fungsi ASN: pelaksana kebijakan publik, pelayan publik, dan perekat serta pemersatu bangsa."
  },
  {
    id: "TWK-05", kategori: "TWK",
    soal: "Sikap bela negara yang paling relevan dilakukan seorang guru dalam kehidupan sehari-hari di sekolah adalah...",
    pilihan: {
      A: "Ikut wajib militer",
      B: "Menanamkan cinta tanah air dan disiplin melalui pembiasaan di kelas",
      C: "Menghindari pembahasan isu kebangsaan agar netral",
      D: "Fokus hanya pada capaian akademik tanpa nilai karakter",
      E: "Menolak upacara bendera karena dianggap formalitas"
    },
    kunci: "B",
    pembahasan: "Bela negara tidak selalu berbentuk militer. Bagi guru, wujud nyatanya adalah menanamkan nilai cinta tanah air, disiplin, dan tanggung jawab kepada siswa melalui kegiatan dan pembiasaan sehari-hari di sekolah."
  },
  {
    id: "TWK-06", kategori: "TWK",
    soal: "Lembaga negara yang berwenang menguji undang-undang terhadap UUD 1945 adalah...",
    pilihan: { A: "Mahkamah Agung", B: "Mahkamah Konstitusi", C: "DPR", D: "Komisi Yudisial", E: "BPK" },
    kunci: "B",
    pembahasan: "Mahkamah Konstitusi (MK) berwenang menguji undang-undang terhadap UUD 1945 (judicial review), sedangkan Mahkamah Agung menguji peraturan di bawah undang-undang."
  },

  // ===================== TIU =====================
  {
    id: "TIU-01", kategori: "TIU",
    soal: "GURU : MENGAJAR = DOKTER : ...",
    pilihan: { A: "Rumah Sakit", B: "Mengobati", C: "Pasien", D: "Obat", E: "Stetoskop" },
    kunci: "B",
    pembahasan: "Pola analogi ini adalah profesi : aktivitas utamanya. Guru mengajar, maka dokter mengobati. Opsi lain (rumah sakit, pasien, obat, stetoskop) adalah objek/alat, bukan aktivitas."
  },
  {
    id: "TIU-02", kategori: "TIU",
    soal: "Jika semua guru bersertifikasi mendapat tunjangan profesi, dan Pak Budi adalah guru bersertifikasi, maka...",
    pilihan: {
      A: "Pak Budi belum tentu mendapat tunjangan profesi",
      B: "Pak Budi pasti mendapat tunjangan profesi",
      C: "Pak Budi mendapat tunjangan hanya jika mengajar di sekolah negeri",
      D: "Semua guru pasti bersertifikasi",
      E: "Tunjangan profesi tidak berkaitan dengan sertifikasi"
    },
    kunci: "B",
    pembahasan: "Ini silogisme kategoris sederhana: premis umum (semua guru bersertifikasi mendapat tunjangan) + premis khusus (Pak Budi guru bersertifikasi) menghasilkan kesimpulan pasti: Pak Budi mendapat tunjangan profesi."
  },
  {
    id: "TIU-03", kategori: "TIU",
    soal: "Sebuah kelas memiliki 40 siswa. Jika 60% siswa lulus dengan nilai di atas 80, berapa siswa yang nilainya 80 ke bawah?",
    pilihan: { A: "12", B: "14", C: "16", D: "18", E: "24" },
    kunci: "C",
    pembahasan: "60% dari 40 = 24 siswa nilai di atas 80. Sisanya = 40 - 24 = 16 siswa bernilai 80 ke bawah."
  },
  {
    id: "TIU-04", kategori: "TIU",
    soal: "Melanjutkan pola bilangan: 3, 6, 11, 18, 27, ...",
    pilihan: { A: "34", B: "36", C: "38", D: "40", E: "42" },
    kunci: "C",
    pembahasan: "Selisih antar suku bertambah 2 setiap langkah: +3, +5, +7, +9, +11. Maka suku berikutnya = 27 + 11 = 38."
  },
  {
    id: "TIU-05", kategori: "TIU",
    soal: "Antonim kata 'KONTRIBUSI' adalah...",
    pilihan: { A: "Sumbangan", B: "Partisipasi", C: "Absensi", D: "Ketidakpedulian", E: "Bantuan" },
    kunci: "D",
    pembahasan: "Kontribusi berarti sumbangan atau peran aktif terhadap sesuatu. Lawan katanya adalah sikap tidak peduli/tidak berperan, yaitu ketidakpedulian."
  },
  {
    id: "TIU-06", kategori: "TIU",
    soal: "Kecepatan rata-rata seorang guru bersepeda ke sekolah adalah 15 km/jam. Jika jarak rumah ke sekolah 7,5 km, waktu tempuhnya adalah...",
    pilihan: { A: "20 menit", B: "25 menit", C: "30 menit", D: "35 menit", E: "45 menit" },
    kunci: "C",
    pembahasan: "Waktu = jarak ÷ kecepatan = 7,5 ÷ 15 jam = 0,5 jam = 30 menit."
  },

  // ===================== TKP =====================
  {
    id: "TKP-01", kategori: "TKP",
    soal: "Sebagai guru baru, Anda melihat rekan sejawat menerapkan metode mengajar yang menurut Anda kurang efektif. Sikap Anda...",
    pilihan: {
      A: "Membiarkan saja karena bukan urusan Anda",
      B: "Langsung melaporkan ke kepala sekolah tanpa berbicara dulu",
      C: "Mendiskusikan secara pribadi dan sopan, menawarkan alternatif metode bila diminta",
      D: "Menyindir rekan tersebut di depan siswa",
      E: "Mengabaikan dan fokus pada kelas sendiri saja"
    },
    kunci: "C",
    pembahasan: "TKP menilai kematangan bersikap. Pilihan yang menunjukkan komunikasi konstruktif, kolaboratif, dan menjaga hubungan profesional (C) mendapat skor tertinggi. Melapor tanpa komunikasi (B) atau bersikap pasif (A, E) kurang menunjukkan inisiatif positif; menyindir (D) tidak profesional."
  },
  {
    id: "TKP-02", kategori: "TKP",
    soal: "Anda ditugaskan menyusun modul ajar dalam waktu singkat karena ada perubahan kurikulum mendadak. Yang Anda lakukan...",
    pilihan: {
      A: "Menolak tugas karena waktu terlalu singkat",
      B: "Menyusun seadanya asal selesai tepat waktu",
      C: "Membuat skala prioritas, bekerja fokus, dan berkoordinasi bila perlu bantuan",
      D: "Menunda hingga mendekati tenggat",
      E: "Meminta rekan lain mengerjakan seluruhnya"
    },
    kunci: "C",
    pembahasan: "Aspek yang diukur adalah orientasi pada hasil dan manajemen waktu di bawah tekanan. Menyusun prioritas dan tetap menjaga kualitas sambil berkoordinasi (C) menunjukkan profesionalisme, dibanding menolak, asal-asalan, atau menunda."
  },
  {
    id: "TKP-03", kategori: "TKP",
    soal: "Seorang wali murid mengeluhkan nilai anaknya dengan nada emosional. Respons paling tepat Anda sebagai guru...",
    pilihan: {
      A: "Membalas dengan nada tinggi juga",
      B: "Mendengarkan keluhan dengan tenang, menjelaskan dasar penilaian secara objektif",
      C: "Menghindari pertemuan dengan wali murid tersebut",
      D: "Langsung menaikkan nilai agar keluhan berhenti",
      E: "Menyuruh wali murid bicara ke kepala sekolah saja"
    },
    kunci: "B",
    pembahasan: "TKP mengukur pelayanan publik dan pengendalian diri. Sikap tenang, mendengarkan, dan menjelaskan secara objektif dan transparan (B) adalah respons paling profesional; mengubah nilai tanpa dasar (D) melanggar integritas."
  },
  {
    id: "TKP-04", kategori: "TKP",
    soal: "Anda menemukan kesalahan pada soal ujian yang sudah dibagikan kepada siswa saat ujian berlangsung. Tindakan Anda...",
    pilihan: {
      A: "Membiarkan saja agar tidak ribet",
      B: "Segera mengklarifikasi kepada seluruh siswa secara adil dan mencatat kejadian tersebut",
      C: "Hanya memberi tahu siswa yang bertanya",
      D: "Menyalahkan panitia ujian di depan siswa",
      E: "Membatalkan ujian tanpa penjelasan"
    },
    kunci: "B",
    pembahasan: "Prinsip keadilan dan transparansi mengharuskan klarifikasi disampaikan merata ke seluruh peserta, bukan hanya yang bertanya (C), dibiarkan (A), atau disikapi secara tidak profesional (D, E)."
  },
  {
    id: "TKP-05", kategori: "TKP",
    soal: "Sekolah menerapkan sistem baru untuk presensi digital yang belum Anda kuasai. Sikap Anda...",
    pilihan: {
      A: "Menolak menggunakan sistem baru",
      B: "Mempelajari secara mandiri dan bertanya kepada rekan atau operator bila mengalami kendala",
      C: "Meminta orang lain mengisi presensi untuk Anda selamanya",
      D: "Mengabaikan presensi digital dan tetap memakai cara lama",
      E: "Mengeluh di depan siswa tentang sistem baru"
    },
    kunci: "B",
    pembahasan: "Aspek yang diukur adalah kemampuan beradaptasi dan belajar hal baru. Sikap proaktif mempelajari dan bertanya bila kesulitan (B) menunjukkan adaptabilitas yang baik dibanding menolak atau bergantung pada orang lain."
  },

  // ===================== TEKNIS GURU (Pedagogik & Profesional) =====================
  {
    id: "TEK-01", kategori: "Teknis",
    soal: "Pendekatan pembelajaran yang menempatkan siswa aktif mengonstruksi pengetahuannya sendiri berdasarkan pengalaman disebut...",
    pilihan: { A: "Behaviorisme", B: "Konstruktivisme", C: "Esensialisme", D: "Perenialisme", E: "Rekonstruksionisme" },
    kunci: "B",
    pembahasan: "Konstruktivisme (Piaget, Vygotsky) memandang belajar sebagai proses aktif siswa membangun pemahaman dari pengalaman dan interaksi, berbeda dengan behaviorisme yang berfokus pada stimulus-respons."
  },
  {
    id: "TEK-02", kategori: "Teknis",
    soal: "Dalam Kurikulum Merdeka, pembelajaran yang mengakomodasi perbedaan kesiapan, minat, dan profil belajar siswa disebut...",
    pilihan: { A: "Pembelajaran terdiferensiasi", B: "Pembelajaran klasikal", C: "Pembelajaran daring penuh", D: "Pembelajaran hafalan", E: "Pembelajaran satu arah" },
    kunci: "A",
    pembahasan: "Pembelajaran terdiferensiasi adalah strategi mengakomodasi kebutuhan belajar siswa yang beragam (kesiapan, minat, profil belajar) melalui diferensiasi konten, proses, atau produk."
  },
  {
    id: "TEK-03", kategori: "Teknis",
    soal: "Taksonomi Bloom ranah kognitif tingkat tertinggi (versi revisi Anderson & Krathwohl) adalah...",
    pilihan: { A: "Mengingat", B: "Memahami", C: "Menganalisis", D: "Mengevaluasi", E: "Mencipta" },
    kunci: "E",
    pembahasan: "Urutan revisi Taksonomi Bloom: Mengingat - Memahami - Menerapkan - Menganalisis - Mengevaluasi - Mencipta. 'Mencipta' (create) adalah level kognitif tertinggi."
  },
  {
    id: "TEK-04", kategori: "Teknis",
    soal: "Asesmen yang dilakukan di awal pembelajaran untuk memetakan kesiapan dan kebutuhan belajar siswa disebut...",
    pilihan: { A: "Asesmen sumatif", B: "Asesmen diagnostik", C: "Asesmen formatif", D: "Asesmen portofolio", E: "Asesmen autentik" },
    kunci: "B",
    pembahasan: "Asesmen diagnostik dilakukan sebelum pembelajaran untuk memetakan kondisi awal, kesiapan, dan kebutuhan belajar siswa, sebagai dasar merancang pembelajaran (termasuk diferensiasi)."
  },
  {
    id: "TEK-05", kategori: "Teknis",
    soal: "Prinsip utama Merdeka Belajar yang tercermin dalam Profil Pelajar Pancasila adalah...",
    pilihan: {
      A: "Keseragaman capaian akademik seluruh siswa",
      B: "Penguatan karakter dan kompetensi holistik: beriman, bernalar kritis, mandiri, kreatif, bergotong royong, dan berkebinekaan global",
      C: "Fokus tunggal pada nilai ujian nasional",
      D: "Penghapusan seluruh mata pelajaran umum",
      E: "Standarisasi metode mengajar untuk semua guru"
    },
    kunci: "B",
    pembahasan: "Profil Pelajar Pancasila mencakup enam dimensi: beriman-bertakwa dan berakhlak mulia, berkebinekaan global, bergotong royong, mandiri, bernalar kritis, dan kreatif — mencerminkan penguatan karakter holistik, bukan sekadar capaian akademik seragam."
  },
  {
    id: "TEK-06", kategori: "Teknis",
    soal: "Ketika seorang siswa kesulitan memahami materi meski sudah dijelaskan berulang, langkah pedagogik paling tepat guru adalah...",
    pilihan: {
      A: "Memberi nilai rendah agar siswa lebih giat belajar sendiri",
      B: "Mengulang penjelasan dengan metode dan media yang sama",
      C: "Melakukan asesmen untuk mengetahui akar kesulitan, lalu menyesuaikan pendekatan/media pembelajaran",
      D: "Meminta siswa pindah kelas",
      E: "Mengabaikan karena dianggap kemampuan siswa terbatas"
    },
    kunci: "C",
    pembahasan: "Pendekatan pedagogik yang tepat adalah mendiagnosis akar masalah belajar (gaya belajar, miskonsepsi, kesiapan) lalu menyesuaikan strategi/media, bukan sekadar mengulang cara yang sama (B) atau memberi sanksi (A)."
  }
];

// Konfigurasi durasi per kategori (menit) - merujuk struktur SKD CPNS umum:
// TWK 30 soal, TIU 35 soal, TKP 45 soal, total 110 soal / 100 menit.
// Untuk bank soal contoh (jumlah lebih sedikit), durasi diskalakan proporsional per soal.
const KATEGORI_INFO = {
  TWK:   { label: "Tes Wawasan Kebangsaan", maxSoalResmi: 30, skorMaks: 150, passingGrade: 65, detikPerSoal: 55 },
  TIU:   { label: "Tes Intelegensia Umum",  maxSoalResmi: 35, skorMaks: 175, passingGrade: 80, detikPerSoal: 60 },
  TKP:   { label: "Tes Karakteristik Pribadi", maxSoalResmi: 45, skorMaks: 225, passingGrade: 166, detikPerSoal: 45 },
  Teknis:{ label: "Kompetensi Teknis Guru (Pedagogik/Profesional)", maxSoalResmi: null, skorMaks: null, passingGrade: null, detikPerSoal: 60 }
};
