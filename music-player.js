/*
 * Pemutar musik latar website.
 * Audio disajikan dari file MP3 yang di-host bersama GitHub Pages.
 * Autoplay dicoba saat halaman dibuka; jika diblokir browser, gunakan kontrol ▶.
 */
(() => {
  const AUDIO_URL = "./assets/Melayani-Mengasihi-Lebih-Sungguh.mp3?v=2";
  const SONG_TITLE = "Melayani, Mengasihi Lebih Sungguh";

  function initMusicPlayer() {
    if (document.querySelector(".site-music-player")) return;

    const player = document.createElement("section");
    player.className = "site-music-player";
    player.setAttribute("aria-label", "Pemutar musik latar");

    const heading = document.createElement("div");
    heading.className = "site-music-player__heading";

    const title = document.createElement("span");
    title.className = "site-music-player__title";
    title.textContent = SONG_TITLE;

    const status = document.createElement("span");
    status.className = "site-music-player__status";
    status.setAttribute("aria-live", "polite");
    status.textContent = "Musik latar";

    heading.append(title, status);

    const audio = document.createElement("audio");
    audio.id = "site-background-music";
    audio.src = AUDIO_URL;
    audio.preload = "metadata";
    audio.loop = true;
    audio.autoplay = true;
    audio.controls = true;
    audio.setAttribute("playsinline", "");
    audio.setAttribute("aria-label", "Putar atau jeda musik latar");

    audio.addEventListener("playing", () => {
      status.textContent = "Sedang diputar · berulang";
    });
    audio.addEventListener("pause", () => {
      status.textContent = "Dijeda";
    });
    audio.addEventListener("waiting", () => {
      status.textContent = "Memuat musik…";
    });
    audio.addEventListener("canplay", () => {
      if (audio.paused) status.textContent = "Tekan ▶ untuk memutar";
    });
    audio.addEventListener("error", () => {
      status.textContent = "Musik gagal dimuat. Muat ulang halaman.";
    });

    player.append(heading, audio);
    document.body.appendChild(player);

    // Autoplay bersuara hanya berhasil bila diizinkan oleh kebijakan browser.
    audio.play().catch(() => {
      status.textContent = "Tekan ▶ pada pemutar untuk mulai";
    });

    // Interaksi pertama pada halaman juga mencoba memulai musik.
    const startAfterInteraction = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      document.removeEventListener("pointerdown", startAfterInteraction);
      document.removeEventListener("keydown", startAfterInteraction);
    };
    document.addEventListener("pointerdown", startAfterInteraction, { once: true });
    document.addEventListener("keydown", startAfterInteraction, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMusicPlayer, { once: true });
  } else {
    initMusicPlayer();
  }
})();
