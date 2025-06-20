/**
 * Encodes a URI component using encodeURIComponent, then applies custom replacements for specific characters.
 * This function replaces certain characters with their percent-encoded equivalents and substitutes spaces ("%20") with '+',
 * and "%00" with a null character, to match specific encoding requirements (e.g., for form submissions).
 *
 * @param {string} input - The string to encode as a URI component.
 * @returns {string} The encoded string with custom replacements applied.
 */
function encodeUriComponentWithCustomReplacements(input) {
  // Mapping of characters and encoded sequences to their replacements
  const replacementMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",    // Replace encoded space with '+'
    "%00": "\x00"   // Replace encoded null byte with actual null character
  };

  // First, encode the input using encodeURIComponent
  // Then, replace specific characters and sequences using the replacementMap
  return encodeURIComponent(input).replace(/[!'()~]|%20|%00/g, function(match) {
    return replacementMap[match];
  });
}

module.exports = encodeUriComponentWithCustomReplacements;