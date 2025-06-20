/**
 * Adds the given source observable to the y1A array if the global threshold sR2 is greater than or equal to the provided threshold value.
 *
 * @param {Object} sourceObservable - The observable/source object to potentially add to y1A.
 * @param {number} thresholdValue - The threshold value to compare against the global sR2.
 * @returns {void}
 */
const addSourceToY1AIfThresholdMet = (sourceObservable, thresholdValue) => {
  // Check if the global threshold sR2 meets or exceeds the provided thresholdValue
  if (sR2 >= thresholdValue) {
    // Add the sourceObservable to the global y1A array
    y1A.push(sourceObservable);
  }
};

module.exports = addSourceToY1AIfThresholdMet;