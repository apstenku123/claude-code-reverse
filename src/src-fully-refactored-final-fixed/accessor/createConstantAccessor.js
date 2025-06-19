/**
 * Creates an accessor function that always returns the provided value.
 *
 * @param {*} constantValue - The value to be returned by the accessor function.
 * @returns {function(): *} a function that, when called, returns the original constant value.
 */
const createConstantAccessor = (constantValue) => {
  // Return a function that always returns the provided constant value
  return function () {
    return constantValue;
  };
};

module.exports = createConstantAccessor;