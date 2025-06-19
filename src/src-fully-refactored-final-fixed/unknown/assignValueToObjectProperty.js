/**
 * Assigns a value to a specified property of a target object.
 *
 * @param {Object} targetObject - The object whose property will be assigned a value.
 * @param {string|number|symbol} propertyKey - The key of the property to assign the value to.
 * @param {*} valueToAssign - The value to assign to the specified property.
 * @returns {void}
 *
 * @example
 * const obj = {};
 * assignValueToObjectProperty(obj, 'foo', 42);
 * // obj is now { foo: 42 }
 */
function assignValueToObjectProperty(targetObject, propertyKey, valueToAssign) {
  // Assign the value to the specified property of the target object
  targetObject[propertyKey] = valueToAssign;
}

module.exports = assignValueToObjectProperty;
