/**
 * Creates a handler function for conditional subscription logic based on the provided observable and configuration.
 *
 * If the source observable and config meet certain criteria, isBlobOrFileLikeObject returns a specialized handler. Otherwise,
 * isBlobOrFileLikeObject returns a function that processes a subscription, extracting a value and applying further logic.
 *
 * @param {object} sourceObservable - The observable or source object to operate on.
 * @param {object} config - Configuration or fallback value for the subscription logic.
 * @returns {function|any} a handler function for processing subscriptions, or the result of a specialized handler.
 */
function createConditionalSubscriptionHandler(sourceObservable, config) {
  // If sourceObservable and config meet specific conditions, use a specialized handler
  if (Uy(sourceObservable) && A21(config)) {
    // kH extracts a key or identifier from the observable
    // B21 applies the config to the extracted key
    return B21(kH(sourceObservable), config);
  }

  // Otherwise, return a handler function for processing subscriptions
  return function handleSubscription(subscription) {
    // Extract a value from the subscription using the sourceObservable as a key or selector
    const extractedValue = c2A(subscription, sourceObservable);

    // If the extracted value is undefined and also strictly equal to config, use a fallback handler
    if (extractedValue === undefined && extractedValue === config) {
      // Q21 likely retrieves a default or fallback value
      return Q21(subscription, sourceObservable);
    }

    // Otherwise, process using the config, extracted value, and a bitwise combination of flags
    return ky(config, extractedValue, Rb2 | Ob2);
  };
}

module.exports = createConditionalSubscriptionHandler;
