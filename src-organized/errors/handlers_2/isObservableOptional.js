/**
 * Determines whether the provided observable-like object is optional.
 * Attempts to call the `isOptional` method on the given object. If the method does not exist
 * or throws an error, the function assumes the object is optional and returns true.
 *
 * @param {Object} observableObject - The object to check for optionality. Must implement `isOptional()` method.
 * @returns {boolean} - Returns true if the object is optional or if an error occurs; otherwise, returns the result of `isOptional()`.
 */
function isObservableOptional(observableObject) {
  try {
    // Attempt to call the isOptional method on the provided object
    return observableObject.isOptional();
  } catch (error) {
    // If isOptional does not exist or throws, assume the object is optional
    return true;
  }
}

module.exports = isObservableOptional;