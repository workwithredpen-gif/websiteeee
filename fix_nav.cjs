const fs = require('fs');
const path = require('path');

const dir = __dirname;

// These are the gallery sub-pages (simple nav, no mobile menu originally)
// We need to fix them by inserting the missing About/Contact + closing tags + mobile nav after the Photography dropdown
const FILES_TO_FIX = [
    'advertising.html',
    'brand-design.html',
    'commercial.html',
    'event-marketing.html',
    'events.html',
    'lifestyle.html',
    'marketing.html',
    'photography.html',
    'portraits.html',
    'web-development.html'
];

// The Photography dropdown ends with:
//     </div>       <- closes the dropdown panel
//   </div>         <- closes the relative group div
// Then a blank line, then </header>
// We need to insert About + Contact links, close the nav, add mobile button and mobile nav, then close the container div

const MISSING_DESKTOP_TAIL = `
                    <a href="about.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium">About</a>
                    <a href="contact.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium">Contact</a>
                </nav>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-button"
                    class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative z-10 ml-auto"
                    aria-label="Toggle navigation menu" aria-controls="mobile-menu" aria-expanded="false">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Navigation -->
            <nav id="mobile-menu" class="md:hidden hidden mt-4 pb-4 border-t border-gray-200">
                <div class="flex flex-col space-y-4 pt-4">
                    <a href="index.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">Home</a>
                    <!-- Service links -->
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
                    </div>

                    <a href="about.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">About</a>
                    <a href="contact.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">Contact</a>
                </div>
            </nav>
        </div>
    </header>`;

let fixed = 0;

for (const file of FILES_TO_FIX) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`⏭️  Not found: ${file}`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Check if it already has mobile-menu (already fixed)
    if (content.includes('id="mobile-menu"') || content.includes('mobile-menu-button')) {
        console.log(`✅ Already has mobile nav: ${file}`);
        continue;
    }

    // Check if nav is present but missing About/Contact (broken by previous script)
    if (content.includes('<!-- Photography Dropdown -->') && !content.includes('"about.html" class="nav-link')) {
        // Find the point where the Photography dropdown's closing </div></div> is followed by </header>
        // Pattern: the outer </div> of "relative group" div followed by whitespace and </header>
        const marker = '</header>';
        const headerIdx = content.indexOf(marker);
        if (headerIdx === -1) {
            console.log(`❌ No </header> found in: ${file}`);
            continue;
        }

        // Insert the tail just before </header>
        // But we need to find the right position: after the Photography dropdown's closing </div>
        // Look backwards from </header> for the Photography dropdown end
        const photographyDropdownEnd = content.lastIndexOf('</div>', headerIdx - 1);

        // Now find what comes right before </header> - remove the stray whitespace/newlines
        content = content.slice(0, photographyDropdownEnd + 6) + '\n' + MISSING_DESKTOP_TAIL + content.slice(headerIdx + marker.length);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`🔧 Fixed: ${file}`);
        fixed++;
    } else {
        console.log(`⏭️  Skipped (no issue found): ${file}`);
    }
}

console.log(`\nFixed: ${fixed}`);
