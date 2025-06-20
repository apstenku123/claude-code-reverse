/**
 * Creates an accessor object indicating a valid status and containing the provided value.
 *
 * @param {*} value - The value to be wrapped in the accessor object.
 * @returns {{status: string, value: *}} An object with a 'status' of 'valid' and the provided value.
 */
const createValidAccessor = (value) => {
  // Return an object marking the value as valid
  return {
    status: "valid",
    value: value
  };
};

module.exports = createValidAccessor;