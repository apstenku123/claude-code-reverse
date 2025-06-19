/**
 * Checks if the provided value is valid according to the Io0 schema.
 *
 * @param {any} valueToValidate - The value to be validated against the Io0 schema.
 * @returns {boolean} True if the value is valid according to the schema, false otherwise.
 */
const isValidBySchema = (valueToValidate) => {
  // Use Io0.safeParse to validate the value; return the success property
  return Io0.safeParse(valueToValidate).success;
};

module.exports = isValidBySchema;
