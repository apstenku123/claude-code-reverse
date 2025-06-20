/**
 * Checks if the provided value is a non-null object that is an instance of UM1
 * and has both 'write' and 'end' methods (functions).
 *
 * @param {object} sourceObservable - The value to check for UM1 instance and required methods.
 * @returns {boolean} True if the value is a UM1 instance with 'write' and 'end' methods, otherwise false.
 */
const isWritableUM1Instance = (sourceObservable) => {
  // Ensure the value is not null or undefined
  if (!sourceObservable) {
    return false;
  }

  // Ensure the value is an object
  if (typeof sourceObservable !== "object") {
    return false;
  }

  // Ensure the value is an instance of UM1
  if (!(sourceObservable instanceof UM1)) {
    return false;
  }

  // Ensure the value has a 'write' method
  if (typeof sourceObservable.write !== "function") {
    return false;
  }

  // Ensure the value has an 'end' method
  if (typeof sourceObservable.end !== "function") {
    return false;
  }

  // All checks passed
  return true;
};

module.exports = isWritableUM1Instance;
