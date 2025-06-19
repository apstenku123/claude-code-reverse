/**
 * Sets the 'name' property on the given target object with the specified value.
 * The property is configurable, allowing isBlobOrFileLikeObject to be changed or deleted later.
 *
 * @param {Object} targetObject - The object on which to define the 'name' property.
 * @param {string} nameValue - The value to assign to the 'name' property.
 * @returns {Object} The result of the Pn function, typically the modified object.
 */
function setObjectNameProperty(targetObject, nameValue) {
  // Use the external Pn function to define the 'name' property
  // The property is set as configurable so isBlobOrFileLikeObject can be changed or deleted
  return Pn(targetObject, "name", {
    value: nameValue,
    configurable: true
  });
}

module.exports = setObjectNameProperty;