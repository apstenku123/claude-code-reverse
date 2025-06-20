/**
 * Checks if a given byte array is a valid UTF-8 encoding.
 *
 * This function iterates through the byte array and verifies that each sequence
 * of bytes conforms to the UTF-8 encoding rules. It supports 1-byte (ASCII),
 * 2-byte, 3-byte, and 4-byte UTF-8 characters, and checks for overlong sequences
 * and invalid code points.
 *
 * @param {Uint8Array | number[]} byteArray - The array of bytes to validate as UTF-8.
 * @returns {boolean} True if the byte array is valid UTF-8, false otherwise.
 */
function isValidUtf8ByteArray(byteArray) {
  const length = byteArray.length;
  let index = 0;

  while (index < length) {
    const byte1 = byteArray[index];

    // 1-byte (ASCII): 0xxxxxxx
    if ((byte1 & 0x80) === 0) {
      index++;
      continue;
    }

    // 2-byte sequence: 110xxxxx 10xxxxxx
    if ((byte1 & 0xE0) === 0xC0) {
      // Check for truncated sequence or invalid continuation byte
      if (
        index + 1 === length ||
        (byteArray[index + 1] & 0xC0) !== 0x80 ||
        // Overlong encoding check: 1100000x (0xC0 or 0xC1)
        (byte1 & 0xFE) === 0xC0
      ) {
        return false;
      }
      index += 2;
      continue;
    }

    // 3-byte sequence: 1110xxxx 10xxxxxx 10xxxxxx
    if ((byte1 & 0xF0) === 0xE0) {
      if (
        index + 2 >= length ||
        (byteArray[index + 1] & 0xC0) !== 0x80 ||
        (byteArray[index + 2] & 0xC0) !== 0x80 ||
        // Overlong encoding for UL+0800: 0xE0 0x80-0x9F
        (byte1 === 0xE0 && (byteArray[index + 1] & 0xE0) === 0x80) ||
        // Surrogate halves (UL+D800 to UL+DFFF): 0xED 0xA0-0xBF
        (byte1 === 0xED && (byteArray[index + 1] & 0xE0) === 0xA0)
      ) {
        return false;
      }
      index += 3;
      continue;
    }

    // 4-byte sequence: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    if ((byte1 & 0xF8) === 0xF0) {
      if (
        index + 3 >= length ||
        (byteArray[index + 1] & 0xC0) !== 0x80 ||
        (byteArray[index + 2] & 0xC0) !== 0x80 ||
        (byteArray[index + 3] & 0xC0) !== 0x80 ||
        // Overlong encoding for UL+010000: 0xF0 0x80-0x8F
        (byte1 === 0xF0 && (byteArray[index + 1] & 0xF0) === 0x80) ||
        // Code points above UL+10FFFF: 0xF4 0x90-0xFF or > 0xF4
        (byte1 === 0xF4 && byteArray[index + 1] > 0x8F) ||
        (byte1 > 0xF4)
      ) {
        return false;
      }
      index += 4;
      continue;
    }

    // Invalid first byte for UTF-8 sequence
    return false;
  }

  return true;
}

module.exports = isValidUtf8ByteArray;