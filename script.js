// GANTI nomor berikut dengan nomor WhatsApp tujuan, gunakan kode negara 62.
 // Contoh: 6281234567890 (tanpa tanda +, spasi, atau strip).
const WHATSAPP_NUMBER = "628XXXXXXXXXX";
const WHATSAPP_MESSAGE = "Halo, saya ingin menghubungi Pdt. Dr. Stien Rondonuwu, M.Th. terkait informasi pelayanan.";

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Buka navigasi");
      });
    });
  }

  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const number = WHATSAPP_NUMBER.replace(/\D/g, "");
      if (!/^62\d{8,13}$/.test(number) || number.includes("XXXXXXXX")) {
        alert("Nomor WhatsApp belum diatur. Buka file script.js, lalu ganti 628XXXXXXXXXX dengan nomor WhatsApp tujuan.");
        return;
      }
      const url = `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});
