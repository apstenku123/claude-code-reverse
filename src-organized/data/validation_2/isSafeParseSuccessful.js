/**
 * Checks if the provided data can be safely parsed by Bo0'createInteractionAccessor safeParse method.
 *
 * @param {any} dataToParse - The data to validate using Bo0.safeParse.
 * @returns {boolean} True if parsing is successful, false otherwise.
 */
const isSafeParseSuccessful = (dataToParse) => {
  // Use Bo0'createInteractionAccessor safeParse method to validate the input
  // The result object contains a 'success' boolean indicating parsing status
  return Bo0.safeParse(dataToParse).success;
};

module.exports = isSafeParseSuccessful;
