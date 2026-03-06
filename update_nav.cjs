const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

const desktopNav = `<nav class="hidden md:flex space-x-6 lg:space-x-8 ml-auto items-center">
                    <a href="index.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium">Home</a>
                    
                    <!-- Services Dropdown -->
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
                    </div>

                    <a href="about.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium">About</a>
                    <a href="contact.html" class="nav-link text-lg text-ink hover:text-red transition-colors font-medium">Contact</a>
                </nav>`;

const mobileNav = `<nav id="mobile-menu" class="md:hidden hidden mt-4 pb-4 border-t border-gray-200">
                <div class="flex flex-col space-y-4 pt-4">
                    <a href="index.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">Home</a>
                    
                    <!-- Services Accordion -->
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
                    </div>

                    <a href="about.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">About</a>
                    <a href="contact.html" class="mobile-nav-link text-lg text-ink hover:text-red transition-colors font-medium">Contact</a>
                </div>
            </nav>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace desktop nav
    content = content.replace(/<nav class="hidden md:flex.*?ml-auto">[\s\S]*?<\/nav>/, desktopNav);

    // Replace mobile nav
    content = content.replace(/<nav id="mobile-menu"[\s\S]*?<\/nav>/, mobileNav);

    // Make the current page link active (red)
    // Only target the main nav links by looking for href="file"
    const regex = new RegExp(`href="${file}" class="([^"]*)text-ink([^"]*)"`, 'g');
    content = content.replace(regex, `href="${file}" class="$1text-red$2"`);

    // Check if it's one of the service pages, then make the "Services" button active
    const services = ["event-marketing.html", "brand-design.html", "web-development.html", "photography.html", "portraits.html", "advertising.html", "marketing.html", "events.html", "commercial.html", "lifestyle.html"];
    if (services.includes(file)) {
        content = content.replace(/<button class="nav-link text-lg text-ink/, '<button class="nav-link text-lg text-red');
    }

    fs.writeFileSync(file, content);
});

console.log('Navigation successfully updated across all pages.');
