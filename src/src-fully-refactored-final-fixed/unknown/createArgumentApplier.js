/**
 * Creates a function that applies the provided function with a given array of arguments.
 *
 * @param {Function} targetFunction - The function to be invoked with the provided arguments.
 * @returns {Function} a function that takes an array of arguments and applies them to the target function.
 */
const createArgumentApplier = (targetFunction) => {
  /**
   * Applies the target function with the specified arguments array.
   *
   * @param {Array} argumentArray - The array of arguments to apply to the target function.
   * @returns {*} The result of invoking the target function with the provided arguments.
   */
  return function applyArguments(argumentArray) {
    // Use Function.prototype.apply to call targetFunction with argumentArray
    return targetFunction.apply(null, argumentArray);
  };
};

module.exports = createArgumentApplier;