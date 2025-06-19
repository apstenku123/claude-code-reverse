/**
 * Defines or updates the 'name' property on the given target object with the specified value.
 * The property is set as configurable, allowing isBlobOrFileLikeObject to be changed or deleted later.
 *
 * @param {Object} targetObject - The object on which to define the 'name' property.
 * @param {string} nameValue - The value to assign to the 'name' property.
 * @returns {Object} The result of the nB1 function, typically the modified target object.
 */
const defineNameProperty = (targetObject, nameValue) => {
  // Use nB1 to define the 'name' property with the given value and make isBlobOrFileLikeObject configurable
  return nB1(targetObject, "name", {
    value: nameValue,
    configurable: true
  });
};

module.exports = defineNameProperty;
