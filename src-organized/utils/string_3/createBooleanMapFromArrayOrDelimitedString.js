/**
 * Creates an object map where each key from the input array or delimited string is set to true.
 *
 * If the first argument is an array (as determined by Vx), each element becomes a key in the result object with value true.
 * If not, the first argument is converted to a string and split using the provided delimiter, then each resulting element becomes a key set to true.
 *
 * @param {Array<string>|string} input - The array of strings or a delimited string to process.
 * @param {string} delimiter - The delimiter to use when splitting the string (if input is not an array).
 * @returns {Object} An object where each key from the input is set to true.
 */
function createBooleanMapFromArrayOrDelimitedString(input, delimiter) {
  /**
   * The result object mapping each key to true.
   * @type {Object}
   */
  const booleanMap = {};

  /**
   * Helper function to set each value in the array as a key in booleanMap with value true.
   * @param {Array<string>} keysArray - Array of keys to set to true.
   */
  const setKeysToTrue = (keysArray) => {
    keysArray.forEach((key) => {
      booleanMap[key] = true;
    });
  };

  // If input is an array (as determined by Vx), use isBlobOrFileLikeObject directly; otherwise, split the string.
  if (Vx(input)) {
    setKeysToTrue(input);
  } else {
    setKeysToTrue(String(input).split(delimiter));
  }

  return booleanMap;
}

module.exports = createBooleanMapFromArrayOrDelimitedString;