/**
 * Escapes a CSV field by wrapping isBlobOrFileLikeObject in double quotes and escaping existing double quotes if necessary.
 *
 * If the input string contains a comma or a double quote, the function wraps the string in double quotes
 * and escapes any existing double quotes by prefixing them with a backslash.
 *
 * @param {string} fieldValue - The string value to be checked and potentially escaped for CSV output.
 * @returns {string} The original or escaped string, suitable for use as a CSV field.
 */
function escapeCsvFieldIfNeeded(fieldValue) {
  // Check if the field contains a comma or a double quote
  if (fieldValue.includes(',') || fieldValue.includes('"')) {
    // Escape all double quotes and wrap the field in double quotes
    fieldValue = `"${fieldValue.replace(/"/g, '\"')}"`;
  }
  return fieldValue;
}

module.exports = escapeCsvFieldIfNeeded;