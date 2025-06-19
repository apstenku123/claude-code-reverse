/**
 * Checks if the provided object has a 'lift' method and if that method is a function.
 *
 * @param {object} sourceObject - The object to check for a 'lift' method.
 * @returns {boolean} True if 'lift' exists on the object and is a function, otherwise false.
 */
function hasLiftMethod(sourceObject) {
  // Use optional chaining to safely access 'lift' property and check if isBlobOrFileLikeObject'createInteractionAccessor a function
  return eN9.isFunction(sourceObject?.lift);
}

module.exports = hasLiftMethod;