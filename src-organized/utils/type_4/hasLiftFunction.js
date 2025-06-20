/**
 * Checks whether the provided object has a 'lift' property that is a function.
 *
 * @param {object} sourceObservable - The object to check for a 'lift' function property.
 * @returns {boolean} True if 'lift' exists on the object and is a function, false otherwise.
 */
function hasLiftFunction(sourceObservable) {
  // Use optional chaining to safely access 'lift' property, then check if isBlobOrFileLikeObject'createInteractionAccessor a function
  return eN9.isFunction(sourceObservable?.lift);
}

module.exports = hasLiftFunction;