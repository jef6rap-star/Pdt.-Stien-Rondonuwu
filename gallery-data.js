/*
 * DATA GALERI WEBSITE — EDIT FILE INI UNTUK MENAMBAH / MENGUBAH FOTO & VIDEO.
 *
 * FOTO:
 * 1. Upload foto ke folder assets/gallery/
 * 2. Tambahkan item type "image" dengan src sesuai nama file.
 *
 * VIDEO MP4:
 * 1. Upload video ke folder assets/videos/
 * 2. Tambahkan item type "video" dan isi src, contoh:
 *    src: "assets/videos/ibadah-sinode.mp4"
 *
 * VIDEO YOUTUBE:
 * Isi src dengan URL YouTube lengkap, contoh:
 *    src: "https://www.youtube.com/watch?v=VIDEO_ID"
 *
 * Hapus item dari daftar ini jika tidak ingin ditampilkan.
 */
window.GALLERY_ITEMS = [
  {
    type: "image",
    title: "Potret Resmi",
    category: "Profil",
    src: "assets/portrait-formal.jpg",
    alt: "Pdt. Dr. Stien Rondonuwu, M.Th. mengenakan busana formal",
    description: "Potret resmi profil pribadi."
  },
  {
    type: "image",
    title: "Potret Akademik",
    category: "Pendidikan",
    src: "assets/portrait-academic.jpg",
    alt: "Pdt. Dr. Stien Rondonuwu, M.Th. mengenakan busana akademik",
    description: "Dokumentasi profil akademik."
  },
  {
    type: "video",
    title: "Dokumentasi Pelayanan",
    category: "Video",
    src: "",
    poster: "assets/portrait-academic.jpg",
    description: "Slot video siap diisi dengan tautan YouTube atau file MP4."
  }
];
