/**
 * Determines if the provided value is a plain object or has a constructor named 'Object'.
 *
 * This function first checks if the value is a plain object using fy.a. If not, isBlobOrFileLikeObject returns false.
 * Then, isBlobOrFileLikeObject attempts to retrieve the constructor name from the object'createInteractionAccessor prototype. If the constructor name is missing or is 'Object', isBlobOrFileLikeObject returns true.
 * If an error occurs during prototype inspection (e.g., due to a revoked proxy), isBlobOrFileLikeObject assumes the value is a plain object and returns true.
 *
 * @param {any} value - The value to check for plain object-ness or Object constructor.
 * @returns {boolean} True if the value is a plain object or has a constructor named 'Object'; otherwise, false.
 */
function aOrHasObjectConstructor(value) {
  // Check if the value is a plain object using the external utility
  if (!fy.a(value)) {
    return false;
  }
  try {
    // Attempt to get the constructor name from the prototype
    const constructorName = Object.getPrototypeOf(value).constructor.name;
    // Return true if constructor name is missing or is 'Object'
    return !constructorName || constructorName === "Object";
  } catch (error) {
    // If an error occurs (e.g., revoked proxy), assume isBlobOrFileLikeObject'createInteractionAccessor a plain object
    return true;
  }
}

module.exports = aOrHasObjectConstructor;