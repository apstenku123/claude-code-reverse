/**
 * Creates a function that always returns the provided value.
 *
 * @param {*} constantValue - The value to be returned by the generated function.
 * @returns {function(): *} a function that, when called, returns the constant value.
 */
const createConstantFunction = (constantValue) => {
  // Return a function that always returns the specified constant value
  return function () {
    return constantValue;
  };
};

module.exports = createConstantFunction;