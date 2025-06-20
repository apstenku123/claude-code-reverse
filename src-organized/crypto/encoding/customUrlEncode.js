/**
 * Encodes a string using encodeURIComponent, then applies custom replacements for certain characters.
 * Specifically, replaces: !, ', (, ), ~ with their percent-encoded forms, spaces (%20) with '+', and %00 with a null byte.
 *
 * @param {string} input - The string to encode for use in a URL component, with custom substitutions.
 * @returns {string} The encoded string with custom substitutions applied.
 */
function customUrlEncode(input) {
  // Mapping of characters and encoded sequences to their custom replacements
  const customReplacements = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",   // Replace encoded space with plus
    "%00": "\x00" // Replace encoded null byte with actual null byte
  };

  // First, encode the input using encodeURIComponent
  // Then, replace specific characters/sequences using the custom mapping
  return encodeURIComponent(input).replace(/[!'()~]|%20|%00/g, function(match) {
    return customReplacements[match];
  });
}

module.exports = customUrlEncode;
