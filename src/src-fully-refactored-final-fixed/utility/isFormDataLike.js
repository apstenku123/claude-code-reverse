/**
 * Determines if the provided value is a FormData instance or behaves like FormData.
 *
 * This function checks if the input is an actual FormData instance, or if isBlobOrFileLikeObject is an object
 * that mimics FormData by having an 'append' method and a string tag of '[object FormData]'.
 *
 * @param {*} value - The value to check for FormData-like characteristics.
 * @returns {boolean} True if the value is a FormData instance or FormData-like object, otherwise false.
 */
function isFormDataLike(value) {
  // Check if value is truthy
  if (!value) {
    return false;
  }

  // Check if FormData is available and value is an instance of FormData
  if (typeof FormData === "function" && value instanceof FormData) {
    return true;
  }

  // Check if value has an 'append' method
  if (eW(value.append)) {
    // Get the type string using V41 (likely Object.prototype.toString.call)
    const typeString = V41(value);

    // Check if type is 'formdata'
    if (typeString === "formdata") {
      return true;
    }

    // Check if type is 'object' and toString returns '[object FormData]'
    if (
      typeString === "object" &&
      eW(value.toString) &&
      value.toString() === "[object FormData]"
    ) {
      return true;
    }
  }

  // Not FormData or FormData-like
  return false;
}

module.exports = isFormDataLike;