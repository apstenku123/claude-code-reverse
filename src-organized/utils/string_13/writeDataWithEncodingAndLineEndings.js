/**
 * Writes data to a destination with specified encoding and line ending format.
 *
 * @param {string} destination - The target to which data will be written.
 * @param {string} data - The data to write. May contain line breaks.
 * @param {string} encoding - The encoding to use when writing the data (e.g., 'utf8').
 * @param {string} lineEndingFormat - The line ending format to use. If 'CRLF', converts all line endings to CRLF (\r\n).
 * @returns {void}
 */
function writeDataWithEncodingAndLineEndings(destination, data, encoding, lineEndingFormat) {
  let formattedData = data;

  // If the line ending format is CRLF, replace all line breaks with CRLF (\r\n)
  if (lineEndingFormat === "CRLF") {
    formattedData = data.split(`\n`).join(`\r\n`);
  }

  // Write the formatted data to the destination with the specified encoding
  jM(destination, formattedData, {
    encoding: encoding
  });
}

module.exports = writeDataWithEncodingAndLineEndings;