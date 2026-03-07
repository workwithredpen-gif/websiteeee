const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const NEW_MOBILE_MENU = `            <!-- Full-Screen Menu Overlay -->
            <nav id="mobile-menu"
                class="fixed inset-0 bg-red text-white z-100 flex flex-col transition-all duration-500 transform translate-y-full opacity-0 invisible overflow-y-auto">
                
                <!-- Header (Logo & Close) -->
                <div class="flex justify-between items-center px-4 py-4 md:px-8 md:py-6 sticky top-0 bg-red/95 backdrop-blur-sm z-110">
                    <a href="index.html" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-fit">
                        <img src="assets/redpencomms-logo-white.png" alt="RedPen Comms Logo" class="h-40 w-auto">
                    </a>
                    
                    <button id="mobile-menu-close"
                        class="p-2 rounded-lg hover:bg-white/10 transition-colors relative z-10 ml-auto"
                        aria-label="Close navigation menu">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Main Links (Centered) -->
                <div class="flex-1 flex flex-col justify-center items-center space-y-4 md:space-y-6 mt-4">
                    <a href="index.html" class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider hover:text-white/70 transition-colors">Home</a>
                    <a href="photography.html" class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider hover:text-white/70 transition-colors">Photography</a>
                    <a href="brand-design.html" class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider hover:text-white/70 transition-colors">Brand Design</a>
                    <a href="web-development.html" class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider hover:text-white/70 transition-colors">Web Development</a>
                    <a href="event-marketing.html" class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider hover:text-white/70 transition-colors">Event Marketing</a>
                    <a href="about.html" class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider hover:text-white/70 transition-colors">About</a>
                    <a href="contact.html" class="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider hover:text-white/70 transition-colors">Contact</a>
                </div>

                <!-- Footer (Socials & Copyright) -->
                <div class="pb-8 pt-4 container mx-auto px-4 text-center">
                    <div class="flex justify-center space-x-6 mb-4">
                        <a href="https://instagram.com" target="_blank" class="hover:text-white/70 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"></path><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" class="hover:text-white/70 transition-colors">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                        </a>
                    </div>
                    <p class="text-sm font-medium tracking-wide">All rights reserved RedPen Comms.</p>
                </div>
            </nav>`;

let updatedCount = 0;

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Find <nav id="mobile-menu"
    const startIdx = content.indexOf('<nav id="mobile-menu"');
    if (startIdx !== -1) {
        // Find the closing </nav> tag that matches this nav
        let i = startIdx;
        let depth = 0;
        let endIdx = -1;

        while (i < content.length) {
            if (content.slice(i, i + 4) === '<nav') {
                depth++;
                i += 4;
            } else if (content.slice(i, i + 6) === '</nav>') {
                depth--;
                if (depth === 0) {
                    endIdx = i + 6;
                    break;
                }
                i += 6;
            } else {
                i++;
            }
        }

        if (endIdx !== -1) {
            // Find the leading whitespace before the <nav tag to keep indentation if needed, 
            // but for simplicity we will just replace from <nav to </nav>
            const before = content.slice(0, Math.max(0, content.lastIndexOf('\n', startIdx) + 1));
            const after = content.slice(endIdx);

            content = before + NEW_MOBILE_MENU + '\n' + content.slice(endIdx);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${file}`);
            updatedCount++;
        }
    }
}

console.log(`\n🎉 Done! Full-Screen mobile menu applied to ${updatedCount} HTML files.`);
