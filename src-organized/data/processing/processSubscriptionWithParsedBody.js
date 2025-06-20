/**
 * Processes a subscription object by parsing its body and handling potential model stream errors.
 *
 * This function takes a subscription (which includes a body that may be an observable or stream),
 * parses and collects the body as JSON, and then passes the updated subscription to the error handler.
 *
 * @async
 * @param {Object} sourceSubscription - The original subscription object containing a body property.
 * @param {Object} config - Configuration object used for parsing and error handling.
 * @returns {Promise<Object>} The result of handleModelStreamError, which may be a decorated error or processed subscription.
 */
async function processSubscriptionWithParsedBody(sourceSubscription, config) {
  // Parse and collect the body from the source subscription
  const parsedBody = await collectAndParseBody(sourceSubscription.body, config);

  // Create a new subscription object with the parsed body
  const updatedSubscription = {
    ...sourceSubscription,
    body: parsedBody
  };

  // Handle potential model stream errors using the updated subscription
  return handleModelStreamError(updatedSubscription, config);
}

module.exports = processSubscriptionWithParsedBody;