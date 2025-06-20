/**
 * Generates a suggestion message for instrument creation regarding unit usage.
 *
 * @param {Object} instrumentUnitInfo - Contains information about the unit to use.
 * @param {string} instrumentUnitInfo.unit - The unit that should be used for the instrument.
 * @param {Object} conflictingInstrumentInfo - Contains information about the conflicting instrument.
 * @param {string} conflictingInstrumentInfo.name - The name of the instrument that is causing the conflict.
 * @returns {string} Suggestion message for the user about instrument unit usage.
 */
function getInstrumentUnitSuggestionMessage(instrumentUnitInfo, conflictingInstrumentInfo) {
  // Return a formatted message guiding the user to use the correct unit or a different instrument name
  return `\processRuleBeginHandlers- use unit '${instrumentUnitInfo.unit}' on instrument creation or use an instrument name other than '${conflictingInstrumentInfo.name}'`;
}

module.exports = getInstrumentUnitSuggestionMessage;