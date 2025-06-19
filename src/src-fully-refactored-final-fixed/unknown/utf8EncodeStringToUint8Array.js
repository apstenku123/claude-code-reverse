/**
 * Converts a JavaScript string into a Uint8Array containing its UTF-8 encoding.
 * Handles surrogate pairs for characters outside the Basic Multilingual Plane.
 *
 * @param {string} inputString - The string to encode as UTF-8.
 * @returns {Uint8Array} The UTF-8 encoded bytes of the input string.
 */
function utf8EncodeStringToUint8Array(inputString) {
  const utf8Bytes = [];
  for (let index = 0; index < inputString.length; index++) {
    const codePoint = inputString.charCodeAt(index);

    if (codePoint < 0x80) {
      // 1-byte sequence (ASCII)
      utf8Bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      // 2-byte sequence
      utf8Bytes.push(
        (codePoint >> 6) | 0xC0,
        (codePoint & 0x3F) | 0x80
      );
    } else if (
      // Check for surrogate pair (high surrogate followed by low surrogate)
      index + 1 < inputString.length &&
      (codePoint & 0xFC00) === 0xD800 &&
      (inputString.charCodeAt(index + 1) & 0xFC00) === 0xDC00
    ) {
      // Combine the surrogate pair into a single code point
      const highSurrogate = codePoint;
      const lowSurrogate = inputString.charCodeAt(++index);
      const fullCodePoint = 0x10000 + (((highSurrogate & 0x3FF) << 10) | (lowSurrogate & 0x3FF));
      // 4-byte sequence
      utf8Bytes.push(
        (fullCodePoint >> 18) | 0xF0,
        ((fullCodePoint >> 12) & 0x3F) | 0x80,
        ((fullCodePoint >> 6) & 0x3F) | 0x80,
        (fullCodePoint & 0x3F) | 0x80
      );
    } else {
      // 3-byte sequence
      utf8Bytes.push(
        (codePoint >> 12) | 0xE0,
        ((codePoint >> 6) & 0x3F) | 0x80,
        (codePoint & 0x3F) | 0x80
      );
    }
  }
  return Uint8Array.from(utf8Bytes);
}

module.exports = utf8EncodeStringToUint8Array;
