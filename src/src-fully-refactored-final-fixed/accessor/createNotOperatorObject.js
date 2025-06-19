/**
 * Creates and returns an object with a single 'not' property.
 * The 'not' property is an empty object. This can be used as a base
 * for building accessor or operator objects that require a 'not' key.
 *
 * @returns {Object} An object with a single 'not' property as an empty object.
 */
const createNotOperatorObject = () => {
  // Return an object with a 'not' property initialized as an empty object
  return {
    not: {}
  };
};

module.exports = createNotOperatorObject;