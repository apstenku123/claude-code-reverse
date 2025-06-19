/**
 * Encodes a string for use in a URI query component, applying custom replacements to match specific encoding requirements.
 *
 * This function first uses encodeURIComponent to encode the input string, then applies a series of replacements:
 * - Decodes %3A to ':'
 * - Decodes %24 to '$'
 * - Decodes %2C to ','
 * - Replaces %20 (space) with '+'
 * - Decodes %5B to '['
 * - Decodes %5D to ']'
 *
 * These replacements are commonly used to produce query strings compatible with certain web frameworks or APIs.
 *
 * @param {string} value - The string to encode for use in a URI query component.
 * @returns {string} The encoded string with custom replacements applied.
 */
function encodeUriQueryComponent(value) {
  // Standard URI component encoding
  const encoded = encodeURIComponent(value);
  // Apply custom replacements for specific characters
  return encoded
    .replace(/%3A/gi, ":")   // Decode colon
    .replace(/%24/g, "$")    // Decode dollar sign
    .replace(/%2C/gi, ",")  // Decode comma
    .replace(/%20/g, "+")   // Replace space with plus
    .replace(/%5B/gi, "[")  // Decode left bracket
    .replace(/%5D/gi, "]"); // Decode right bracket
}

module.exports = encodeUriQueryComponent;