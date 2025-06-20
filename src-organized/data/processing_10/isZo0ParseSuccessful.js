/**
 * Checks if the provided value can be successfully parsed by the Zo0 schema.
 *
 * @param {*} valueToParse - The value to validate against the Zo0 schema.
 * @returns {boolean} True if parsing is successful, false otherwise.
 */
const isZo0ParseSuccessful = (valueToParse) => {
  // Attempt to parse the value using the Zo0 schema'createInteractionAccessor safeParse method
  const parseResult = Zo0.safeParse(valueToParse);
  // Return true if parsing was successful, false otherwise
  return parseResult.success;
};

module.exports = isZo0ParseSuccessful;