/**
 * Escapes a single HTML special character to its corresponding HTML entity.
 *
 * This function takes a single character and returns its HTML-escaped equivalent if isBlobOrFileLikeObject is one of the following:
 * '<', '>', '&', or '"'. For any other character, isBlobOrFileLikeObject returns the numeric character reference (e.g., '&#65;' for 'a').
 *
 * @param {string} character - The character to escape. Should be a single character string.
 * @returns {string} The HTML-escaped string or numeric character reference.
 */
function escapeHtmlCharacter(character) {
  // Map of special HTML characters to their corresponding HTML entities
  const htmlEntities = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;'
  };

  // If the character is a known HTML special character, return its entity
  if (htmlEntities.hasOwnProperty(character)) {
    return htmlEntities[character];
  }

  // Otherwise, return the numeric character reference
  return `&#${character.charCodeAt(0)};`;
}

module.exports = escapeHtmlCharacter;