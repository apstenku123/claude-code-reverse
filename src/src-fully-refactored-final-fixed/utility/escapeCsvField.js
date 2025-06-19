/**
 * Escapes a string for safe inclusion in a CSV field.
 * If the input contains a comma or double quote, the string is wrapped in double quotes,
 * and all internal double quotes are escaped with a backslash.
 *
 * @param {string} fieldValue - The string value to be escaped for CSV.
 * @returns {string} The escaped string, safe for CSV output.
 */
function escapeCsvField(fieldValue) {
  // Check if the field contains a comma or double quote, which require escaping in CSV
  if (fieldValue.includes(',') || fieldValue.includes('"')) {
    // Escape all double quotes with a backslash and wrap the field in double quotes
    fieldValue = `"${fieldValue.replace(/"/g, '\"')}"`;
  }
  return fieldValue;
}

module.exports = escapeCsvField;