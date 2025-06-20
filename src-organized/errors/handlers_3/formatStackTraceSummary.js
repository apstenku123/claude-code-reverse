/**
 * Generates a formatted string summarizing the last 10 stack trace entries.
 * Each entry includes the function name, line number, and column number, separated by commas.
 *
 * @param {Array<{function: string, lineno: number, colno: number}>} stackTraceEntries - Array of stack trace entry objects.
 * @returns {string|undefined} a comma-separated string of the last 10 stack trace entries (function, line, column), or undefined if input is undefined.
 */
function formatStackTraceSummary(stackTraceEntries) {
  // Return undefined if input is undefined
  if (stackTraceEntries === undefined) return;

  // Take the last 10 entries from the stack trace
  const lastTenEntries = stackTraceEntries.slice(-10);

  // Reduce the entries into a single comma-separated string
  return lastTenEntries.reduce((formattedString, entry) => {
    // Append function name, line number, and column number for each entry
    return `${formattedString},${entry.function},${entry.lineno},${entry.colno}`;
  }, "");
}

module.exports = formatStackTraceSummary;