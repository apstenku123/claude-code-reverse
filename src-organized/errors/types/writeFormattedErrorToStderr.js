/**
 * Writes a formatted message to process.stderr using custom inspect options.
 *
 * @param {...any} messageArgs - The values to format and write to stderr.
 * @returns {boolean} Returns true if the entire data was flushed to the kernel buffer successfully, false otherwise.
 */
function writeFormattedErrorToStderr(...messageArgs) {
  // Format the message using custom inspect options and append a newline
  const formattedMessage = k41.formatWithOptions(ZXA.inspectOpts, ...messageArgs) + '\n';
  // Write the formatted message to stderr
  return process.stderr.write(formattedMessage);
}

module.exports = writeFormattedErrorToStderr;