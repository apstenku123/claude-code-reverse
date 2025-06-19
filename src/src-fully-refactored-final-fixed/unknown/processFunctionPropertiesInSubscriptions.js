/**
 * Iterates over an array of subscription objects, and for each property of each subscription,
 * finds all function-type properties and applies the wrapGraphQLResolverWithTracing handler to them with the provided config.
 *
 * @param {Array<Object>} subscriptions - Array of subscription objects to process
 * @param {any} config - Configuration or context to pass to the wrapGraphQLResolverWithTracing handler
 * @returns {Array<Object>} The original array of subscriptions, after processing
 */
function processFunctionPropertiesInSubscriptions(subscriptions, config) {
  return subscriptions.map(subscription => {
    // Iterate over each property in the subscription object
    Object.keys(subscription).forEach(propertyKey => {
      const propertyValue = subscription[propertyKey];
      // Iterate over each key in the nested property object
      Object.keys(propertyValue).forEach(nestedKey => {
        const nestedValue = propertyValue[nestedKey];
        // If the nested property is a function, apply the wrapGraphQLResolverWithTracing handler
        if (typeof nestedValue !== "function") return;
        wrapGraphQLResolverWithTracing(subscription, propertyKey, nestedKey, config);
      });
    });
    // Return the subscription object (unchanged in structure)
    return subscription;
  });
}

module.exports = processFunctionPropertiesInSubscriptions;