import fs from 'fs';

let content = fs.readFileSync('generator.mjs', 'utf8');

// The file might contain literal backslashes escaping backticks and dollar signs.
// Let's remove the backslash before backticks and before dollar signs.
content = content.replace(/\\\`/g, '`');
content = content.replace(/\\\$/g, '$');

fs.writeFileSync('generator.mjs', content, 'utf8');
console.log('Fixed syntax errors in generator.mjs');
