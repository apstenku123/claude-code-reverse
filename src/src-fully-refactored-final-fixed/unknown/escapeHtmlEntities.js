/**
 * Escapes specific HTML entities in the provided string.
 *
 * This function replaces the following characters with their corresponding HTML entities:
 * - & → &amp;
 * - < → &lt;
 * - > → &gt;
 * - \u00A0 (non-breaking space) → &nbsp;
 *
 * @param {string} inputString - The string in which to escape HTML entities.
 * @returns {string} The escaped string with HTML entities replaced.
 */
function escapeHtmlEntities(inputString) {
  // Regular expression to match characters that need to be escaped
  const htmlEntityRegex = /[&<>\u00A0]/g;

  // If the string does not contain any escapable characters, return as is
  if (!htmlEntityRegex.test(inputString)) {
    return inputString;
  }

  // Replace each matched character with its corresponding HTML entity
  return inputString.replace(htmlEntityRegex, (matchedChar) => {
    switch (matchedChar) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '\u00A0':
      case ' ': // Handles both literal and unicode non-breaking space
        return '&nbsp;';
      default:
        return matchedChar; // Fallback, should not occur
    }
  });
}

module.exports = escapeHtmlEntities;