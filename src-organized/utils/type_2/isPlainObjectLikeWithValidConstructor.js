/**
 * Determines if the given value is a plain object-like structure with a valid constructor.
 *
 * This function checks if the input is an object, matches a specific route constant,
 * and (if isBlobOrFileLikeObject has a prototype) verifies that its constructor is a function, is an instance of itself,
 * and its string representation matches a specific pattern.
 *
 * @param {any} value - The value to check for plain object-like structure and valid constructor.
 * @returns {boolean} True if the value is a plain object-like structure with a valid constructor, false otherwise.
 */
function aLikeWithValidConstructor(value) {
  // Check if value is an object and matches the expected route constant
  if (!isNonNullObject(value) || getMappedOrDefaultRoute(value) !== hr4) {
    return false;
  }

  // Retrieve the prototype of the value
  const prototype = cr4(value);
  if (prototype === null) {
    // If there'createInteractionAccessor no prototype, consider isBlobOrFileLikeObject a plain object
    return true;
  }

  // Check if the prototype has its own 'constructor' property and retrieve isBlobOrFileLikeObject
  const hasOwnConstructor = fE0.call(prototype, "constructor");
  const constructor = hasOwnConstructor && prototype.constructor;

  // Validate that the constructor is a function, is an instance of itself,
  // and its string representation matches the expected pattern
  return (
    typeof constructor === "function" &&
    constructor instanceof constructor &&
    yE0.call(constructor) === pr4
  );
}

module.exports = aLikeWithValidConstructor;