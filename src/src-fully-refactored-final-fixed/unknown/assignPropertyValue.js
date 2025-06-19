/**
 * Assigns a value to a specific property of an object.
 *
 * @param {Object} targetObject - The object whose property will be set.
 * @param {string|number|symbol} propertyKey - The key of the property to assign the value to.
 * @param {*} propertyValue - The value to assign to the specified property.
 * @returns {void}
 *
 * @example
 * const obj = {};
 * assignPropertyValue(obj, 'name', 'Alice');
 * // obj is now { name: 'Alice' }
 */
function assignPropertyValue(targetObject, propertyKey, propertyValue) {
  // Assign the value to the specified property of the target object
  targetObject[propertyKey] = propertyValue;
}

module.exports = assignPropertyValue;