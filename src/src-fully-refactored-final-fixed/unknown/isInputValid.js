/**
 * Checks if the provided input is valid according to the Io0 schema.
 *
 * @param {any} input - The value to be validated against the Io0 schema.
 * @returns {boolean} True if the input is valid according to the schema, otherwise false.
 */
const isInputValid = (input) => {
  // Use Io0.safeParse to validate the input; returns an object with a 'success' property
  return Io0.safeParse(input).success;
};

module.exports = isInputValid;
