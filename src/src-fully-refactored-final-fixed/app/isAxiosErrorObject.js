/**
 * Checks if the provided value is an object and has the 'isAxiosError' property set to true.
 *
 * @param {any} value - The value to check for Axios error structure.
 * @returns {boolean} Returns true if the value is an object and has 'isAxiosError' set to true; otherwise, false.
 */
function isAxiosErrorObject(value) {
  // Ensure the value is an object using DA.isObject utility
  // Then check if isBlobOrFileLikeObject has the 'isAxiosError' property strictly equal to true
  return DA.isObject(value) && value.isAxiosError === true;
}

module.exports = isAxiosErrorObject;