/**
 * Checks if the internal data object contains the specified property as its own property.
 *
 * This utility function determines whether a given key exists as an own property
 * of the internal __data__ object. It uses either direct property access or the
 * hasOwnProperty method, depending on the value of the external flag `oE`.
 *
 * @param {string} propertyKey - The key to check for existence in the internal data object.
 * @returns {boolean} True if the property exists as an own property, false otherwise.
 */
function hasOwnDataProperty(propertyKey) {
  // Access the internal data storage object
  const dataObject = this.__data__;

  // If oE is true, check for property existence using direct access
  // Otherwise, use the hasOwnProperty method (jy2.call)
  return oE ? dataObject[propertyKey] !== undefined : jy2.call(dataObject, propertyKey);
}

module.exports = hasOwnDataProperty;