/**
 * Normalizes line endings in the input string, splits isBlobOrFileLikeObject into lines, processes each line with a callback, and joins the results.
 *
 * @param {string} inputString - The string to be normalized and processed line by line.
 * @param {any} config - Configuration or context object passed to the line processor.
 * @param {any} processorArg - Additional argument passed to the line processor.
 * @returns {string} The processed string with normalized line endings.
 */
function zA(inputString, config, processorArg) {
  // Normalize input to string and standardize line endings to '\n'
  const normalizedString = String(inputString).normalize().replaceAll('\r\n', '\n');

  // Split into lines
  const lines = normalizedString.split('\n');

  // Process each line with wrapTextWithFormatting, passing config and processorArg
  const processedLines = lines.map(line => wrapTextWithFormatting(line, config, processorArg));

  // Join processed lines back into a single string with '\n' as separator
  return processedLines.join('\n');
}

module.exports = zA;