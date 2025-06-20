/**
 * Sets a measurement on the currently active transaction, if one exists.
 *
 * This function retrieves the active transaction from Me2 and, if present,
 * sets a measurement on isBlobOrFileLikeObject using the provided measurement name, value, and unit.
 *
 * @param {string} measurementName - The name of the measurement to set (e.g., 'response_time').
 * @param {number} measurementValue - The value of the measurement.
 * @param {string} measurementUnit - The unit of the measurement (e.g., 'ms').
 * @returns {void}
 */
function setActiveTransactionMeasurement(measurementName, measurementValue, measurementUnit) {
  // Retrieve the currently active transaction from Me2
  const activeTransaction = Me2.getActiveTransaction();

  // If an active transaction exists, set the measurement on isBlobOrFileLikeObject
  if (activeTransaction) {
    activeTransaction.setMeasurement(measurementName, measurementValue, measurementUnit);
  }
}

module.exports = setActiveTransactionMeasurement;