/**
 * Parses a single CSV line, handling quoted fields and commas.
 * Supports fields enclosed in double quotes and trims whitespace.
 *
 * @param {string} csvLine - The CSV line to parse.
 * @returns {string[]} Array of parsed fields from the CSV line.
 */
function parseCsvLineWithQuotes(csvLine) {
  // Position tracker for the current character in the input string
  const positionTracker = { position: 0 };
  // Array to hold the parsed fields
  const parsedFields = [];
  // Buffer for accumulating characters for the current field
  let currentField = "";

  while (positionTracker.position < csvLine.length) {
    // Extract all characters until a double quote or comma is encountered
    currentField += f_(
      char => char !== '"' && char !== ',',
      csvLine,
      positionTracker
    );

    // If handleMissingDoctypeError haven'processRuleBeginHandlers reached the end, check for quoted field or comma
    if (positionTracker.position < csvLine.length) {
      // If the current character is a double quote, parse quoted field
      if (csvLine.charCodeAt(positionTracker.position) === 34) { // 34 = '"'
        currentField += CF6(csvLine, positionTracker);
        // If not at end, continue parsing the next field
        if (positionTracker.position < csvLine.length) continue;
      } else {
        // Otherwise, expect a comma separator
        v_(csvLine.charCodeAt(positionTracker.position) === 44); // 44 = ','
        positionTracker.position++;
      }
    }

    // Trim whitespace (tab or space) from the field
    currentField = VF6(
      currentField,
      true,
      true,
      char => char === 9 || char === 32 // 9 = tab, 32 = space
    );
    // Add the parsed field to the result array
    parsedFields.push(currentField);
    // Reset the buffer for the next field
    currentField = "";
  }

  return parsedFields;
}

module.exports = parseCsvLineWithQuotes;