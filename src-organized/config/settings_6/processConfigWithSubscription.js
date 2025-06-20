/**
 * Processes a configuration array by applying a subscription function to each config item,
 * and accumulates the results into an output object if the subscription returns true.
 *
 * @param {Object} sourceObservable - The source object or observable to process against each config item.
 * @param {Array} configArray - An array of configuration items to process.
 * @param {Function} subscriptionFn - a function that takes (result, configItem) and returns a boolean.
 * @returns {Object} An object mapping transformed config keys to their processed values.
 */
function processConfigWithSubscription(sourceObservable, configArray, subscriptionFn) {
  const output = {};
  const configLength = configArray.length;

  // Iterate over each configuration item
  for (let index = 0; index < configLength; index++) {
    const configItem = configArray[index];
    // Process the config item with the source observable
    const processedValue = Ly(sourceObservable, configItem);
    // If the subscription function returns true, add to output
    if (subscriptionFn(processedValue, configItem)) {
      // Transform the config item key and set the value in the output object
      S4A(output, Tq(configItem, sourceObservable), processedValue);
    }
  }
  return output;
}

module.exports = processConfigWithSubscription;