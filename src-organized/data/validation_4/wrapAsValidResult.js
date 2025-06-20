/**
 * Wraps the provided value in a standardized result object with a 'valid' status.
 *
 * @param {*} value - The value to be wrapped in the result object.
 * @returns {{ status: string, value: * }} An object containing the status and the original value.
 */
const wrapAsValidResult = (value) => {
  // Return an object indicating the value is valid
  return {
    status: "valid",
    value: value
  };
};

module.exports = wrapAsValidResult;
