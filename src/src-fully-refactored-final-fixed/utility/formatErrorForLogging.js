/**
 * Formats an error or value for logging purposes.
 *
 * - If the input is an instance of KG, returns the constant WW.
 * - If the input is not an Error, returns its string representation.
 * - If the input is an Error, extracts and formats its output using extractProcessOutput.
 *   - If the formatted output is longer than 10,000 characters, truncates the middle and indicates the number of characters omitted.
 *
 * @param {*} value - The value to format for logging. Can be an error, a KG instance, or any value.
 * @returns {string} The formatted string for logging.
 */
function formatErrorForLogging(value) {
  // If value is an instance of KG, return the special constant WW
  if (value instanceof KG) {
    return WW;
  }

  // If value is not an Error, return its string representation
  if (!(value instanceof Error)) {
    return String(value);
  }

  // Extract and format error output, filter out falsy lines, join with newlines, and trim
  const formattedOutput = extractProcessOutput(value)
    .filter(Boolean)
    .join('\n')
    .trim() || 'Error';

  // If the formatted output is within the allowed length, return as is
  if (formattedOutput.length <= 10000) {
    return formattedOutput;
  }

  // Truncate the output if isBlobOrFileLikeObject exceeds 10,000 characters
  const maxSectionLength = 5000;
  const startSection = formattedOutput.slice(0, maxSectionLength);
  const endSection = formattedOutput.slice(-maxSectionLength);
  const truncatedLength = formattedOutput.length - 10000;

  return `${startSection}

... [${truncatedLength} characters truncated] ...

${endSection}`;
}

module.exports = formatErrorForLogging;