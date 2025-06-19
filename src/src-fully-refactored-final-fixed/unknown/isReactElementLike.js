/**
 * Determines if the provided value is a React element-like object.
 *
 * This function checks if the input is a non-null object and has a `$$typeof` property
 * equal to the special `uc` symbol (commonly used internally by React to tag elements).
 *
 * @param {object} possibleElement - The value to check for React element-like structure.
 * @returns {boolean} True if the value is a React element-like object, false otherwise.
 */
function isReactElementLike(possibleElement) {
  // Ensure the value is an object and not null
  if (typeof possibleElement !== "object" || possibleElement === null) {
    return false;
  }

  // Check for the internal React element type marker
  return possibleElement.$$typeof === uc;
}

module.exports = isReactElementLike;