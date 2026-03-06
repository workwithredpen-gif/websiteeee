const fs = require('fs');

const htmlContent = fs.readFileSync('photography.html', 'utf8');

const categories = [
    { title: 'Portraits', file: 'portraits.html', desc: 'Capturing moments and personalities.' },
    { title: 'Advertising', file: 'advertising.html', desc: 'Powerful images that sell your brand.' },
    { title: 'Marketing', file: 'marketing.html', desc: 'Visuals tailored for your marketing campaigns.' },
    { title: 'Events', file: 'events.html', desc: 'Documenting your most important moments.' },
    { title: 'Commercial', file: 'commercial.html', desc: 'Professional imagery for your business.' },
    { title: 'Lifestyle', file: 'lifestyle.html', desc: 'Authentic moments that tell your story.' },
];

const lightboxHtml = `
  <!-- Lightbox -->
  <div id="lightbox" class="fixed inset-0 z-100 bg-black/98 hidden flex-col items-center justify-center transition-opacity duration-300 opacity-0">
    <button id="lightbox-close" class="absolute top-6 right-6 text-white hover:text-red transition-colors p-2 z-110 bg-black/50 rounded-full">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <div id="lightbox-img-container" class="relative w-full h-[85vh] flex items-center justify-center overflow-auto cursor-zoom-in py-8">
        <img id="lightbox-img" src="" alt="Zoomed Graphic" class="max-w-full max-h-full object-contain transition-transform duration-300 origin-center scale-100 shadow-2xl">
    </div>
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 text-white z-110">
      <button id="zoom-in" class="bg-black/80 hover:bg-red p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all hover:scale-110" aria-label="Zoom in">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
      </button>
      <button id="zoom-out" class="bg-black/80 hover:bg-red p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all hover:scale-110" aria-label="Zoom out">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path></svg>
      </button>
    </div>
  </div>
`;

categories.forEach(cat => {
    let newContent = htmlContent;

    // Replace title
    newContent = newContent.replace(/<title>.*?<\/title>/, `<title>${cat.title} Photography — RedPen Comms</title>`);

    // Replace Hero Text
    newContent = newContent.replace(/<h1 class="text-4xl font-bold mb-4">.*?<\/h1>/, `<h1 class="text-4xl font-bold mb-4">${cat.title}</h1>`);
    newContent = newContent.replace(/<p class="text-lg text-gray-600">.*?<\/p>/s, `<p class="text-lg text-gray-600 px-4">${cat.desc}</p>`);

    // Replace Gallery Section entirely
    const galleryRegex = /<!-- Gallery -->[\s\S]*?<\/section>/;

    // Instead of links, they are div boxes with images and lightbox-trigger
    const newGallery = \`<!-- Gallery -->
  <section class="py-16 container mx-auto px-4">
    <div class="space-y-4">
      <!-- Row 1: 4 images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/headq_kngwj0.jpg"
            alt="\${cat.title} 1" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/junior-min_vbmgx8.jpg"
            alt="\${cat.title} 2" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719866/oprah-min_b5vrrs.jpg"
            alt="\${cat.title} 3" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="assets/gomna-min.jpg" alt="\${cat.title} 4" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>
      </div>

      <!-- Row 2: 1 full-width image -->
      <div class="relative group block h-64 md:h-96 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
        <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719972/afrexim-min_wua5hp.jpg"
          alt="\${cat.title} Commercial" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
      </div>

      <!-- Row 3: 4 images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719800/expeee-min_ruu4jw.jpg"
            alt="\${cat.title} Lifestyle" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>
        <!-- Placeholders for the remaining 3 slots in this row -->
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md bg-gray-200">
          <div class="w-full h-full flex items-center justify-center text-gray-400">Image TBD</div>
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md bg-gray-200">
          <div class="w-full h-full flex items-center justify-center text-gray-400">Image TBD</div>
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md bg-gray-200">
          <div class="w-full h-full flex items-center justify-center text-gray-400">Image TBD</div>
        </div>
      </div>
    </div>
  </section>\`;
    
    newContent = newContent.replace(galleryRegex, newGallery);
    
    // Append lightbox before </body>
    newContent = newContent.replace('</body>', \`\${lightboxHtml}\n</body>\`);

    fs.writeFileSync(cat.file, newContent, 'utf8');
    console.log("Created", cat.file);
});
console.log('Complete');
