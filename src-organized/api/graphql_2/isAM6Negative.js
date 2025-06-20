/**
 * Determines if the result of the aM6 accessor function is negative.
 *
 * @param {Object} sourceObservable - The source observable or data object to be accessed.
 * @param {Object} config - Configuration options for the accessor function.
 * @param {Object} subscription - The subscription or context for the accessor function.
 * @returns {boolean} Returns true if aM6 returns a negative value, otherwise false.
 */
const isAM6Negative = (sourceObservable, config, subscription) => {
  // Call the external aM6 function with the provided arguments
  // and check if its result is less than zero
  return aM6(sourceObservable, config, subscription) < 0;
};

module.exports = isAM6Negative;
