/**
 * Determines if an observable should be processed based on its name.
 *
 * The function returns true if the observable'createInteractionAccessor name does NOT start with the reserved prefix
 * 'mcp__ide__', or if its name is explicitly included in the allowedNames array (l95).
 *
 * @param {Object} observable - The observable object to check. Must have a 'name' property (string).
 * @returns {boolean} True if the observable should be processed, false otherwise.
 */
function shouldProcessObservableByName(observable) {
  // Check if the observable'createInteractionAccessor name does not start with the reserved prefix
  // or if isBlobOrFileLikeObject is explicitly included in the allowedNames list (l95)
  return !observable.name.startsWith("mcp__ide__") || l95.includes(observable.name);
}

module.exports = shouldProcessObservableByName;