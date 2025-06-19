/**
 * Checks if the provided object has a truthy value for either the 'AND' or 'OR' property as defined in the lH1 mapping.
 *
 * @param {Object} objectToCheck - The object to inspect for 'AND' or 'OR' properties.
 * @returns {boolean} Returns true if either property is present and truthy, otherwise false.
 */
function hasAndOrProperty(objectToCheck) {
  // Check for a truthy value on either the 'AND' or 'OR' property keys from lH1
  return Boolean(
    objectToCheck[lH1.AND] || objectToCheck[lH1.OR]
  );
}

module.exports = hasAndOrProperty;
