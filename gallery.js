/*
 * RENDERER GALERI FOTO & VIDEO.
 * Konten diedit melalui gallery-data.js. File ini mengatur tampilan.
 */
(() => {
  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

  const youtubeEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);
      let id = "";
      if (parsed.hostname.includes("youtu.be")) {
        id = parsed.pathname.split("/").filter(Boolean)[0] || "";
      } else if (parsed.hostname.includes("youtube.com")) {
        id = parsed.searchParams.get("v") || "";
        if (!id && parsed.pathname.includes("/embed/")) {
          id = parsed.pathname.split("/embed/")[1].split("/")[0];
        }
      }
      return /^[\w-]{6,}$/.test(id)
        ? "https://www.youtube-nocookie.com/embed/" + id
        : "";
    } catch (_) {
      return "";
    }
  };

  const mediaMarkup = (item, title) => {
    const src = String(item.src || "").trim();
    const poster = escapeHTML(item.poster || "assets/portrait-academic.jpg");

    if (item.type === "video") {
      const youtube = src ? youtubeEmbedUrl(src) : "";
      if (youtube) {
        return `<iframe src="${youtube}" title="${title}" loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>`;
      }

      if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) {
        const type = /\.webm(\?.*)?$/i.test(src)
          ? "video/webm"
          : (/\.ogg(\?.*)?$/i.test(src) ? "video/ogg" : "video/mp4");
        return `<video controls preload="metadata" poster="${poster}">
          <source src="${escapeHTML(src)}" type="${type}">
          Browser Anda tidak mendukung pemutaran video.
        </video>`;
      }

      return `<div class="gallery-placeholder">
        <span class="gallery-play-icon" aria-hidden="true">▶</span>
        <strong>Video siap ditambahkan</strong>
        <span>Isi src di gallery-data.js dengan URL YouTube atau path file MP4.</span>
      </div>`;
    }

    if (!src) {
      return `<div class="gallery-placeholder">
        <strong>Foto belum ditambahkan</strong>
        <span>Isi src foto di gallery-data.js.</span>
      </div>`;
    }

    const alt = escapeHTML(item.alt || item.title || "Foto dokumentasi");
    return `<a class="gallery-image-link" href="${escapeHTML(src)}" target="_blank" rel="noopener"
      aria-label="Buka foto ${title}">
      <img src="${escapeHTML(src)}" alt="${alt}" loading="lazy">
    </a>`;
  };

  const renderItem = (item) => {
    const title = escapeHTML(item.title || "Dokumentasi");
    const category = escapeHTML(item.category || (item.type === "video" ? "Video" : "Foto"));
    const description = escapeHTML(item.description || "");
    return `<article class="gallery-card">
      <div class="gallery-card-inner">
        <div class="gallery-media">${mediaMarkup(item, title)}</div>
        <div class="gallery-copy">
          <span class="gallery-category">${category}</span>
          <h3>${title}</h3>
          ${description ? `<p>${description}</p>` : ""}
        </div>
      </div>
    </article>`;
  };

  const addStylesheet = () => {
    if (document.querySelector('link[data-gallery-styles]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "gallery.css";
    link.dataset.galleryStyles = "true";
    document.head.appendChild(link);
  };

  const addNavigationLink = () => {
    const nav = document.querySelector(".main-nav");
    if (!nav || nav.querySelector('a[href="#galeri"]')) return;
    const link = document.createElement("a");
    link.href = "#galeri";
    link.textContent = "Galeri";
    const contact = nav.querySelector('a[href="#kontak"]');
    nav.insertBefore(link, contact || null);
  };

  const addGallerySection = () => {
    if (document.getElementById("galeri")) return;
    const contact = document.getElementById("kontak");
    if (!contact) return;

    const section = document.createElement("section");
    section.className = "gallery-section section-pad watermark-section";
    section.id = "galeri";
    section.innerHTML = `
      <div class="container">
        <div class="section-topline">
          <div>
            <div class="eyebrow"><span class="eyebrow-line"></span> GALERI DOKUMENTASI</div>
            <h2>Potret pelayanan<br><em>dan perjalanan pengabdian.</em></h2>
          </div>
          <p>Dokumentasi foto dan video perjalanan pelayanan. Galeri ini dapat diperbarui kapan saja melalui file data galeri.</p>
        </div>
        <div class="gallery-note">
          <span class="gallery-note-mark">✦</span>
          <span>Foto ditampilkan dalam bingkai emas. Foto dan video baru dapat ditambahkan tanpa mengubah susunan halaman.</span>
        </div>
        <div class="gallery-grid" id="gallery-grid" aria-live="polite"></div>
      </div>`;
    contact.parentNode.insertBefore(section, contact);
  };

  document.addEventListener("DOMContentLoaded", () => {
    addStylesheet();
    addNavigationLink();
    addGallerySection();

    const grid = document.getElementById("gallery-grid");
    if (!grid) return;
    const items = Array.isArray(window.GALLERY_ITEMS) ? window.GALLERY_ITEMS : [];
    grid.innerHTML = items.length
      ? items.map(renderItem).join("")
      : '<div class="gallery-empty">Galeri belum memiliki dokumentasi. Tambahkan item melalui gallery-data.js.</div>';
  });
})();
