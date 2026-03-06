const fs = require('fs');
const path = require('path');

const dir = __dirname;

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

// Regex to match the entire desktop Services dropdown block (handles any variation)
// Matches from <!-- Services Dropdown --> to the closing </div> of the group div
const DESKTOP_REGEX = /[ \t]*<!-- Services Dropdown -->[\s\S]*?<\/div>\s*\n(\s*<\/div>)/g;

// Regex to match the entire mobile Services Accordion block
const MOBILE_REGEX = /[ \t]*<!-- Services Accordion -->[\s\S]*?<\/div>\s*\n(\s*<\/div>)/g;

const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;
let skipped = 0;

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let changed = false;

    if (content.includes('<!-- Services Dropdown -->')) {
        // Replace the entire desktop dropdown block
        // The block starts at <!-- Services Dropdown --> and ends at the closing </div></div> pair
        // We'll do a targeted replacement using indexOf/slice for reliability
        const startMarker = '<!-- Services Dropdown -->';
        const startIdx = content.indexOf(startMarker);
        if (startIdx !== -1) {
            // Find the <!-- Services Dropdown --> line start (include leading whitespace)
            let lineStart = content.lastIndexOf('\n', startIdx) + 1;

            // Now find the end: we need to find the </div> that closes the outer "relative group" div
            // The structure is: <div class="relative group"> ... </div>
            // Let's find the <div class="relative group"> that precedes the marker
            const groupDivStart = content.lastIndexOf('<div class="relative group">', startIdx);

            // Count nested divs from groupDivStart to find the matching closing </div>
            let depth = 0;
            let i = groupDivStart;
            while (i < content.length) {
                if (content.slice(i, i + 4) === '<div') {
                    depth++;
                    i += 4;
                } else if (content.slice(i, i + 6) === '</div>') {
                    depth--;
                    if (depth === 0) {
                        const endIdx = i + 6;
                        // Replace from the line start of the comment to the end of this closing div
                        content = content.slice(0, lineStart) + NEW_DESKTOP_NAV + '\n' + content.slice(endIdx);
                        changed = true;
                        break;
                    }
                    i += 6;
                } else {
                    i++;
                }
            }
        }
    }

    if (content.includes('<!-- Services Accordion -->')) {
        const startMarker = '<!-- Services Accordion -->';
        const startIdx = content.indexOf(startMarker);
        if (startIdx !== -1) {
            // Find the outer <div class="flex flex-col space-y-2"> that wraps the accordion
            const outerDivStart = content.lastIndexOf('<div class="flex flex-col space-y-2">', startIdx);

            let depth = 0;
            let i = outerDivStart;
            while (i < content.length) {
                if (content.slice(i, i + 4) === '<div') {
                    depth++;
                    i += 4;
                } else if (content.slice(i, i + 6) === '</div>') {
                    depth--;
                    if (depth === 0) {
                        const endIdx = i + 6;
                        const lineStart = content.lastIndexOf('\n', outerDivStart) + 1;
                        content = content.slice(0, lineStart) + NEW_MOBILE_NAV + '\n' + content.slice(endIdx);
                        changed = true;
                        break;
                    }
                    i += 6;
                } else {
                    i++;
                }
            }
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
        updated++;
    } else {
        console.log(`⏭️  Skipped: ${file}`);
        skipped++;
    }
}

console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
