/**
 * SM-UPGRADE — Fix Blog Footer Navigation & Portfolio Icon
 *
 * 1. Standardizes footer nav to: Projects, Stack, Blog, About, Contact
 * 2. Fixes Portfolio globe icon to link to /projects.html
 *
 * Usage: node scripts/fix-blog-footer.js
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');

function fixFooterNav(html) {
  const oldNav = `<li><a href="/contact.html" class="footer__link">Contact</a></li>
          </ul>`;
  const newNav = `<li><a href="/about.html" class="footer__link">About</a></li>
            <li><a href="/contact.html" class="footer__link">Contact</a></li>
          </ul>`;
  return html.replace(oldNav, newNav);
}

function fixPortfolioIcon(html) {
  return html.replace(
    '<a href="/" class="nav__social-icon" aria-label="Portfolio">',
    '<a href="/projects.html" class="nav__social-icon" aria-label="Portfolio">'
  );
}

const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });
const dirs = entries.filter(e => e.isDirectory() || (e.isFile() && e.name === 'index.html'));

// Process all blog post directories + index
let fixed = 0;
let skipped = [];

// Process blog/index.html
const indexPath = path.join(BLOG_DIR, 'index.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf-8');
  const before = html;
  html = fixFooterNav(html);
  html = fixPortfolioIcon(html);
  if (html !== before) {
    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log('  ✓ blog/index.html');
    fixed++;
  }
}

// Process all post directories
for (const dir of dirs) {
  if (!dir.isDirectory()) continue;
  const filePath = path.join(BLOG_DIR, dir.name, 'index.html');
  if (!fs.existsSync(filePath)) {
    skipped.push(dir.name);
    continue;
  }
  try {
    let html = fs.readFileSync(filePath, 'utf-8');
    const before = html;
    html = fixFooterNav(html);
    html = fixPortfolioIcon(html);
    if (html !== before) {
      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`  ✓ ${dir.name}`);
      fixed++;
    }
  } catch (err) {
    console.log(`  ✗ ${dir.name} — ${err.message}`);
  }
}

console.log(`\nFixed: ${fixed} files`);
if (skipped.length) console.log('Skipped:', skipped.join(', '));
