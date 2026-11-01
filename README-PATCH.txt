PAKET PEMBARUAN WEBSITE PDT. DR. STIEN RONDONUWU, M.TH.
=========================================================

TUJUAN
------
Paket ini menambahkan:
1. Tulisan "CALON WAKA PEKERJA GMIM DAN PELSUS" yang jauh lebih besar.
2. Bingkai emas premium pada foto profil dan foto akademik.
3. Galeri foto dan video yang datanya dapat diedit kapan saja.
4. Galeri responsif untuk layar komputer dan ponsel.

FILE DALAM PAKET
----------------
- gallery.css           Bingkai emas, ukuran teks cover, dan tampilan galeri.
- gallery.js            Membuat bagian Galeri dan tautan navigasi secara otomatis.
- gallery-data.js       Daftar foto/video yang dapat diedit.
- index-head-snippet.txt Potongan kode untuk memuat modul di index.html.
- assets/gallery/       Folder untuk foto dokumentasi tambahan.
- assets/videos/        Folder untuk video MP4/WebM.
- README-PATCH.txt      Panduan pemasangan dan pengeditan.

REPOSITORY TUJUAN
-----------------
https://github.com/jef6rap-star/Pdt.-Stien-Rondonuwu

CARA MEMASANG DI GITHUB
-----------------------
1. Ekstrak ZIP ini di komputer.
2. Buka repository tujuan.
3. Klik Add file > Upload files.
4. Unggah gallery.css, gallery.js, dan gallery-data.js ke root repository.
5. Unggah folder assets/gallery dan assets/videos beserta file README.txt-nya.
6. Buka index.html, klik ikon pensil (Edit this file).
7. Temukan baris:
   <script src="script.js" defer></script>
8. Ganti baris tersebut dengan:
   <script src="gallery-data.js" defer></script>
   <script src="gallery.js" defer></script>
   <script src="script.js" defer></script>
9. Klik Commit changes pada branch main.
10. Tunggu GitHub Pages selesai memperbarui website.

PENTING:
- Jangan menghapus file lama atau folder assets yang sudah ada.
- Jangan mengganti nama foto profil dan foto akademik yang sudah dipakai
  oleh website.
- File gallery.js otomatis menambahkan link Galeri ke navigasi, membuat
  section galeri sebelum bagian Hubungi, dan memuat gallery.css.
- Tulisan calon pada cover diperbesar melalui gallery.css. Ukuran desktop
  sekitar 22–32 px dan ukuran ponsel 16–18 px, menyesuaikan lebar layar.

CARA MENAMBAH FOTO
------------------
1. Upload foto baru ke assets/gallery/, contoh: ibadah-raya.jpg.
2. Buka gallery-data.js.
3. Tambahkan objek di dalam window.GALLERY_ITEMS:

{
  type: "image",
  title: "Ibadah Raya",
  category: "Pelayanan",
  src: "assets/gallery/ibadah-raya.jpg",
  alt: "Dokumentasi ibadah raya",
  description: "Keterangan singkat foto."
}

CARA MENAMBAH VIDEO MP4
-----------------------
1. Upload file MP4 ke assets/videos/, contoh: ibadah-raya.mp4.
2. Tambahkan objek ke gallery-data.js:

{
  type: "video",
  title: "Ibadah Raya",
  category: "Video",
  src: "assets/videos/ibadah-raya.mp4",
  poster: "assets/portrait-academic.jpg",
  description: "Dokumentasi video ibadah raya."
}

VIDEO YOUTUBE
-------------
Gunakan type "video" dan isi src dengan URL YouTube lengkap:
src: "https://www.youtube.com/watch?v=VIDEO_ID"

MENGEDIT ATAU MENGHAPUS ITEM GALERI
-----------------------------------
Edit, pindahkan urutan, atau hapus objek dalam window.GALLERY_ITEMS
pada gallery-data.js. Tidak perlu mengubah gallery.js.

STATUS PUBLIKASI
----------------
Paket ini disiapkan untuk repository yang sama. Integrasi GitHub ChatGPT
saat ini dapat membaca repository tetapi API penulisan mengembalikan
HTTP 403 "Resource not accessible by integration". Oleh sebab itu,
perubahan belum masuk ke website online. Unggah file paket ini secara
manual dan commit ke branch main untuk menerbitkannya.
