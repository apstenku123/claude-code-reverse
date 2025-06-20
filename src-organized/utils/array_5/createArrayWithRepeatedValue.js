/**
 * Creates a new array by mapping over the global 'zS9' array and replacing each element with the provided value.
 *
 * @param {*} valueToRepeat - The value to fill the new array with.
 * @returns {Array<*>} a new array with the same length as 'zS9', where every element is 'valueToRepeat'.
 */
function createArrayWithRepeatedValue(valueToRepeat) {
  // Map over the 'zS9' array, replacing each element with 'valueToRepeat'
  return zS9.map(function () {
    return valueToRepeat;
  });
}

module.exports = createArrayWithRepeatedValue;