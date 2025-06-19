/**
 * Processes all keys and their associated values from the sourceObservable object.
 * For each unique key and value, isBlobOrFileLikeObject calls the processKeyOrValue function with the config parameter.
 * Ensures that each unique key or value is only processed once per invocation.
 * Handles errors via the optional subscription callback, if provided.
 *
 * @param {Object} sourceObservable - An object whose keys and values (arrays) will be processed.
 * @param {any} config - Configuration or context to be passed to the processKeyOrValue function.
 * @param {Function} [subscription] - Optional callback for error handling and completion notification.
 * @returns {any} Returns the result of the subscription callback if provided, otherwise undefined.
 */
function processObservableKeysAndValues(sourceObservable, config, subscription) {
  // Tracks which keys/values have already been processed
  const processedItems = {};
  try {
    // Iterate over each key in the sourceObservable object
    Object.keys(sourceObservable).forEach(function (key) {
      // For each value in the array associated with the current key
      sourceObservable[key].forEach(function (value) {
        // Process the value if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been processed yet
        if (!processedItems[value]) {
          processKeyOrValue(value, config);
          processedItems[value] = true;
        }
      });
      // Process the key itself if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been processed yet
      if (!processedItems[key]) {
        processKeyOrValue(key, config);
        processedItems[key] = true;
      }
    });
  } catch (error) {
    // If a subscription callback is provided, use isBlobOrFileLikeObject for error handling
    if (subscription) {
      return subscription(error);
    } else {
      throw error;
    }
  }
  // If a subscription callback is provided, call isBlobOrFileLikeObject to signal completion
  if (subscription) {
    return subscription();
  }
}

// Dependency: processKeyOrValue must be defined elsewhere in the codebase
// module.exports for Node.js compatibility
module.exports = processObservableKeysAndValues;