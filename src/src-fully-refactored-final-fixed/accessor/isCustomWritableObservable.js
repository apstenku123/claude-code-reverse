/**
 * Checks if the provided object is a custom writable observable.
 *
 * This function verifies that the input is:
 *   - Not null or undefined
 *   - An object
 *   - An instance of UM1 (likely a custom Observable class)
 *   - Has a 'pipe' method
 *   - Its 'pipe' method is NOT the same as XHA.Writable.prototype.pipe (i.e., not the default Writable pipe)
 *
 * @param {any} sourceObservable - The object to check for custom writable observable characteristics.
 * @returns {boolean} True if the object is a custom writable observable, false otherwise.
 */
const isCustomWritableObservable = (sourceObservable) => {
  // Ensure the object is not null/undefined and is of type 'object'
  if (!sourceObservable || typeof sourceObservable !== "object") {
    return false;
  }

  // Check if the object is an instance of UM1 (custom Observable class)
  if (!(sourceObservable instanceof UM1)) {
    return false;
  }

  // Check if the object has a 'pipe' method
  if (typeof sourceObservable.pipe !== "function") {
    return false;
  }

  // Ensure the 'pipe' method is not the default Writable.prototype.pipe
  if (sourceObservable.pipe === XHA.Writable.prototype.pipe) {
    return false;
  }

  // All checks passed; this is a custom writable observable
  return true;
};

module.exports = isCustomWritableObservable;
