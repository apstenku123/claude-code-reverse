/**
 * Checks if all instrument and meter identifying fields on the given object are null or undefined.
 *
 * @param {Object} observableData - The object to check for instrument and meter fields.
 * @param {string|null|undefined} observableData.instrumentName - Name of the instrument.
 * @param {string|null|undefined} observableData.instrumentType - Type of the instrument.
 * @param {string|null|undefined} observableData.instrumentUnit - Unit of the instrument.
 * @param {string|null|undefined} observableData.meterName - Name of the meter.
 * @param {string|null|undefined} observableData.meterVersion - Version of the meter.
 * @param {string|null|undefined} observableData.meterSchemaUrl - Schema URL of the meter.
 * @returns {boolean} True if all instrument and meter fields are null or undefined, otherwise false.
 */
function areAllInstrumentAndMeterFieldsNull(observableData) {
  // Check if all relevant fields are null or undefined
  return (
    observableData.instrumentName == null &&
    observableData.instrumentType == null &&
    observableData.instrumentUnit == null &&
    observableData.meterName == null &&
    observableData.meterVersion == null &&
    observableData.meterSchemaUrl == null
  );
}

module.exports = areAllInstrumentAndMeterFieldsNull;