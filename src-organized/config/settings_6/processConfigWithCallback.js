/**
 * Processes a list of configuration items, applies a callback to each, and collects results.
 *
 * @param {Object} sourceObject - The source object to process against each config item.
 * @param {Array} configList - An array of configuration items to process.
 * @param {Function} callback - a function that takes (value, configItem) and returns a boolean.
 * @returns {Object} An object mapping processed config keys to their corresponding values.
 */
function processConfigWithCallback(sourceObject, configList, callback) {
  let result = {};
  const configLength = configList.length;

  // Iterate over each configuration item
  for (let index = 0; index < configLength; index++) {
    const configItem = configList[index];
    // Compute the value for the current config item using Ly
    const value = Ly(sourceObject, configItem);
    // If the callback returns true, add the result to the output object
    if (callback(value, configItem)) {
      // Tq computes the key for the result object
      S4A(result, Tq(configItem, sourceObject), value);
    }
  }

  return result;
}

module.exports = processConfigWithCallback;