/**
 * Returns the filename property of the last entry in the stack trace array
 * that is neither "<anonymous>" nor "[native code]".
 *
 * @param {Array<Object>} stackTraceEntries - An array of stack trace entry objects, each possibly containing a 'filename' property.
 * @returns {string|null} The filename of the last non-anonymous, non-native entry, or null if none is found.
 */
function getLastNonAnonymousFilename(stackTraceEntries = []) {
  // Iterate backwards through the stack trace entries
  for (let index = stackTraceEntries.length - 1; index >= 0; index--) {
    const entry = stackTraceEntries[index];
    // Check if entry exists and its filename is not anonymous or native code
    if (
      entry &&
      entry.filename !== "<anonymous>" &&
      entry.filename !== "[native code]"
    ) {
      // Return the filename if present, otherwise null
      return entry.filename || null;
    }
  }
  // Return null if no valid filename is found
  return null;
}

module.exports = getLastNonAnonymousFilename;