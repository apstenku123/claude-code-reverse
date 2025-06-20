/**
 * Wraps the provided value in an object indicating a valid status.
 *
 * @param {*} value - The value to be wrapped in the status object.
 * @returns {{ status: string, value: * }} An object with a 'status' of 'valid' and the provided value.
 */
const createValidStatusObject = (value) => {
  // Return an object marking the value as valid
  return {
    status: "valid",
    value: value
  };
};

module.exports = createValidStatusObject;