/**
 * Creates an array containing 31 copies of the provided value.
 *
 * @param {*} value - The value to repeat in the array.
 * @returns {Array<*>} An array with 31 elements, each set to the provided value.
 */
function createRepeatedArray(value) {
  const repeatedArray = [];
  // Loop 31 times to fill the array with the provided value
  for (let index = 0; index < 31; index++) {
    repeatedArray.push(value);
  }
  return repeatedArray;
}

module.exports = createRepeatedArray;