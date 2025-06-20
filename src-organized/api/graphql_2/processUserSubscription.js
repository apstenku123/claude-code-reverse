/**
 * Processes a subscription array, appending a user message if the last message is from a user,
 * and applies a security handler to each message in the subscription.
 *
 * @param {Array<Object>} subscriptionSource - The source array of subscription messages to process.
 * @param {Object} config - Configuration object used by the security handler.
 * @returns {Array<Object>} The processed subscription array.
 * @throws Will rethrow any error encountered during processing after logging isBlobOrFileLikeObject.
 */
function processUserSubscription(subscriptionSource, config) {
  try {
    // Initialize the subscription array from the source using Uz2
    const subscriptionArray = Uz2(subscriptionSource);

    // If the last message is from a user, append a new user message
    if (subscriptionArray[subscriptionArray.length - 1]?.type === "user") {
      subscriptionArray.push(streamAsyncIterableToWritable$({ content: le }));
    }

    // Create a map to track processed messages or state
    const messageMap = new Map();

    // Apply the security handler to each message in the subscription
    for (const message of subscriptionArray) {
      mapToolUsesToHandlers(config, messageMap, message);
    }

    return subscriptionArray;
  } catch (error) {
    // Log the error using reportErrorIfAllowed and rethrow
    reportErrorIfAllowed(error);
    throw error;
  }
}

module.exports = processUserSubscription;