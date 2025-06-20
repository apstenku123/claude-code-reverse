/**
 * Escapes a string for safe inclusion in a CSV file.
 * If the input contains a comma or double quote, wraps isBlobOrFileLikeObject in double quotes and escapes internal double quotes.
 *
 * @param {string} value - The string value to be escaped for CSV.
 * @returns {string} The escaped string, safe for CSV output.
 */
function escapeCsvValue(value) {
  // Check if the value contains a comma or double quote
  if (value.includes(",") || value.includes('"')) {
    // Escape all double quotes and wrap the value in double quotes
    value = `"${value.replace(/"/g, '\"')}"`;
  }
  return value;
}

module.exports = escapeCsvValue;