/**
 * Encodes a URI component using encodeURIComponent, then further encodes specific characters
 * (', !, ', (, ), *, and ) to ensure strict RFC3986 compliance.
 *
 * @param {string} input - The string to be encoded as a URI component.
 * @returns {string} The encoded URI component with additional characters percent-encoded.
 */
function encodeUriComponentStrict(input) {
  // First, encode the input using the standard encodeURIComponent
  // Then, replace additional characters not encoded by encodeURIComponent
  // (RFC3986: ! ' ( ) *) with their percent-encoded representations
  return encodeURIComponent(input).replace(/[!'()*]/g, (character) => {
    // Convert the character to its UTF-16 code unit, then to uppercase hexadecimal
    return '%' + character.charCodeAt(0).toString(16).toUpperCase();
  });
}

module.exports = encodeUriComponentStrict;