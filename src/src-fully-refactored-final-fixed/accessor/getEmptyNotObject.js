/**
 * Returns an object with a single property 'not', which is an empty object.
 * This can be used as a default or placeholder accessor structure.
 *
 * @returns {{ not: {} }} An object containing an empty 'not' property.
 */
const getEmptyNotObject = () => {
  // Return an object with an empty 'not' property
  return {
    not: {}
  };
};

module.exports = getEmptyNotObject;