/**
 * Decodes the base64-encoded prefix of a dot-separated string and processes the decoded binary string.
 *
 * @param {string} inputString - The input string, expected to have a base64-encoded prefix before the first dot.
 * @returns {string} The result of processing the decoded binary string.
 */
function decodeBase64PrefixAndProcess(inputString) {
  // Extract the substring before the first dot ('.'), which is expected to be base64-encoded
  const base64Prefix = inputString.split('.', 1)[0];

  // Decode the base64 prefix into a binary string
  const decodedBinaryString = IJ2.from(base64Prefix, 'base64').toString('binary');

  // Process the decoded binary string with parseJsonIfNeeded and return the result
  return parseJsonIfNeeded(decodedBinaryString);
}

module.exports = decodeBase64PrefixAndProcess;