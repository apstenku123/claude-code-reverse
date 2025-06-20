/**
 * Generates an error message suggesting to use a specific valueType or a different instrument name.
 *
 * @param {Object} instrumentOptions - Options used for instrument creation.
 * @param {string} instrumentOptions.valueType - The type of value expected by the instrument.
 * @param {Object} instrumentConfig - Configuration object for the instrument.
 * @param {string} instrumentConfig.name - The name of the instrument.
 * @returns {string} Error message guiding the user to set the correct valueType or use a different instrument name.
 */
function getInstrumentValueTypeErrorMessage(instrumentOptions, instrumentConfig) {
  // Construct and return the error message with the provided valueType and instrument name
  return `\processRuleBeginHandlers- use valueType '${instrumentOptions.valueType}' on instrument creation or use an instrument name other than '${instrumentConfig.name}'`;
}

module.exports = getInstrumentValueTypeErrorMessage;