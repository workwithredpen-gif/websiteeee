const fs = require('fs');
const path = require('path');

const files = ["portraits.html", "advertising.html", "marketing.html", "events.html", "commercial.html", "lifestyle.html"];
const images = [
    "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/headq_kngwj0.jpg",
    "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/junior-min_vbmgx8.jpg",
    "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719866/oprah-min_b5vrrs.jpg",
    "assets/gomna-min.jpg",
    "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719972/afrexim-min_wua5hp.jpg",
    "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719800/expeee-min_ruu4jw.jpg"
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Capitalize assuming filename without .html
    const title = file.replace('.html', '');
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    // 1. REWRITE GALLERY LAYOUT
    let galleryBlock = `  <!-- Gallery -->
  <section class="py-16 container mx-auto px-4 sm:px-8 max-w-6xl">
    <div class="flex flex-col gap-16">`;

    images.forEach((src, idx) => {
        galleryBlock += `
      <div class="relative group w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl shadow-xl cursor-pointer lightbox-trigger">
        <img src="${src}"
          alt="${capitalizedTitle} Image ${idx + 1}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
        </div>
      </div>`;
    });

    galleryBlock += `
    </div>
  </section>`;

    // Replace everything between <!-- Gallery --> and <!-- Footer band -->
    const galleryRegex = /<!-- Gallery -->[\s\S]*?<!-- Footer band -->/;
    content = content.replace(galleryRegex, galleryBlock + '\n\n  <!-- Footer band -->');

    // 2. FIX LIGHTBOX DIV
    // The previous implementation had 'relative' at the end of the classes which overrode 'fixed'.
    const lightboxRegex = /<div id="lightbox" class="fixed inset-0 z-\[100\] bg-black\/98 hidden flex-col items-center justify-center transition-opacity duration-300 opacity-0">/;
    content = content.replace(lightboxRegex, '<div id="lightbox" class="fixed inset-0 z-999 bg-black/98 hidden flex-col items-center justify-center transition-opacity duration-300 opacity-0" style="z-index: 9999;">');

    fs.writeFileSync(file, content);
});

console.log('Successfully updated gallery layout and fixed lightbox HTML in all category pages.');
