/**
 * Checks whether parsing the provided value using Zo0.safeParse is successful.
 *
 * @param {*} valueToParse - The value to be parsed and validated by Zo0.safeParse.
 * @returns {boolean} True if parsing is successful, otherwise false.
 */
const isSafeParseSuccessful = (valueToParse) => {
  // Attempt to safely parse the value using Zo0'createInteractionAccessor schema
  // The result object contains a 'success' property indicating parsing status
  return Zo0.safeParse(valueToParse).success;
};

module.exports = isSafeParseSuccessful;
