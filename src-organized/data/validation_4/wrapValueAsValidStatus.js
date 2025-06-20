/**
 * Wraps the provided value in an object indicating a valid status.
 *
 * @param {*} value - The value to be wrapped with a valid status.
 * @returns {{ status: string, value: * }} An object containing the status 'valid' and the provided value.
 */
const wrapValueAsValidStatus = (value) => {
  // Return an object marking the value as valid
  return {
    status: "valid",
    value: value
  };
};

module.exports = wrapValueAsValidStatus;