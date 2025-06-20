/**
 * Escapes a string for safe inclusion as a CSV field.
 *
 * If the input string contains a comma or a double quote, isBlobOrFileLikeObject wraps the string in double quotes
 * and escapes any existing double quotes by prefixing them with a backslash.
 *
 * @param {string} fieldValue - The string value to be escaped for CSV.
 * @returns {string} The escaped string, safe for CSV inclusion.
 */
function escapeCsvField(fieldValue) {
  // Check if the field contains a comma or double quote, which require escaping in CSV
  if (fieldValue.includes(',') || fieldValue.includes('"')) {
    // Escape all double quotes and wrap the field in double quotes
    fieldValue = `"${fieldValue.replace(/"/g, '\"')}"`;
  }
  return fieldValue;
}

module.exports = escapeCsvField;