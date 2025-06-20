/**
 * Determines if the observable is currently active by checking the result of tM6.
 *
 * @param {Object} sourceObservable - The observable source to check.
 * @param {Object} config - Configuration options for the check.
 * @param {Object} subscription - The subscription or query context.
 * @returns {boolean} True if the observable is active (tM6 result is not zero), false otherwise.
 */
const isObservableActive = (sourceObservable, config, subscription) => {
  // tM6 returns a numeric status; non-zero means active
  return tM6(sourceObservable, config, subscription) !== 0;
};

module.exports = isObservableActive;