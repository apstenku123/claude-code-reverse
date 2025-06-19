/**
 * Determines if the provided value is of a specific object type using Object.prototype.toString.
 *
 * @param {any} value - The value to check the type of.
 * @param {string} typeName - The expected type name (e.g., 'Array', 'Object', 'Function').
 * @returns {boolean} True if the value matches the specified type name, otherwise false.
 */
function isObjectOfType(value, typeName) {
  // Use Object.prototype.toString to get the internal [[Class]] of the value
  // Example: Object.prototype.toString.call([]) === '[object Array]'
  return Object.prototype.toString.call(value) === `[object ${typeName}]`;
}

module.exports = isObjectOfType;