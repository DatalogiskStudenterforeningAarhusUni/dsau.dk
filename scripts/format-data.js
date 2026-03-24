// scripts/format-data.js
import fs from "fs";

const TIMEZONE = 'Europe/Copenhagen';

// Command-line arguments: input and output filenames
const [,, inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error("Usage: node format-data.js <inputFile> <outputFile>");
  process.exit(1);
}

// Read raw Google Calendar JSON
const raw = JSON.parse(fs.readFileSync(inputFile, "utf-8"));

/**
 * Get the Copenhagen UTC offset string (e.g. "+02:00") for a given date.
 */
function copenhagenOffset(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z');
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    timeZoneName: 'shortOffset'
  }).formatToParts(d);
  const tz = parts.find(p => p.type === 'timeZoneName');
  const m = tz.value.match(/GMT([+-]?)(\d+)/);
  if (!m) return '+01:00';
  const sign = m[1] || '+';
  return `${sign}${m[2].padStart(2, '0')}:00`;
}

/**
 * Ensure a datetime string has a Copenhagen timezone offset.
 */
function ensureCopenhagenTz(dateStr) {
  if (!dateStr || !dateStr.includes('T')) return dateStr;
  if (/[+-]\d{2}:\d{2}$/.test(dateStr) || dateStr.endsWith('Z')) return dateStr;
  return dateStr + copenhagenOffset(dateStr.split('T')[0]);
}

/**
 * Convert all-day event dates to Copenhagen datetimes.
 * Google Calendar uses exclusive end dates for all-day events,
 * so end "2026-03-26" for a March 25 event means it ends before March 26.
 */
function convertAllDay(startDate, endDate) {
  const startOffset = copenhagenOffset(startDate);
  // Subtract one day from the exclusive end date
  const endExclusive = new Date(endDate + 'T00:00:00Z');
  endExclusive.setUTCDate(endExclusive.getUTCDate() - 1);
  const lastDay = endExclusive.toISOString().split('T')[0];
  const endOffset = copenhagenOffset(lastDay);
  return {
    start: `${startDate}T00:00:00${startOffset}`,
    end: `${lastDay}T23:59:59${endOffset}`,
  };
}

/**
 * Parse a description string that may contain "da:" and "en:" prefixed sections.
 * E.g. "da:Dansk beskrivelse en:English description"
 * If neither prefix is present, use the full text for both languages.
 */
function parseDescription(text) {
  if (!text) return { da: "", en: "" };
  const daMatch = text.match(/da:([\s\S]*?)(?=\s*en:|$)/i);
  const enMatch = text.match(/en:([\s\S]*?)(?=\s*da:|$)/i);
  if (!daMatch && !enMatch) return { da: text, en: text };
  return {
    da: (daMatch ? daMatch[1] : "").trim(),
    en: (enMatch ? enMatch[1] : "").trim()
  };
}

// Transform each event
const formatted = raw.items.map(event => {
  const isAllDay = !event.start.dateTime;
  const startDate = event.start.dateTime || event.start.date;
  const endDate = event.end.dateTime || event.end.date;
  const idBase = event.summary ? event.summary.toLowerCase().replace(/\s+/g, '-') : "event";
  const id = `${idBase}-${startDate.split('T')[0]}`;

  const times = isAllDay
    ? convertAllDay(startDate, endDate)
    : { start: ensureCopenhagenTz(startDate), end: ensureCopenhagenTz(endDate) };

  return {
    id,
    title: { da: event.summary, en: event.summary },
    description: parseDescription(event.description),
    start: times.start,
    end: times.end,
    location: {
      da: event.location || "TBD",
      en: event.location || "TBD"
    }
  };
});

// Save the formatted JSON
fs.writeFileSync(outputFile, JSON.stringify(formatted, null, 2));
console.log(`Formatted ${formatted.length} events to ${outputFile}`);
