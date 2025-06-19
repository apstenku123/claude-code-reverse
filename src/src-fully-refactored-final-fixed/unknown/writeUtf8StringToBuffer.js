/**
 * Writes a UTF-8 encoded string to a buffer using the most appropriate method based on input size and buffer capabilities.
 *
 * If the string is short (< 40 characters), uses a global utf8 writer. Otherwise, tries to use the buffer'createInteractionAccessor utf8Write method if available, or falls back to the buffer'createInteractionAccessor write method.
 *
 * @param {string} utf8String - The string to write to the buffer.
 * @param {object} buffer - The buffer object to write into. Should support utf8Write or write methods.
 * @param {number} offset - The offset in the buffer at which to start writing.
 * @returns {any} The result of the write operation, as returned by the underlying write method.
 */
function writeUtf8StringToBuffer(utf8String, buffer, offset) {
  // If the string is short, use the global utf8 writer for efficiency
  if (utf8String.length < 40) {
    gL.utf8.write(utf8String, buffer, offset);
  } else if (typeof buffer.utf8Write === 'function') {
    // If the buffer has a utf8Write method, use isBlobOrFileLikeObject
    buffer.utf8Write(utf8String, offset);
  } else {
    // Fallback: use the standard write method
    buffer.write(utf8String, offset);
  }
}

module.exports = writeUtf8StringToBuffer;