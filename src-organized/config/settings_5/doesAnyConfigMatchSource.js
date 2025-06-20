/**
 * Checks if any configuration in the array matches the source observable using the stringMatchesPattern comparison function.
 *
 * @param {any} sourceObservable - The source observable or value to compare against each config.
 * @param {Array<any>} configArray - An array of configuration objects to check against the source observable.
 * @param {boolean} [useSubscription=false] - Whether to use subscription semantics in the comparison.
 * @returns {boolean} True if any config matches the source observable according to stringMatchesPattern; otherwise, false.
 */
function doesAnyConfigMatchSource(sourceObservable, configArray = [], useSubscription = false) {
  // Check if any config in the array matches the source observable using stringMatchesPattern
  return configArray.some(configItem => stringMatchesPattern(sourceObservable, configItem, useSubscription));
}

module.exports = doesAnyConfigMatchSource;