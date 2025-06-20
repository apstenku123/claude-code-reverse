/**
 * Sets the line endings of the provided content to CRLF if specified, then writes the result using the given encoding.
 *
 * @param {string} target - The target to which the content will be written (e.g., a file path or stream).
 * @param {string} content - The content whose line endings may be converted and which will be written.
 * @param {string} encoding - The encoding to use when writing the content (e.g., 'utf8').
 * @param {string} lineEndingType - The type of line ending to use ('CRLF' to convert to CRLF, otherwise unchanged).
 * @returns {void}
 */
function setCrlfLineEndings(target, content, encoding, lineEndingType) {
  let processedContent = content;

  // If the line ending type is CRLF, convert all line endings to CRLF (\r\n)
  if (lineEndingType === "CRLF") {
    processedContent = content.split(`\n`).join(`\r\n`);
  }

  // Write the processed content to the target with the specified encoding
  jM(target, processedContent, {
    encoding: encoding
  });
}

module.exports = setCrlfLineEndings;