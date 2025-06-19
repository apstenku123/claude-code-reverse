/**
 * Checks if the provided source observable is not present in the GHA set.
 *
 * @param {any} sourceObservable - The observable to check for presence in GHA.
 * @returns {boolean} Returns true if the source observable is NOT in GHA, false otherwise.
 */
const isSourceObservableNotInGHA = (sourceObservable) => {
  // Use the 'has' method of GHA to check for presence
  // Negate the result to return true if not present
  return !GHA.has(sourceObservable);
};

module.exports = isSourceObservableNotInGHA;