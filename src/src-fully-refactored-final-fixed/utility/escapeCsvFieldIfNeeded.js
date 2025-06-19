/**
 * Escapes a CSV field by wrapping isBlobOrFileLikeObject in double quotes if isBlobOrFileLikeObject contains a comma or double quote.
 * Also escapes any existing double quotes within the field.
 *
 * @param {string} fieldValue - The string value to be checked and escaped for CSV formatting.
 * @returns {string} The possibly escaped CSV field value.
 */
function escapeCsvFieldIfNeeded(fieldValue) {
  // Check if the field contains a comma or double quote, which require escaping in CSV
  const containsComma = fieldValue.includes(",");
  const containsDoubleQuote = fieldValue.includes('"');

  if (containsComma || containsDoubleQuote) {
    // Escape all double quotes by replacing them with \"
    const escapedValue = fieldValue.replace(/"/g, '\\"');
    // Wrap the field in double quotes
    return `"${escapedValue}"`;
  }

  // Return the original value if no escaping is needed
  return fieldValue;
}

module.exports = escapeCsvFieldIfNeeded;
