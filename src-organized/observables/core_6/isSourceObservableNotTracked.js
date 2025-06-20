/**
 * Checks if the provided source observable is not present in the GHA set.
 *
 * @param {any} sourceObservable - The observable to check for presence in the GHA set.
 * @returns {boolean} Returns true if the observable is NOT in the GHA set, false otherwise.
 */
const isSourceObservableNotTracked = (sourceObservable) => {
  // Returns true if GHA does NOT have the sourceObservable
  return !GHA.has(sourceObservable);
};

module.exports = isSourceObservableNotTracked;