const fs = require('fs');

const subpages = ["portraits", "advertising", "marketing", "events", "commercial", "lifestyle"];
const imagesInfo = [
    { name: "Portraits", url: "portraits.html", src: "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/headq_kngwj0.jpg" },
    { name: "Advertising", url: "advertising.html", src: "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/junior-min_vbmgx8.jpg" },
    { name: "Marketing", url: "marketing.html", src: "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719866/oprah-min_b5vrrs.jpg" },
    { name: "Events", url: "events.html", src: "assets/gomna-min.jpg" },
    { name: "Commercial", url: "commercial.html", src: "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719972/afrexim-min_wua5hp.jpg" },
    { name: "Lifestyle", url: "lifestyle.html", src: "https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719800/expeee-min_ruu4jw.jpg" }
];

// 1. REWRITE photography.html
let photographyHtml = fs.readFileSync('photography.html', 'utf8');

let newPhotographyGallery = `  <!-- Gallery -->
  <section class="py-16 container mx-auto px-4 sm:px-8 max-w-6xl">
    <div class="flex flex-col gap-16">`;

imagesInfo.forEach((item) => {
    newPhotographyGallery += `
      <a href="${item.url}" class="relative block group w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl shadow-xl">
        <img src="${item.src}"
          alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <h3 class="text-white text-4xl font-bold uppercase tracking-wider">${item.name}</h3>
        </div>
      </a>`;
});
newPhotographyGallery += `
    </div>
  </section>`;

photographyHtml = photographyHtml.replace(/<!-- Gallery -->[\s\S]*?<!-- Footer band -->/, newPhotographyGallery + '\n\n  <!-- Footer band -->');
fs.writeFileSync('photography.html', photographyHtml);

// 2. REWRITE SUBPAGES back to the 4-1-4 grid with Lightbox
subpages.forEach(name => {
    const filename = name + '.html';
    let content = fs.readFileSync(filename, 'utf8');
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    // Find the primary image for this subpage or just use the whole array
    // Let's create a nice 4-1-4 grid using the images we have
    let newSubpageGallery = `  <!-- Gallery -->
  <section class="py-16 container mx-auto px-4">
    <div class="space-y-4">
      <!-- Row 1: 4 images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        ${imagesInfo.slice(0, 4).map(im => `
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="${im.src}" alt="${im.name} 1" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>`).join('')}
      </div>

      <!-- Row 2: 1 full-width image -->
      <div class="relative group block h-64 md:h-96 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
        <img src="${imagesInfo[4].src}" alt="${capitalizedName} Main" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
      </div>

      <!-- Row 3: 4 images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="${imagesInfo[5].src}" alt="${capitalizedName} 2" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>
        <!-- Placeholders -->
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md bg-gray-200 cursor-pointer lightbox-trigger">
          <div class="w-full h-full flex items-center justify-center text-gray-400 font-medium">Image TBD</div>
          <img src="https://via.placeholder.com/800x600?text=Image+TBD" class="hidden">
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md bg-gray-200 cursor-pointer lightbox-trigger">
          <div class="w-full h-full flex items-center justify-center text-gray-400 font-medium">Image TBD</div>
          <img src="https://via.placeholder.com/800x600?text=Image+TBD" class="hidden">
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md bg-gray-200 cursor-pointer lightbox-trigger">
          <div class="w-full h-full flex items-center justify-center text-gray-400 font-medium">Image TBD</div>
          <img src="https://via.placeholder.com/800x600?text=Image+TBD" class="hidden">
        </div>
      </div>
    </div>
  </section>`;

    content = content.replace(/<!-- Gallery -->[\s\S]*?<!-- Footer band -->/, newSubpageGallery + '\n\n  <!-- Footer band -->');
    fs.writeFileSync(filename, content);
});

console.log('Successfully swapped layouts!');
