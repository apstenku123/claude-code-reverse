/**
 * Detects the text encoding of a file based on its Byte Order Mark (BOM).
 *
 * @param {number[]} byteArray - An array of the first three bytes of a file, typically representing the BOM.
 * @returns {string|null} The detected encoding ("UTF-8", "UTF-16BE", "UTF-16LE"), or null if no known BOM is found.
 */
function detectTextEncodingFromBom(byteArray) {
  const [firstByte, secondByte, thirdByte] = byteArray;

  // Check for UTF-8 BOM: 0xEF,0xBB,0xBF (239,187,191)
  if (firstByte === 239 && secondByte === 187 && thirdByte === 191) {
    return "UTF-8";
  }
  // Check for UTF-16BE BOM: 0xFE,0xFF (254,255)
  else if (firstByte === 254 && secondByte === 255) {
    return "UTF-16BE";
  }
  // Check for UTF-16LE BOM: 0xFF,0xFE (255,254)
  else if (firstByte === 255 && secondByte === 254) {
    return "UTF-16LE";
  }

  // No known BOM detected
  return null;
}

module.exports = detectTextEncodingFromBom;