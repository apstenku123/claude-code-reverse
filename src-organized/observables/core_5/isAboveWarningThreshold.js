/**
 * Determines if the provided observable is above the warning threshold.
 *
 * @param {Observable} sourceObservable - The observable to check against the warning threshold.
 * @returns {boolean} True if the observable is above the warning threshold, false otherwise.
 */
function isAboveWarningThreshold(sourceObservable) {
  // calculateThresholdStatus processes the observable with the warning threshold configuration (W11)
  // and returns an object containing the isAboveWarningThreshold property.
  return calculateThresholdStatus(sourceObservable, W11).isAboveWarningThreshold;
}

module.exports = isAboveWarningThreshold;