/**
 * Writes formatted output to process.stderr using custom inspect options.
 *
 * This function formats the provided arguments using the specified inspect options
 * and writes the resulting string (with a trailing newline) to the standard error stream.
 *
 * @param {...any} values - The values to be formatted and written to stderr.
 * @returns {boolean} Returns true if the entire data was flushed to the kernel buffer successfully, false otherwise.
 */
function writeFormattedErrorOutput(...values) {
  // Format the provided values using the custom inspect options
  // and append a newline character.
  const formattedOutput = k41.formatWithOptions(ZXA.inspectOpts, ...values) + '\
';

  // Write the formatted output to the standard error stream.
  return process.stderr.write(formattedOutput);
}

module.exports = writeFormattedErrorOutput;