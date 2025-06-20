/**
 * Creates a function that, when called with a value, concatenates a predefined array of arguments
 * with a mapped array generated from those arguments.
 *
 * @param {...any} initialArgs - The initial arguments to be used for mapping and concatenation.
 * @returns {function(any): any} a function that takes a value and returns the result of concatenating
 *   the mapped arguments with the provided value.
 */
function createConcatWithMappedArgs(...initialArgs) {
  /**
   * @param {any} value - The value to concatenate with the mapped arguments.
   * @returns {any} The result of concatenating the mapped arguments with the provided value.
   */
  return function (value) {
    // eS9([], tS9(initialArgs)) processes initialArgs and returns an array
    // B_9.of(...processedArgs) creates an array from the processed arguments
    // A_9.concat(value, ...) concatenates value with the mapped arguments
    return A_9.concat(
      value,
      B_9.of.apply(
        void 0,
        eS9([], tS9(initialArgs))
      )
    );
  };
}

module.exports = createConcatWithMappedArgs;