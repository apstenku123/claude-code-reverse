/**
 * Checks if the provided value is a custom UM1 Observable with a non-standard pipe method.
 *
 * This function verifies that the input is:
 *   - Not null or undefined
 *   - An object
 *   - An instance of UM1 (custom Observable class)
 *   - Has a 'pipe' method that is a function
 *   - The 'pipe' method is not the default XHA.Writable.prototype.pipe
 *
 * @param {any} sourceObservable - The value to check for custom UM1 Observable characteristics.
 * @returns {boolean} True if the value is a custom UM1 Observable with a custom pipe method, false otherwise.
 */
const isCustomUM1Observable = (sourceObservable) => {
  // Ensure the value is not null/undefined and is an object
  if (!sourceObservable || typeof sourceObservable !== "object") {
    return false;
  }

  // Check if the value is an instance of UM1 (custom Observable class)
  if (!(sourceObservable instanceof UM1)) {
    return false;
  }

  // Ensure the 'pipe' property exists and is a function
  if (typeof sourceObservable.pipe !== "function") {
    return false;
  }

  // Ensure the 'pipe' method is not the default XHA.Writable.prototype.pipe
  if (sourceObservable.pipe === XHA.Writable.prototype.pipe) {
    return false;
  }

  // All checks passed; this is a custom UM1 Observable with a custom pipe method
  return true;
};

module.exports = isCustomUM1Observable;
