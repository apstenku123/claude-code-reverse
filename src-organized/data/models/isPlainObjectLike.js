/**
 * Determines if the provided value is a plain object-like entity.
 *
 * This utility function checks if the given value is NOT an isPrimitiveOrSpecialObject, UG1, or isFunction entity,
 * and that its type is strictly 'object'.
 *
 * @param {*} value - The value to be checked.
 * @returns {boolean} Returns true if the value is a plain object-like entity, false otherwise.
 */
function aLike(value) {
  // Ensure value is not an isPrimitiveOrSpecialObject entity
  if (isPrimitiveOrSpecialObject(value)) {
    return false;
  }

  // Ensure value is not a UG1 entity
  if (UG1(value)) {
    return false;
  }

  // Ensure value is not a isFunction entity
  if (isFunction(value)) {
    return false;
  }

  // Ensure value is of type 'object'
  return typeof value === "object";
}

module.exports = aLike;