/**
 * Checks if the given value is of the specified object type using Object.prototype.toString.
 *
 * @param {any} value - The value to check the type of.
 * @param {string} typeName - The expected type name (e.g., 'Array', 'Object', 'Function').
 * @returns {boolean} True if the value matches the specified object type, false otherwise.
 */
function isObjectType(value, typeName) {
  // Use Object.prototype.toString to get the internal [[Class]] property
  // Example: [object Array], [object Object], etc.
  return l4A.call(value) === `[object ${typeName}]`;
}

module.exports = isObjectType;