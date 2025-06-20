/**
 * Encodes a URI component according to RFC 3986.
 * This function first uses JavaScript'createInteractionAccessor built-in encodeURIComponent, then further escapes
 * characters that are not escaped by encodeURIComponent but are required by RFC 3986: ! ' ( ) *
 *
 * @param {string} uriComponent - The string to be encoded as a URI component.
 * @returns {string} The encoded URI component, with additional characters escaped per RFC 3986.
 */
function encodeURIComponentRFC3986(uriComponent) {
  // Use encodeURIComponent to encode most characters
  // Then replace additional characters: ! ' ( ) *
  return encodeURIComponent(uriComponent).replace(/[!'()*]/g, (character) => {
    // Convert the character to its hexadecimal ASCII code and format as %XX
    return '%' + character.charCodeAt(0).toString(16).toUpperCase();
  });
}

module.exports = encodeURIComponentRFC3986;