/**
 * Detects the encoding of a file-like source by reading its initial bytes.
 * Attempts to determine if the source is UTF-16LE, UTF-8 (with BOM), or defaults to UTF-8/ascii.
 *
 * @param {any} fileDescriptor - The file descriptor or source to read from.
 * @returns {string} The detected encoding: 'utf16le', 'utf8', or 'ascii'.
 */
function detectFileEncoding(fileDescriptor) {
  try {
    // f1() is assumed to return an object with a readSync method
    const fileReader = f1();
    // Read up to 4096 bytes from the file/source
    const {
      buffer: readBuffer,
      bytesRead
    } = fileReader.readSync(fileDescriptor, { length: 4096 });

    // Check for UTF-16LE BOM (0xFF, 0xFE)
    if (bytesRead >= 2) {
      if (readBuffer[0] === 0xFF && readBuffer[1] === 0xFE) {
        return "utf16le";
      }
    }

    // Check for UTF-8 BOM (0xEF, 0xBB, 0xBF)
    if (
      bytesRead >= 3 &&
      readBuffer[0] === 0xEF &&
      readBuffer[1] === 0xBB &&
      readBuffer[2] === 0xBF
    ) {
      return "utf8";
    }

    // If the buffer (as utf8) has content, assume utf8; otherwise, ascii
    const contentAsUtf8 = readBuffer.slice(0, bytesRead).toString("utf8");
    return contentAsUtf8.length > 0 ? "utf8" : "ascii";
  } catch (error) {
    // Handle error (reportErrorIfAllowed is assumed to log or process the error)
    reportErrorIfAllowed(error);
    // Default to utf8 on error
    return "utf8";
  }
}

module.exports = detectFileEncoding;