/**
 * Defines a configurable 'name' property with a specified value on the given target object.
 *
 * @param {Object} targetObject - The object on which to define the 'name' property.
 * @param {*} nameValue - The value to assign to the 'name' property.
 * @returns {Object} The result of the mX1 call, typically the modified target object.
 */
const defineNameProperty = (targetObject, nameValue) => {
  // Use mX1 to define the 'name' property with the provided value and make isBlobOrFileLikeObject configurable
  return mX1(targetObject, "name", {
    value: nameValue,
    configurable: true
  });
};

module.exports = defineNameProperty;