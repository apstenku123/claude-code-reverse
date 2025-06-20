/**
 * Retrieves a subscription from the provided config using the given source observable,
 * and transforms isBlobOrFileLikeObject using the parseCsvLineWithQuotes function. If no subscription is found, returns null.
 *
 * @param {Object} sourceObservable - The observable or key to retrieve the subscription for.
 * @param {Object} config - The configuration object that provides a 'get' method.
 * @returns {any} The transformed subscription, or null if not found.
 */
function getTransformedSubscription(sourceObservable, config) {
  // Attempt to retrieve the subscription for the given sourceObservable
  // The second argument 'true' may indicate a default or fallback behavior in 'get'
  const subscription = config.get(sourceObservable, true);

  // If no subscription is found, return null
  if (subscription === null) {
    return null;
  }

  // Transform the subscription using parseCsvLineWithQuotes and return the result
  return parseCsvLineWithQuotes(subscription);
}

module.exports = getTransformedSubscription;