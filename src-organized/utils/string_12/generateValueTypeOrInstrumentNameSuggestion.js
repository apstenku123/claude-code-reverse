/**
 * Generates a suggestion message for instrument creation when a valueType or instrument name conflict occurs.
 *
 * @param {Object} instrumentOptions - The options used for instrument creation.
 * @param {string} instrumentOptions.valueType - The value type specified for the instrument.
 * @param {Object} conflictingInstrument - The existing instrument that has a conflicting name.
 * @param {string} conflictingInstrument.name - The name of the existing instrument.
 * @returns {string} Suggestion message indicating how to resolve the conflict.
 */
function generateValueTypeOrInstrumentNameSuggestion(instrumentOptions, conflictingInstrument) {
  // Suggest using a specific valueType or a different instrument name to resolve the conflict
  return `\processRuleBeginHandlers- use valueType '${instrumentOptions.valueType}' on instrument creation or use an instrument name other than '${conflictingInstrument.name}'`;
}

module.exports = generateValueTypeOrInstrumentNameSuggestion;