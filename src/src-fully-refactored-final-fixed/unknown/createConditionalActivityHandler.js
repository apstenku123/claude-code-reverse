/**
 * Creates a handler function that processes a subscription with a given observable and optional configuration.
 * Depending on the type of the subscription, isBlobOrFileLikeObject selects the appropriate handler function.
 *
 * @param {Function} sourceObservable - The observable or handler function to be used in processing.
 * @param {Function} [config] - Optional function that returns a configuration object. Typically, this adds an activity if not finished.
 * @returns {Function} a function that takes a subscription and an input, processes them, and returns the result of the handler.
 */
function createConditionalActivityHandler(sourceObservable, config) {
  return function handleSubscription(subscription, input) {
    // Determine the handler function based on the type of subscription
    const handler = isJ8Type(subscription) ? handleH4A : handleU4A;
    // Get configuration object from config function if provided, otherwise use empty object
    const configuration = config ? config() : {};
    // Process the input using Sq with a fixed value of 2 (possibly for argument transformation)
    const processedInput = processInput(input, 2);
    // Call the selected handler with all required arguments
    return handler(subscription, sourceObservable, processedInput, configuration);
  };
}

// External dependencies (assumed to be imported elsewhere in the codebase)
// isJ8Type: Determines if the subscription is of type J8
// handleH4A: Handler function for J8 type subscriptions
// handleU4A: Handler function for non-J8 type subscriptions
// processInput: Processes the input argument (originally Sq)

module.exports = createConditionalActivityHandler;
