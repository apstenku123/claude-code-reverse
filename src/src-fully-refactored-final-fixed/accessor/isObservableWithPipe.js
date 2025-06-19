/**
 * Checks if the provided value is a non-null object that implements a 'pipe' function.
 * This is commonly used to determine if an object is an Observable (e.g., RxJS Observable).
 *
 * @param {any} sourceObservable - The value to check for the 'pipe' method.
 * @returns {boolean} True if the value is a non-null object with a 'pipe' function; otherwise, false.
 */
const isObservableWithPipe = (sourceObservable) => {
  // Ensure the value is not null and is of type 'object'
  if (sourceObservable === null || typeof sourceObservable !== "object") {
    return false;
  }

  // Check if the object has a 'pipe' function
  return typeof sourceObservable.pipe === "function";
};

module.exports = isObservableWithPipe;
