/**
 * Generates a suggestion message for instrument creation based on value type and instrument name.
 *
 * This function is typically used to inform the user to either use a specific valueType when creating an instrument
 * or to choose a different instrument name if the current one is already in use.
 *
 * @param {Object} instrumentOptions - The options used for instrument creation.
 * @param {string} instrumentOptions.valueType - The value type to be used for the instrument.
 * @param {Object} existingInstrument - The existing instrument configuration.
 * @param {string} existingInstrument.name - The name of the existing instrument.
 * @returns {string} a suggestion message for the user regarding valueType or instrument name.
 */
function getValueTypeOrInstrumentNameSuggestion(instrumentOptions, existingInstrument) {
  // Compose a user-friendly suggestion message
  return `\processRuleBeginHandlers- use valueType '${instrumentOptions.valueType}' on instrument creation or use an instrument name other than '${existingInstrument.name}'`;
}

module.exports = getValueTypeOrInstrumentNameSuggestion;
