/**
 * Decodes a UTF-8 encoded byte array into a JavaScript string.
 *
 * Handles standard UTF-8 encoding, including multi-byte characters.
 *
 * @param {number[]} byteArray - An array of numbers representing UTF-8 encoded bytes.
 * @returns {string} The decoded string.
 */
function utf8ByteArrayToString(byteArray) {
  let decodedString = "";
  for (let index = 0; index < byteArray.length; index++) {
    const byte = byteArray[index];

    // 1-byte character (ASCII)
    if (byte < 128) {
      decodedString += String.fromCharCode(byte);
    }
    // 2-byte character
    else if (byte >= 192 && byte < 224) {
      const nextByte = byteArray[++index];
      decodedString += String.fromCharCode(((byte & 31) << 6) | (nextByte & 63));
    }
    // 4-byte character (surrogate pair)
    else if (byte >= 240 && byte < 365) {
      // Build percent-encoded string for decodeURIComponent
      const bytes = [byte, byteArray[++index], byteArray[++index], byteArray[++index]];
      const percentEncoded = "%" + bytes.map(b => b.toString(16)).join("%");
      decodedString += decodeURIComponent(percentEncoded);
    }
    // 3-byte character
    else {
      const nextByte1 = byteArray[++index];
      const nextByte2 = byteArray[++index];
      decodedString += String.fromCharCode(
        ((byte & 15) << 12) |
        ((nextByte1 & 63) << 6) |
        (nextByte2 & 63)
      );
    }
  }
  return decodedString;
}

module.exports = utf8ByteArrayToString;