const fs = require('fs');
const path = require('path');

const dir = __dirname;

// The new desktop nav block (replaces the old Services dropdown)
const OLD_DESKTOP_NAV = `                    <!-- Services Dropdown -->
                    <div class="relative group">
                        <button class="nav-link text-lg text-ink hover:text-red transition-colors font-medium flex items-center gap-1 py-4">
                            Services
                            <svg class="w-4 h-4 mt-0.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div class="absolute top-[80%] right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 flex flex-col z-100">
                            <div class="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                            <span class="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">What We Do</span>
                            <a href="event-marketing.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Event Marketing</a>
                            <a href="brand-design.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Brand Design</a>
                            <a href="web-development.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Web Development</a>
                            <div class="border-t border-gray-100 my-1"></div>
                            <span class="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Photography</span>
                            <a href="photography.html" class="block px-4 py-2 text-base text-ink font-semibold hover:bg-red hover:text-white transition-colors">View All</a>
                            <a href="portraits.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Portraits</a>
                            <a href="advertising.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Advertising</a>
                            <a href="marketing.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Marketing</a>
                            <a href="events.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Events</a>
                            <a href="commercial.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Commercial</a>
                            <a href="lifestyle.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Lifestyle</a>
                        </div>
                    </div>`;

const NEW_DESKTOP_NAV = `                    <!-- Top-level service links -->
                    <a href="event-marketing.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium">Event Marketing</a>
                    <a href="brand-design.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium">Brand Design</a>
                    <a href="web-development.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium">Web Development</a>
                    <!-- Photography Dropdown -->
                    <div class="relative group">
                        <a href="photography.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium flex items-center gap-1 py-4">
                            Photography
                            <svg class="w-4 h-4 mt-0.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </a>
                        <div class="absolute top-[80%] right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 flex flex-col z-100">
                            <div class="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                            <a href="photography.html" class="block px-4 py-2 text-base text-ink font-semibold hover:bg-red hover:text-white transition-colors">View All</a>
                            <a href="portraits.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Portraits</a>
                            <a href="advertising.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Advertising</a>
                            <a href="marketing.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Marketing</a>
                            <a href="events.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Events</a>
                            <a href="commercial.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Commercial</a>
                            <a href="lifestyle.html" class="block px-4 py-2 text-base text-ink hover:bg-red hover:text-white transition-colors">Lifestyle</a>
                        </div>
                    </div>`;

// Old mobile nav block
const OLD_MOBILE_NAV = `                    <!-- Services Accordion -->
                    <div class="flex flex-col space-y-2">
                        <span class="text-ink font-medium text-lg">Services</span>
                        <div class="pl-4 border-l-2 border-red/20 flex flex-col space-y-2 mt-2">
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">What We Do</span>
                            <a href="event-marketing.html" class="text-ink hover:text-red transition-colors">Event Marketing</a>
                            <a href="brand-design.html" class="text-ink hover:text-red transition-colors">Brand Design</a>
                            <a href="web-development.html" class="text-ink hover:text-red transition-colors">Web Development</a>
                            
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">Photography</span>
                            <a href="photography.html" class="text-ink hover:text-red transition-colors font-medium">View All</a>
                            <a href="portraits.html" class="text-ink hover:text-red transition-colors">Portraits</a>
                            <a href="advertising.html" class="text-ink hover:text-red transition-colors">Advertising</a>
                            <a href="marketing.html" class="text-ink hover:text-red transition-colors">Marketing</a>
                            <a href="events.html" class="text-ink hover:text-red transition-colors">Events</a>
                            <a href="commercial.html" class="text-ink hover:text-red transition-colors">Commercial</a>
                            <a href="lifestyle.html" class="text-ink hover:text-red transition-colors">Lifestyle</a>
                        </div>
                    </div>`;

const NEW_MOBILE_NAV = `                    <!-- Service links -->
                    <a href="event-marketing.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">Event Marketing</a>
                    <a href="brand-design.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">Brand Design</a>
                    <a href="web-development.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">Web Development</a>
                    <!-- Photography accordion -->
                    <div class="flex flex-col space-y-2">
                        <span class="text-ink font-medium text-lg">Photography</span>
                        <div class="pl-4 border-l-2 border-red/20 flex flex-col space-y-2 mt-2">
                            <a href="photography.html" class="text-ink hover:text-red transition-colors font-medium">View All</a>
                            <a href="portraits.html" class="text-ink hover:text-red transition-colors">Portraits</a>
                            <a href="advertising.html" class="text-ink hover:text-red transition-colors">Advertising</a>
                            <a href="marketing.html" class="text-ink hover:text-red transition-colors">Marketing</a>
                            <a href="events.html" class="text-ink hover:text-red transition-colors">Events</a>
                            <a href="commercial.html" class="text-ink hover:text-red transition-colors">Commercial</a>
                            <a href="lifestyle.html" class="text-ink hover:text-red transition-colors">Lifestyle</a>
                        </div>
                    </div>`;

const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;
let skipped = 0;

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let changed = false;

    if (content.includes('<!-- Services Dropdown -->')) {
        content = content.replace(OLD_DESKTOP_NAV, NEW_DESKTOP_NAV);
        changed = true;
    }

    if (content.includes('<!-- Services Accordion -->')) {
        content = content.replace(OLD_MOBILE_NAV, NEW_MOBILE_NAV);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
        updated++;
    } else {
        console.log(`⏭️  Skipped (no match): ${file}`);
        skipped++;
    }
}

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
