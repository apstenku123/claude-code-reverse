/**
 * Determines if the provided observable is above the warning threshold.
 *
 * @param {Observable} sourceObservable - The observable to check against the warning threshold.
 * @returns {boolean} True if the observable is above the warning threshold, otherwise false.
 */
function isObservableAboveWarningThreshold(sourceObservable) {
  // calculateThresholdStatus processes the observable with a specific configuration (W11)
  // and returns an object containing the isAboveWarningThreshold property.
  const result = calculateThresholdStatus(sourceObservable, W11);
  return result.isAboveWarningThreshold;
}

module.exports = isObservableAboveWarningThreshold;