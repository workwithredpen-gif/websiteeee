import fs from 'fs';
import path from 'path';

const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

for (const filepath of htmlFiles) {
    let content = fs.readFileSync(filepath, 'utf-8');

    // 1. Update font sizes in header
    const headerStart = content.indexOf('<header');
    let headerEnd = content.indexOf('</header>');
    if (headerStart !== -1 && headerEnd !== -1) {
        headerEnd += '</header>'.length;
        const headerChunk = content.substring(headerStart, headerEnd);
        const headerChunkUpdated = headerChunk.replace(/text-lg/g, 'text-base');
        content = content.substring(0, headerStart) + headerChunkUpdated + content.substring(headerEnd);
    }

    // 2. Reorder Mobile Nav First
    const startMobile = content.indexOf('<!-- Service links -->');
    const photoMobile = content.indexOf('<!-- Photography accordion -->');
    let aboutMobile = content.indexOf('<a href="about.html"', photoMobile);

    if (startMobile !== -1 && photoMobile !== -1 && aboutMobile !== -1) {
        const topLinks = content.substring(startMobile, photoMobile).trim().split('\n');
        const evLink = topLinks.find(l => l.includes('event-marketing.html')) || '';
        const brandLink = topLinks.find(l => l.includes('brand-design.html')) || '';
        const webLink = topLinks.find(l => l.includes('web-development.html')) || '';

        const photoChunk = content.substring(photoMobile, aboutMobile);

        let indent = "                    ";
        if (evLink) {
            indent = evLink.substring(0, evLink.length - evLink.trimLeft().length);
        }

        const newMobile = photoChunk +
            indent + "<!-- Service links -->\n" +
            brandLink + "\n" +
            webLink + "\n" +
            evLink + "\n" +
            indent;

        content = content.substring(0, startMobile) + newMobile + content.substring(aboutMobile);
    }

    // 3. Reorder Desktop Nav Last
    const startDesktop = content.indexOf('<!-- Top-level service links -->');
    const photoDesktop = content.indexOf('<!-- Photography Dropdown -->');
    const aboutDesktop = content.indexOf('<a href="about.html"', photoDesktop);

    if (startDesktop !== -1 && photoDesktop !== -1 && aboutDesktop !== -1) {
        const topLinks = content.substring(startDesktop, photoDesktop).trim().split('\n');
        const evLink = topLinks.find(l => l.includes('event-marketing.html')) || '';
        const brandLink = topLinks.find(l => l.includes('brand-design.html')) || '';
        const webLink = topLinks.find(l => l.includes('web-development.html')) || '';

        const photoChunk = content.substring(photoDesktop, aboutDesktop);

        let indent = "                    ";
        if (evLink) {
            indent = evLink.substring(0, evLink.length - evLink.trimLeft().length);
        }

        const newDesktop = photoChunk +
            indent + "<!-- Top-level service links -->\n" +
            brandLink + "\n" +
            webLink + "\n" +
            evLink + "\n" +
            indent;

        content = content.substring(0, startDesktop) + newDesktop + content.substring(aboutDesktop);
    }

    fs.writeFileSync(filepath, content, 'utf-8');
}

console.log('Updated DOM structure successfully!');
