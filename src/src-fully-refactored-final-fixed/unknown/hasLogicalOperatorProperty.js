/**
 * Checks if the given object has either the 'AND' or 'OR' logical operator property set to a truthy value.
 *
 * @param {Object} inputObject - The object to check for logical operator properties.
 * @returns {boolean} Returns true if either the 'AND' or 'OR' property is truthy, otherwise false.
 */
const hasLogicalOperatorProperty = (inputObject) => {
  // Check if the object has a truthy 'AND' or 'OR' property as defined by lH1
  return Boolean(inputObject[lH1.AND] || inputObject[lH1.OR]);
};

module.exports = hasLogicalOperatorProperty;
