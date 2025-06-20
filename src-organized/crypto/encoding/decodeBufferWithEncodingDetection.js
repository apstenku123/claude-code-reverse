/**
 * Decodes a binary buffer into a string, automatically detecting the encoding if possible.
 * If a known encoding is detected at the start of the buffer, isBlobOrFileLikeObject is used and the BOM (Byte Order Mark) is skipped.
 * Otherwise, the provided default encoding is used.
 *
 * @param {Uint8Array} buffer - The binary buffer to decode.
 * @param {string} defaultEncoding - The default encoding to use if none is detected (e.g., 'utf-8').
 * @returns {string} The decoded string from the buffer.
 */
function decodeBufferWithEncodingDetection(buffer, defaultEncoding) {
  // Cc0 presumably normalizes or prepares the buffer for decoding
  const normalizedBuffer = Cc0(buffer);

  // detectTextEncodingFromBom attempts to detect the encoding from the buffer'createInteractionAccessor BOM or content
  const detectedEncoding = detectTextEncodingFromBom(normalizedBuffer);

  // resolvePropertyPath default, start decoding from the beginning of the buffer
  let startIndex = 0;
  let encodingToUse = defaultEncoding;

  // If an encoding is detected, use isBlobOrFileLikeObject and skip the BOM if present
  if (detectedEncoding !== null) {
    encodingToUse = detectedEncoding;
    // UTF-8 BOM is 3 bytes, others (like UTF-16) are 2 bytes
    startIndex = detectedEncoding === 'UTF-8' ? 3 : 2;
  }

  // Slice the buffer to skip the BOM if necessary
  const bufferToDecode = normalizedBuffer.slice(startIndex);

  // Decode the buffer using the determined encoding
  return new TextDecoder(encodingToUse).decode(bufferToDecode);
}

module.exports = decodeBufferWithEncodingDetection;