/**
 * Checks if the provided input is valid according to the Io0 schema.
 *
 * @param {any} inputValue - The value to validate against the Io0 schema.
 * @returns {boolean} Returns true if the input is valid according to the schema, otherwise false.
 */
const isInputValidAccordingToSchema = (inputValue) => {
  // Use Io0.safeParse to validate the input; returns an object with a 'success' boolean
  return Io0.safeParse(inputValue).success;
};

module.exports = isInputValidAccordingToSchema;
