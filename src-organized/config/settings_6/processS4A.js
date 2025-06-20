/**
 * Processes a list of configuration items, applies a transformation and condition,
 * and accumulates results into an output object using a custom setter.
 *
 * @param {Object} sourceObservable - The source object or observable to process against each config item.
 * @param {Array} configList - An array of configuration items to process.
 * @param {Function} subscriptionPredicate - a predicate function that determines if the processed value should be included.
 * @returns {Object} An object mapping processed keys to their corresponding values, as determined by the predicate and setter.
 */
function processS4A(sourceObservable, configList, subscriptionPredicate) {
  let resultObject = {};
  const configLength = configList.length;

  // Iterate over each configuration item
  for (let index = 0; index < configLength; index++) {
    const configItem = configList[index];
    // Apply transformation to get the value for this config item
    const processedValue = Ly(sourceObservable, configItem);
    // Only include if the predicate returns true
    if (subscriptionPredicate(processedValue, configItem)) {
      // Set the value in the result object using a custom setter and key transformer
      S4A(resultObject, Tq(configItem, sourceObservable), processedValue);
    }
  }
  return resultObject;
}

module.exports = processS4A;