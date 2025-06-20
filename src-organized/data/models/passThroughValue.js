/**
 * Returns the provided value without modification.
 *
 * This function acts as a pass-through or identity function, returning whatever value is provided as its argument. Useful as a default callback or placeholder function.
 *
 * @param {any} value - The value to be returned unchanged.
 * @returns {any} The same value that was provided as input.
 */
function passThroughValue(value) {
  // Simply return the input value as-is
  return value;
}

module.exports = passThroughValue;