(() => {
  const AUDIO_URL = "https://drive.google.com/uc?export=download&id=1Tjrn-A4qDEwMEUDI6ippvG3_gF71W_M9";
  const SONG_TITLE = "Melayani, Mengasihi Lebih Sungguh";

  function initMusicPlayer() {
    if (document.querySelector(".site-music-player")) return;

    const audio = document.createElement("audio");
    audio.id = "site-background-music";
    audio.src = AUDIO_URL;
    audio.preload = "auto";
    audio.loop = true;
    audio.autoplay = true;
    audio.setAttribute("playsinline", "");

    const player = document.createElement("div");
    player.className = "site-music-player";

    const button = document.createElement("button");
    button.className = "site-music-player__button";
    button.type = "button";
    button.setAttribute("aria-label", "Putar musik latar");

    const symbol = document.createElement("span");
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = "♪";

    const buttonLabel = document.createElement("span");
    buttonLabel.textContent = "Putar Musik";
    button.append(symbol, buttonLabel);

    const note = document.createElement("div");
    note.className = "site-music-player__note";

    const title = document.createElement("span");
    title.className = "site-music-player__title";
    title.textContent = SONG_TITLE;

    const status = document.createElement("span");
    status.className = "site-music-player__status";
    status.setAttribute("aria-live", "polite");
    status.textContent = "Musik latar website";

    note.append(title, status);
    player.append(button, note);
    document.body.append(audio, player);

    function updateState(playing) {
      buttonLabel.textContent = playing ? "Jeda Musik" : "Putar Musik";
      button.setAttribute("aria-label", playing ? "Jeda musik latar" : "Putar musik latar");
      status.textContent = playing ? "Sedang diputar · berulang" : "Sentuh untuk mendengarkan";
    }

    audio.addEventListener("play", () => updateState(true));
    audio.addEventListener("pause", () => updateState(false));
    audio.addEventListener("error", () => {
      status.textContent = "Audio belum dapat diakses";
      buttonLabel.textContent = "Coba Putar";
    });

    button.addEventListener("click", async () => {
      if (!audio.paused) {
        audio.pause();
        return;
      }
      try {
        await audio.play();
      } catch (error) {
        status.textContent = "Periksa izin akses file musik";
      }
    });

    audio.play().catch(() => {
      updateState(false);
      status.textContent = "Sentuh Putar Musik untuk mulai";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMusicPlayer, { once: true });
  } else {
    initMusicPlayer();
  }
})();
