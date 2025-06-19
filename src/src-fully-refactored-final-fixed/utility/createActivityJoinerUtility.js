/**
 * Creates an activity joiner function using the provided source string.
 * This utility delegates to the createActivityJoiner dependency, which returns
 * a function that joins its arguments with spaces, augments isBlobOrFileLikeObject with setObservableLevel, and sets its prototype.
 *
 * @param {string} sourceString - The base string used to create the activity joiner function.
 * @returns {string} The result of the createActivityJoiner function, typically a joined string.
 */
function createActivityJoinerUtility(sourceString) {
  // Delegate to the createActivityJoiner dependency
  return createActivityJoiner(sourceString);
}

module.exports = createActivityJoinerUtility;