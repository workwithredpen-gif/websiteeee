const fs = require('fs');
const content = fs.readFileSync('portraits.html', 'utf8');

const categories = [
    { file: 'corporate-shots.html', title: 'CORPORATE HEADSHOT PHOTOGRAPHY', desc: 'Professional corporate photography.' },
    { file: 'event-shoots.html', title: 'EVENT PHOTOGRAPHY', desc: 'Capturing moments from your events.' },
    { file: 'graduation.html', title: 'GRADUATION', desc: 'Celebrate your academic achievements.' },
    { file: 'product-shoot.html', title: 'LIFESTYLE PHOTOGRAPHY', desc: 'High-quality shots of your products.' }
];

const galleryRegex = /<section class=\"py-16 container mx-auto px-4\">[\s\S]*?<\/section>/;

const newGalleryHtml = `
  <section class="py-16 container mx-auto px-4">
    <div class="space-y-4">
      <!-- Row 1: 4 images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/headq_kngwj0.jpg" alt="{title} 1" class="w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          </div>
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719801/junior-min_vbmgx8.jpg" alt="{title} 2" class="w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7\"></path></svg>
          </div>
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719866/oprah-min_b5vrrs.jpg" alt="{title} 3" class="w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7\"></path></svg>
          </div>
        </div>
        <div class="relative group block h-64 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
          <img src="assets/gomna-min.jpg" alt="{title} 4" class="w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7\"></path></svg>
          </div>
        </div>
      </div>

      <!-- Row 2: 1 full-width image -->
      <div class="relative group block h-64 md:h-96 overflow-hidden rounded-xl shadow-md cursor-pointer lightbox-trigger">
        <img src="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719972/afrexim-min_wua5hp.jpg" alt="{title} Commercial" class="w-full h-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7\"></path></svg>
        </div>
      </div>
    </div>
  </section>`;

for (const cat of categories) {
    let newContent = content.replace(galleryRegex, newGalleryHtml.replace(/{title}/g, cat.title));
    newContent = newContent.replace(/<title>.*?<\/title>/g, `<title>${cat.title} Photography — RedPen Comms</title>`);
    newContent = newContent.replace(/<h1 class=\"text-4xl font-bold mb-4 uppercase\">${cat.title}</h1>`);
    newContent = newContent.replace(/<p class=\"text-lg text-gray-600 px-4\">.*?<\/p>/g, `<p class="text-lg text-gray-600 px-4">${cat.desc}</p>`);
    
    fs.writeFileSync(cat.file, newContent, 'utf8');
}
console.log('Generated the 4 new dedicated pages.');
