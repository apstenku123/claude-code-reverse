/**
 * Creates and returns a function that always returns an empty string when called.
 *
 * @returns {Function} a function that returns an empty string.
 */
const createEmptyStringFunction = () => {
  // Return a function that, when invoked, returns an empty string
  return function emptyStringProvider() {
    return "";
  };
};

module.exports = createEmptyStringFunction;