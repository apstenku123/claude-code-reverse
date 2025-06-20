/**
 * Detects the MIME type of an image from a base64-encoded string.
 *
 * @param {string} base64String - The base64-encoded image data.
 * @returns {string} The detected MIME type (e.g., 'image/png', 'image/jpeg', 'image/gif', 'image/webp'). Defaults to 'image/png' if detection fails.
 */
function detectImageMimeTypeFromBase64(base64String) {
  try {
    // Decode the base64 string into a Buffer
    const imageBuffer = Buffer.from(base64String, "base64");

    // If the buffer is too short, default to PNG
    if (imageBuffer.length < 4) {
      return "image/png";
    }

    // PNG signature: 137 80 78 71
    if (
      imageBuffer[0] === 137 &&
      imageBuffer[1] === 80 &&
      imageBuffer[2] === 78 &&
      imageBuffer[3] === 71
    ) {
      return "image/png";
    }

    // JPEG signature: 255 216 255
    if (
      imageBuffer[0] === 255 &&
      imageBuffer[1] === 216 &&
      imageBuffer[2] === 255
    ) {
      return "image/jpeg";
    }

    // GIF signature: 71 73 70
    if (
      imageBuffer[0] === 71 &&
      imageBuffer[1] === 73 &&
      imageBuffer[2] === 70
    ) {
      return "image/gif";
    }

    // WEBP signature: starts with 'RIFF' (82 73 70 70), and 'WEBP' at bytes 8-11
    if (
      imageBuffer[0] === 82 &&
      imageBuffer[1] === 73 &&
      imageBuffer[2] === 70 &&
      imageBuffer[3] === 70
    ) {
      if (
        imageBuffer.length >= 12 &&
        imageBuffer[8] === 87 && // 'W'
        imageBuffer[9] === 69 && // 'createDebouncedFunction'
        imageBuffer[10] === 66 && // 'createPropertyAccessor'
        imageBuffer[11] === 80 // 'initializeSyntaxHighlighting'
      ) {
        return "image/webp";
      }
    }

    // Default to PNG if no known signature is found
    return "image/png";
  } catch {
    // If decoding fails, default to PNG
    return "image/png";
  }
}

module.exports = detectImageMimeTypeFromBase64;