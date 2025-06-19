/**
 * Checks if the provided input is valid according to the Do0 schema parser.
 *
 * @param {any} input - The value to be validated and parsed.
 * @returns {boolean} True if the input is successfully parsed and valid, otherwise false.
 */
const isValidParsedInput = (input) => {
  // Use Do0'createInteractionAccessor safeParse method to validate the input.
  // The result object contains a 'success' property indicating validity.
  return Do0.safeParse(input).success;
};

module.exports = isValidParsedInput;
