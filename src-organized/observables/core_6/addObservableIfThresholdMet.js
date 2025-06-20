/**
 * Adds the provided observable to the global observable list if the threshold is met.
 *
 * @param {Object} observable - The observable to potentially add to the list.
 * @param {Object} config - The configuration object, used to determine the threshold.
 * @returns {void}
 *
 * @example
 * addObservableIfThresholdMet(myObservable, myConfig);
 */
const addObservableIfThresholdMet = (observable, config) => {
  // Check if the global threshold (sR2) is greater than or equal to the config
  if (sR2 >= config) {
    // Add the observable to the global observable list (y1A)
    y1A.push(observable);
  }
};

module.exports = addObservableIfThresholdMet;