/**
 * Applies a configuration to each subscription in the source array.
 * For each item in the source array:
 *   - If isBlobOrFileLikeObject is a function, applies wrapExpressMiddlewareWithSentryTracing(presumably a decorator or enhancer) with the config.
 *   - If isBlobOrFileLikeObject is an array, applies the same logic recursively to each item in the sub-array.
 *   - Otherwise, returns the item as-is.
 *
 * @param {Array<Function|Array<any>|any>} sourceSubscriptions - The array of subscriptions (functions, arrays, or other values).
 * @param {any} config - The configuration object to apply to each function subscription.
 * @returns {Array<any>} The transformed array with config applied to functions and nested arrays processed recursively.
 */
function mapSubscriptionsWithConfig(sourceSubscriptions, config) {
  return sourceSubscriptions.map(subscription => {
    // If the subscription is a function, apply wrapExpressMiddlewareWithSentryTracing with the config
    if (typeof subscription === "function") {
      return wrapExpressMiddlewareWithSentryTracing(subscription, config);
    }
    // If the subscription is an array, recursively process each item
    if (Array.isArray(subscription)) {
      return subscription.map(nestedSubscription => {
        if (typeof nestedSubscription === "function") {
          return wrapExpressMiddlewareWithSentryTracing(nestedSubscription, config);
        }
        // Return non-function items as-is
        return nestedSubscription;
      });
    }
    // Return non-function, non-array items as-is
    return subscription;
  });
}

module.exports = mapSubscriptionsWithConfig;