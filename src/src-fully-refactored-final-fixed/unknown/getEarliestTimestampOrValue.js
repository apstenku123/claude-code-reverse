/**
 * Returns the smallest numeric value or earliest timestamp from the provided arguments.
 * If any argument is a Date, its timestamp is used for comparison.
 *
 * @param {...(number|Date)} values - a list of numbers or Date objects to compare.
 * @returns {number} The smallest number or earliest timestamp among the arguments. Returns Infinity if no arguments are provided.
 */
function getEarliestTimestampOrValue(...values) {
  // Initialize with Infinity so any real value or timestamp will be less
  let smallestValue = Infinity;

  for (const value of values) {
    // If the value is a Date, use its timestamp; otherwise, use the value directly
    const comparableValue = value instanceof Date ? value.getTime() : value;
    // Update smallestValue if a smaller one is found
    if (comparableValue < smallestValue) {
      smallestValue = comparableValue;
    }
  }

  return smallestValue;
}

module.exports = getEarliestTimestampOrValue;