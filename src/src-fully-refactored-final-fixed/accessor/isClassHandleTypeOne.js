/**
 * Checks if the class handle created from the provided class name and pointer type is of type 1.
 *
 * @param {string} className - The name of the class to create a handle for.
 * @param {string} pointerType - The pointer type to validate against.
 * @returns {boolean} True if the created class handle is of type 1, otherwise false.
 */
function isClassHandleTypeOne(className = "", pointerType = "") {
  // createClassHandle creates a class handle and returns its type as a number
  return createClassHandle(className, pointerType) === 1;
}

module.exports = isClassHandleTypeOne;