const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const measurementId = 'G-0MJ62ZD74N';
const tagsToInject = `
    <!-- SEO Meta Tags -->
    <meta name="description" content="RedPen Comms - Imagine | Experience | Remember. We create campaigns and craft experiences that resonate. Get Seen. Get Heard. Get Known. Get Remembered.">
    <meta name="keywords" content="Communications, PR, Marketing, Branding, Event Management, Photography, RedPen Comms">
    <meta property="og:type" content="website">
    <meta property="og:title" content="RedPen Comms">
    <meta property="og:description" content="RedPen Comms - Imagine | Experience | Remember. We create campaigns and craft experiences that resonate.">
    <meta property="og:image" content="https://res.cloudinary.com/dja3u7oha/image/upload/f_auto,q_auto/v1767719799/hero-image_h8u9vj.jpg">
    <meta property="og:url" content="https://www.redpencomms.com/">
    <meta name="twitter:card" content="summary_large_image">

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-0MJ62ZD74N"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-0MJ62ZD74N');
    </script>
</head>`;

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let original = fs.readFileSync(filePath, 'utf8');

    if (!original.includes('googletagmanager')) {
        let updated = original.replace(/<\/head>/i, tagsToInject);
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log('Injected SEO & Analytics into ' + file);
    } else {
        console.log('Already injected in ' + file);
    }
});

console.log('All done.');
