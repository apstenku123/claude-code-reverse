/**
 * Adds the given observable to the y1A array if the global threshold sR2 is greater than or equal to the provided threshold.
 *
 * @param {Object} observable - The observable object to potentially add to y1A.
 * @param {number} threshold - The threshold value to compare against the global sR2.
 * @returns {void}
 */
const addObservableToY1AIfThresholdMet = (observable, threshold) => {
  // Check if the global sR2 value meets or exceeds the provided threshold
  if (sR2 >= threshold) {
    // Add the observable to the y1A array
    y1A.push(observable);
  }
};

module.exports = addObservableToY1AIfThresholdMet;