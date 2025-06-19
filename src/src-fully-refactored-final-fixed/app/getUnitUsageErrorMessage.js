/**
 * Generates an error message suggesting the use of a specific unit on instrument creation
 * or the use of a different instrument name.
 *
 * @param {Object} instrumentUnitInfo - Information about the instrument'createInteractionAccessor unit.
 * @param {string} instrumentUnitInfo.unit - The unit that should be used.
 * @param {Object} conflictingInstrumentInfo - Information about the conflicting instrument.
 * @param {string} conflictingInstrumentInfo.name - The name of the conflicting instrument.
 * @returns {string} Error message guiding the user to use the correct unit or a different instrument name.
 */
function getUnitUsageErrorMessage(instrumentUnitInfo, conflictingInstrumentInfo) {
  // Construct and return the error message with the relevant unit and instrument name
  return `\processRuleBeginHandlers- use unit '${instrumentUnitInfo.unit}' on instrument creation or use an instrument name other than '${conflictingInstrumentInfo.name}'`;
}

module.exports = getUnitUsageErrorMessage;