/**
 * Checks if the provided object is a valid observable with a string 'url' property and a 'blob' method.
 *
 * @param {object} sourceObservable - The object to validate.
 * @returns {boolean} True if the object is non-null, is of type 'object', has a string 'url' property, and a 'blob' method; otherwise, false.
 */
const isValidObservableWithUrlAndBlob = (sourceObservable) => {
  // Ensure the value is not null and is an object
  if (sourceObservable == null || typeof sourceObservable !== "object") {
    return false;
  }

  // Check if the 'url' property exists and is a string
  if (typeof sourceObservable.url !== "string") {
    return false;
  }

  // Check if the 'blob' property exists and is a function
  if (typeof sourceObservable.blob !== "function") {
    return false;
  }

  // All checks passed
  return true;
};

module.exports = isValidObservableWithUrlAndBlob;
