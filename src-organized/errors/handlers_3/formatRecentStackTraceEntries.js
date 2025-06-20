/**
 * Formats the last 10 entries of a stack trace array into a comma-separated string.
 * Each entry includes the function name, line number, and column number.
 *
 * @param {Array<{function: string, lineno: number, colno: number}>} stackTraceEntries - Array of stack trace entry objects.
 * @returns {string|undefined} a comma-separated string of the last 10 stack trace entries in the format: ",function,lineno,colno,...", or undefined if input is undefined.
 */
function formatRecentStackTraceEntries(stackTraceEntries) {
  // Return undefined if input is undefined
  if (stackTraceEntries === undefined) return;

  // Take the last 10 entries and reduce them into a comma-separated string
  return stackTraceEntries
    .slice(-10)
    .reduce(
      (formattedString, entry) => `${formattedString},${entry.function},${entry.lineno},${entry.colno}`,
      ""
    );
}

module.exports = formatRecentStackTraceEntries;