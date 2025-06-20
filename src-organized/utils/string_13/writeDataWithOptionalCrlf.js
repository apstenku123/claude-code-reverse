/**
 * Writes data to a destination, optionally converting line endings to CRLF format.
 *
 * @param {string} destination - The destination to write data to.
 * @param {string} data - The data to be written. May contain line breaks.
 * @param {string} encoding - The encoding to use when writing the data.
 * @param {string} lineEndingFormat - If set to 'CRLF', converts all line breaks to CRLF (\r\n).
 * @returns {void}
 */
function writeDataWithOptionalCrlf(destination, data, encoding, lineEndingFormat) {
  let formattedData = data;

  // If the lineEndingFormat is 'CRLF', replace all line breaks with CRLF (\r\n)
  if (lineEndingFormat === "CRLF") {
    formattedData = data.split(`\n`).join(`\r\n`);
  }

  // Write the (possibly formatted) data to the destination with the specified encoding
  jM(destination, formattedData, {
    encoding: encoding
  });
}

module.exports = writeDataWithOptionalCrlf;