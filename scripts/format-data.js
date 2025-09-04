// scripts/format-data.js
import fs from "fs";

// Command-line arguments: input and output filenames
const [,, inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error("Usage: node format-data.js <inputFile> <outputFile>");
  process.exit(1);
}

// Read raw Google Calendar JSON
const raw = JSON.parse(fs.readFileSync(inputFile, "utf-8"));

// Transform each event
const formatted = raw.items.map(event => {
  // Generate a unique ID: use summary + start date
  const startDate = event.start.dateTime || event.start.date;
  const idBase = event.summary ? event.summary.toLowerCase().replace(/\s+/g, '-') : "event";
  const id = `${idBase}-${startDate.split('T')[0]}`;

  return {
    id: id,
    title: { da: event.summary, en: event.summary },
    description: {
      da: event.description, 
      en: event.description 
    },
    start: startDate,
    end: event.end.dateTime || event.end.date,
    location: {
      da: event.location || "TBD",
      en: event.location || "TBD"
    }
  };
});

// Save the formatted JSON
fs.writeFileSync(outputFile, JSON.stringify(formatted, null, 2));
console.log(`Formatted ${formatted.length} events to ${outputFile}`);
