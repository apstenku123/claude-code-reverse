/**
 * Writes formatted output to process.stderr using custom inspect options.
 *
 * @param {...any} values - The values to format and write to stderr.
 * @returns {boolean} - Returns true if the entire data was flushed to the kernel buffer successfully, false otherwise.
 */
function writeFormattedToStderr(...values) {
  // Format the input values using the provided inspect options
  const formattedOutput = k41.formatWithOptions(ZXA.inspectOpts, ...values);
  // Write the formatted output followed by a newline to stderr
  return process.stderr.write(formattedOutput + '\n');
}

module.exports = writeFormattedToStderr;