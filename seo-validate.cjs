/**
 * TiffinWale - Comprehensive Deep SEO & Technical Audit Test Suite
 * Validates XML Sitemaps, Robots, HTML Meta, OpenGraph, Twitter, Headings,
 * JSON-LD Schemas, Image/SVG Accessibility, Internal Link Integrity,
 * Schema @id Anchor Resolution, and Dynamic Routing/Canonical Logic.
 */

const fs = require('fs');
const path = require('path');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
  }
}

console.log('====================================================');
console.log(' RUNNING TIFFINWALE DEEP SEO AUDIT SUITE');
console.log('====================================================\n');

// 1. Robots.txt Validation
console.log('--- 1. Checking robots.txt ---');
assert(fs.existsSync('robots.txt'), 'robots.txt exists');
const robotsContent = fs.readFileSync('robots.txt', 'utf8');
assert(robotsContent.includes('Sitemap: https://akhairkar.github.io/tiffinservice/sitemap.xml'), 'robots.txt references sitemap.xml');
assert(robotsContent.includes('User-agent: *'), 'robots.txt allows search crawlers');

// 2. Sitemap.xml Validation
console.log('\n--- 2. Checking sitemap.xml ---');
assert(fs.existsSync('sitemap.xml'), 'sitemap.xml exists');
const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
const locMatches = Array.from(sitemapContent.matchAll(/<loc>(.*?)<\/loc>/gi)).map(m => m[1]);
assert(locMatches.length === 14, `sitemap.xml contains exactly 14 URLs (found: ${locMatches.length})`);
assert(locMatches.includes('https://akhairkar.github.io/tiffinservice/'), 'sitemap includes root URL');
assert(locMatches.includes('https://akhairkar.github.io/tiffinservice/city.html'), 'sitemap includes city.html');

const CITIES = ['mumbai','pune','delhi','bengaluru','nagpur','ahmedabad','hyderabad','chennai','kolkata','jaipur','surat','indore'];
let allCitiesInSitemap = true;
for (const c of CITIES) {
  if (!locMatches.includes(`https://akhairkar.github.io/tiffinservice/tiffin-service-${c}.html`)) {
    allCitiesInSitemap = false;
  }
}
assert(allCitiesInSitemap, 'All 12 city landing pages are present in sitemap.xml');

const lastmods = Array.from(sitemapContent.matchAll(/<lastmod>(.*?)<\/lastmod>/gi)).map(m => m[1]);
const allToday = lastmods.every(date => date === '2026-09-07');
assert(allToday, 'All sitemap lastmod dates are updated to 2026-09-07');

// 3. Static Assets Validation
console.log('\n--- 3. Checking Static Assets (Icons & Preview Images) ---');
assert(fs.existsSync('favicon.svg'), 'favicon.svg exists in repository');
assert(fs.existsSync('city_preview.png'), 'city_preview.png exists in repository');

// 4. HTML Pages Validation
console.log('\n--- 4. Checking HTML Files (Meta, OpenGraph, Twitter, JSON-LD, Headings) ---');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const allFileIds = new Map();
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const ids = new Set(Array.from(content.matchAll(/\sid=["']([^"']+)["']/gi)).map(m => m[1]));
  allFileIds.set(file, ids);
}

