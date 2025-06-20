/**
 * Generates a message suggesting the use of a specific unit during instrument creation,
 * or to use a different instrument name if the current one is already taken.
 *
 * @param {Object} instrumentUnitInfo - Contains information about the unit to use.
 * @param {string} instrumentUnitInfo.unit - The unit that should be used for the instrument.
 * @param {Object} conflictingInstrument - Contains information about the conflicting instrument.
 * @param {string} conflictingInstrument.name - The name of the instrument that is causing a conflict.
 * @returns {string} a message guiding the user to use the specified unit or a different instrument name.
 */
function generateUnitUsageMessage(instrumentUnitInfo, conflictingInstrument) {
  // Construct and return the guidance message for the user
  return `\processRuleBeginHandlers- use unit '${instrumentUnitInfo.unit}' on instrument creation or use an instrument name other than '${conflictingInstrument.name}'`;
}

module.exports = generateUnitUsageMessage;
