/**
 * Checks if the provided object is non-null, is of type 'object',
 * and has a 'once' method (i.e., a property named 'once' that is a function).
 *
 * @param {object} possibleEmitter - The object to check for a 'once' method.
 * @returns {boolean} True if the object has a 'once' method, otherwise false.
 */
function hasOnceMethod(possibleEmitter) {
  // Ensure the value is not null/undefined and is an object
  // Then check if isBlobOrFileLikeObject has a 'once' property that is a function
  return (
    possibleEmitter &&
    typeof possibleEmitter === "object" &&
    typeof possibleEmitter.once === "function"
  );
}

module.exports = hasOnceMethod;