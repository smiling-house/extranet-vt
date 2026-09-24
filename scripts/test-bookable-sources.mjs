// src/Util/bookingMode.js + src/Util/instantBook.js — node scripts/test-bookable-sources.mjs
//
// Which sources the extranet tells a partner can actually take a booking.
//
// SiteMinder ('SM') was missing from both lists. Both hubs now quote, book and
// cancel a SiteMinder room (services/siteConnectQuote.js, siteConnectBooking.js,
// and the SM branches in controllers/guestBooking.js), so a hotel looking at its
// own rooms here was being told they are enquiry-only — about rooms the website
// was already selling.
//
// The two files each keep their own copy of the list, so both are read: a fix in
// one and not the other is exactly the drift this checks for. Read as text
// rather than imported, because these modules are part of a CRA bundle.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (rel) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8');

for (const rel of ['../src/Util/bookingMode.js', '../src/Util/instantBook.js']) {
  const src = read(rel);
  const m = src.match(/const BOOKABLE_SOURCES = \[([^\]]*)\]/);
  assert.ok(m, `${rel}: no BOOKABLE_SOURCES`);
  const list = m[1].split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean);
  for (const s of ['G', 'RU', 'BP', 'HW', 'SM']) {
    assert.ok(list.includes(s), `${rel}: ${s} must be bookable`);
  }
  assert.ok(
    /if \(id\.startsWith\('SM-'\)\) return 'SM'/.test(src),
    `${rel}: detectSource does not recognise an SM- listing id`,
  );
}

console.log('bookable sources OK (G, RU, BP, HW, SM in both helpers)');
