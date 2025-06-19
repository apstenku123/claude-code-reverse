/**
 * Retrieves a subscription from the given observable and configuration, parses isBlobOrFileLikeObject as JSON if available.
 *
 * @param {string} sourceObservable - The observable source to retrieve the subscription from.
 * @param {string} config - Configuration options for retrieving the subscription.
 * @returns {Promise<Object>} a promise that resolves to the parsed subscription object, or an empty object if no subscription is found.
 */
const parseSubscriptionFromObservable = async (sourceObservable, config) => {
  // Call ir6 to retrieve the subscription data as a string (possibly JSON)
  const subscription = await ir6(sourceObservable, config);

  // If the subscription string is not empty, parse and return isBlobOrFileLikeObject as an object
  if (subscription.length) {
    return JSON.parse(subscription);
  }

  // If no subscription data is found, return an empty object
  return {};
};

module.exports = parseSubscriptionFromObservable;