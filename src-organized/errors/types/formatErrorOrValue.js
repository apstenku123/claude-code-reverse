/**
 * Formats an input value or error into a readable string representation.
 *
 * - If the input is an instance of KG, returns the constant WW.
 * - If the input is not an Error, returns its string representation.
 * - If the input is an Error, formats its stack trace using extractProcessOutput, filters out falsy lines, and joins them.
 *   If the resulting string is longer than 10,000 characters, truncates the middle and indicates truncation.
 *
 * @param {*} value - The value or error to format.
 * @returns {string} The formatted string representation of the input.
 */
function formatErrorOrValue(value) {
  // If value is an instance of KG, return the special constant WW
  if (value instanceof KG) {
    return WW;
  }

  // If value is not an Error, return its string representation
  if (!(value instanceof Error)) {
    return String(value);
  }

  // Format the error stack trace using extractProcessOutput, filter out falsy lines, and join with newlines
  const formattedStack = extractProcessOutput(value)
    .filter(Boolean)
    .join('\n')
    .trim() || 'Error';

  // If the formatted stack is within the allowed length, return as is
  if (formattedStack.length <= 10000) {
    return formattedStack;
  }

  // If too long, truncate the middle and indicate truncation
  const maxSegmentLength = 5000;
  const startSegment = formattedStack.slice(0, maxSegmentLength);
  const endSegment = formattedStack.slice(-maxSegmentLength);
  const truncatedLength = formattedStack.length - 10000;

  return `${startSegment}

... [${truncatedLength} characters truncated] ...

${endSegment}`;
}

module.exports = formatErrorOrValue;