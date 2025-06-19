/**
 * Returns a default object with a 'not' property initialized as an empty object.
 *
 * This function can be used as a base accessor or as a default value provider
 * where a 'not' property is expected in the returned object structure.
 *
 * @returns {Object} An object with a single property 'not', which is an empty object.
 */
const getDefaultNotObject = () => {
  // Return an object with a 'not' property set to an empty object
  return {
    not: {}
  };
};

module.exports = getDefaultNotObject;