for (const file of htmlFiles) {
  console.log(`\nEvaluating: ${file}`);
  const content = fs.readFileSync(file, 'utf8');

  // Favicon check
  assert(/<link\s+rel=["']icon["'][^>]*href=["']favicon\.svg["']/i.test(content), `${file} has SVG favicon declared`);

  // Title check
  const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
  assert(!!titleMatch && titleMatch[1].trim().length > 0, `${file} has a title tag`);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Meta description
  const descMatch = content.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    content.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  assert(!!descMatch && descMatch[1].trim().length > 0, `${file} has a meta description`);
  const desc = descMatch ? descMatch[1].trim() : '';

  // Author & Geo
  assert(/<meta\s+name=["']author["']/i.test(content), `${file} has author meta tag`);
  assert(/<meta\s+name=["']geo\.region["']/i.test(content), `${file} has geo.region meta tag`);
  assert(/<meta\s+name=["']geo\.placename["']/i.test(content), `${file} has geo.placename meta tag`);

  // OpenGraph
  assert(/<meta\s+property=["']og:image["']/i.test(content), `${file} has og:image meta tag`);

  // Standard Twitter tags (name="twitter:...")
  assert(/<meta\s+name=["']twitter:card["']/i.test(content), `${file} has standard name="twitter:card" meta tag`);
  assert(/<meta\s+name=["']twitter:image["']/i.test(content), `${file} has standard name="twitter:image" meta tag`);

  // Canonical tag
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["'][^>]*href=["'](.*?)["']/i);
  assert(!!canonicalMatch && canonicalMatch[1].startsWith('https://akhairkar.github.io/tiffinservice/'), `${file} has proper canonical tag`);

  // Footer copyright check
  assert(content.includes('&copy; 2026 TiffinWale'), `${file} copyright year is 2026`);

  // City pages specific assertions
  if (file.startsWith('tiffin-service-')) {
    assert(title.length >= 50 && title.length <= 65, `${file} title is optimal length (${title.length} chars)`);
    assert(desc.length >= 140 && desc.length <= 165, `${file} description is optimal length (${desc.length} chars)`);
    assert(desc.toLowerCase().includes('monthly tiffin service') || desc.toLowerCase().includes('ghar ka khana'), `${file} description contains high-intent target keywords`);
  }

  // Heading hierarchy
  const headingMatches = Array.from(content.matchAll(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/gi));
  let h1Count = 0;
  let prevLevel = 0;
  let hierarchyOk = true;

  for (const hm of headingMatches) {
    const lvl = parseInt(hm[1][1]);
    if (lvl === 1) h1Count++;
    if (lvl > prevLevel + 1 && prevLevel !== 0) {
      hierarchyOk = false;
    }
    prevLevel = lvl;
  }
  assert(h1Count === 1, `${file} has exactly 1 H1 tag`);
  assert(hierarchyOk, `${file} heading hierarchy has no skipped levels`);

  // JSON-LD structured data validation
  const jsonMatches = Array.from(content.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi));
  assert(jsonMatches.length > 0, `${file} contains JSON-LD structured data`);
  for (const jm of jsonMatches) {
    let validJson = false;
    let parsed = null;
    try {
      parsed = JSON.parse(jm[1]);
      validJson = true;
    } catch (e) {
      validJson = false;
    }
    assert(validJson, `${file} JSON-LD script parses as valid JSON`);

    if (parsed) {
      const graph = parsed['@graph'] || [parsed];

      // Verify schema @id references resolve to elements in this page if fragment is used
      for (const item of graph) {
        if (item['@id'] && item['@id'].includes('#')) {
          const fragment = item['@id'].split('#')[1];
          if (fragment) {
            assert(allFileIds.get(file).has(fragment), `${file} JSON-LD @id fragment #${fragment} exists in HTML DOM`);
          }
        }
      }

      // Check organization logo if present
      const org = graph.find(item => item['@type'] === 'Organization');
      if (org && org.logo) {
        const logoPath = org.logo.replace('https://akhairkar.github.io/tiffinservice/', '');
        assert(fs.existsSync(logoPath), `${file} Organization logo file (${logoPath}) exists on disk`);
      }

      if (file.startsWith('tiffin-service-')) {
        const hasBreadcrumbs = graph.some(item => item['@type'] === 'BreadcrumbList');
        const hasCollection = graph.some(item => item['@type'] === 'CollectionPage');
        const lb = graph.find(item => item['@type'] === 'LocalBusiness');
        const faq = graph.find(item => item['@type'] === 'FAQPage');

        assert(hasBreadcrumbs, `${file} JSON-LD includes BreadcrumbList`);
        assert(hasCollection, `${file} JSON-LD includes CollectionPage`);
        assert(!!lb, `${file} JSON-LD includes LocalBusiness`);
        assert(!!faq, `${file} JSON-LD includes FAQPage`);

        if (lb) {
          assert(!!lb.priceRange, `${file} LocalBusiness includes priceRange`);
          assert(!!lb.servesCuisine, `${file} LocalBusiness includes servesCuisine`);
          assert(!!lb.openingHoursSpecification || !!lb.openingHours, `${file} LocalBusiness includes openingHours`);
        }

        if (faq) {
          assert(Array.isArray(faq.mainEntity) && faq.mainEntity.length >= 4, `${file} FAQPage includes at least 4 questions & answers`);
        }
      }
    }
  }

  // Accessibility checks
  const imgMatches = Array.from(content.matchAll(/<img([^>]*)>/gi));
  const allImgsHaveAlt = imgMatches.every(m => /alt=["'][^"']*["']/i.test(m[1]));
  assert(allImgsHaveAlt, `${file} all img tags have alt attributes`);

  const svgMatches = Array.from(content.matchAll(/<svg([^>]*)>([\s\S]*?)<\/svg>/gi));
  const allSvgsAccessible = svgMatches.every(m => {
    const attrs = m[1];
    const body = m[2];
    return /aria-label=["'][^"']+["']/i.test(attrs) ||
           /aria-hidden=["']true["']/i.test(attrs) ||
           /aria-labelledby=["'][^"']+["']/i.test(attrs) ||
           /<title[^>]*>[^<]+<\/title>/i.test(body);
  });
  assert(allSvgsAccessible, `${file} all svg tags have accessibility attributes`);

  // Internal Link Checks
  const linkMatches = Array.from(content.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi));
  let fileLinksValid = true;
  for (const lm of linkMatches) {
    const href = lm[1].trim();
    if (href.startsWith('javascript:') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('https://wa.me')) {
      continue;
    }

    if (href.startsWith('#')) {
      const anchor = href.slice(1);
      if (anchor && !allFileIds.get(file).has(anchor)) {
        fileLinksValid = false;
        console.error(`    Broken anchor #${anchor} in ${file}`);
      }
      continue;
    }

    let local = href;
    const baseDomain = 'https://akhairkar.github.io/tiffinservice/';
    if (href.startsWith(baseDomain)) {
      local = href.replace(baseDomain, '');
    }

    if (!local.startsWith('http://') && !local.startsWith('https://') && !local.startsWith('//')) {
      const [targetFilePath, hash] = local.split('#');
      const targetFile = targetFilePath || file;
      if (!fs.existsSync(targetFile)) {
        fileLinksValid = false;
        console.error(`    Target file does not exist: ${targetFile}`);
      } else if (hash) {
        if (!allFileIds.get(targetFile) || !allFileIds.get(targetFile).has(hash)) {
          fileLinksValid = false;
          console.error(`    Target anchor #${hash} not found in ${targetFile}`);
        }
      }
    }
  }
  assert(fileLinksValid, `${file} all internal links and anchors are 100% valid`);
}

// 5. JavaScript Logic & Canonical Integrity
console.log('\n--- 5. Checking Dynamic JS Routing & Canonical Integrity ---');
const cityJsContent = fs.readFileSync(path.join('js', 'city.js'), 'utf8');
assert(cityJsContent.includes('hasCityParam'), 'city.js tracks URL city parameter existence');
assert(cityJsContent.includes("if (!this.hasCityParam)"), 'city.js guards against canonical hijacking on base city.html');
assert(cityJsContent.includes("'https://akhairkar.github.io/tiffinservice/city.html'"), 'city.js preserves canonical city.html when no param given');

console.log('\n====================================================');
console.log(` AUDIT COMPLETE: ${passedTests} passed, ${failedTests} failed, ${totalTests} total tests`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
