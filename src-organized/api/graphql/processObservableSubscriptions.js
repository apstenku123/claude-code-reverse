/**
 * Iterates over an array of observable subscription objects, and for each function property found within nested objects,
 * applies the wrapGraphQLResolverWithTracing handler function with the subscription, property key, function key, and configuration.
 *
 * @param {Array<Object>} observableSubscriptions - Array of observable subscription objects to process.
 * @param {any} config - Configuration or context to pass to the wrapGraphQLResolverWithTracing handler function.
 * @returns {Array<Object>} The processed array of observable subscription objects (unchanged structure).
 */
function processObservableSubscriptions(observableSubscriptions, config) {
  return observableSubscriptions.map(subscription => {
    // Iterate over each top-level property in the subscription object
    Object.keys(subscription).forEach(propertyKey => {
      // Iterate over each nested property in the current property object
      Object.keys(subscription[propertyKey]).forEach(functionKey => {
        // Only process if the nested property is a function
        if (typeof subscription[propertyKey][functionKey] !== "function") return;
        // Apply the handler function to the function property
        wrapGraphQLResolverWithTracing(subscription, propertyKey, functionKey, config);
      });
    });
    // Return the (possibly mutated) subscription object
    return subscription;
  });
}

module.exports = processObservableSubscriptions;