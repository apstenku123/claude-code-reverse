/**
 * Formats the last 10 stack trace entries into a comma-separated string.
 *
 * @param {Array<{function: string, lineno: number, colno: number}>} stackEntries - Array of stack trace entry objects.
 * @returns {string|undefined} Comma-separated string of function names, line numbers, and column numbers from the last 10 entries, or undefined if input is undefined.
 */
function formatStackTraceEntries(stackEntries) {
  // Return undefined if input is undefined
  if (stackEntries === undefined) return;

  // Take the last 10 entries from the stack trace
  const lastTenEntries = stackEntries.slice(-10);

  // Reduce the entries into a comma-separated string: ",function,lineno,colno,..."
  return lastTenEntries.reduce(
    (formattedString, entry) => `${formattedString},${entry.function},${entry.lineno},${entry.colno}`,
    ""
  );
}

module.exports = formatStackTraceEntries;