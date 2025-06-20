/**
 * Returns an object containing an empty 'not' property.
 *
 * This function is typically used as an accessor to provide a default structure
 * for objects that require a 'not' property, which can be populated later.
 *
 * @returns {Object} An object with an empty 'not' property.
 */
const getEmptyNegationObject = () => {
  // Return an object with an empty 'not' property
  return {
    not: {}
  };
};

module.exports = getEmptyNegationObject;