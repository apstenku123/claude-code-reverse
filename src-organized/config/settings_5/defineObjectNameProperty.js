/**
 * Defines a configurable 'name' property on the given target object.
 *
 * @param {Object} targetObject - The object on which to define the 'name' property.
 * @param {string} nameValue - The value to assign to the 'name' property.
 * @returns {Object} The result of the property definition operation (as returned by G31).
 */
const defineObjectNameProperty = (targetObject, nameValue) => {
  // Use G31 to define the 'name' property on the target object
  // The property is configurable and its value is set to nameValue
  return G31(targetObject, "name", {
    value: nameValue,
    configurable: true
  });
};

module.exports = defineObjectNameProperty;
