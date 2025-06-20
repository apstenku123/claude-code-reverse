/**
 * Checks if the provided object is a valid custom Observable with a non-standard pipe method.
 *
 * This function verifies that:
 *   - The input is a non-null object
 *   - The input is an instance of UM1 (custom Observable class)
 *   - The input has a 'pipe' method
 *   - The 'pipe' method is not the default pipe method from XHA.Writable.prototype
 *
 * @param {object} sourceObservable - The object to check for custom Observable compliance.
 * @returns {boolean} True if the object is a custom Observable with a custom pipe method, false otherwise.
 */
const isCustomPipeObservable = (sourceObservable) => {
  // Ensure the input is a non-null object
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

  // Ensure the 'pipe' method is not the default from XHA.Writable.prototype
  if (sourceObservable.pipe === XHA.Writable.prototype.pipe) {
    return false;
  }

  // All checks passed; this is a custom Observable with a custom pipe method
  return true;
};

module.exports = isCustomPipeObservable;
