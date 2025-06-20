/**
 * Processes the body of a subscription object asynchronously and returns the result of a handler function.
 *
 * @async
 * @function createProcessedSubscription
 * @param {Object} subscriptionData - The original subscription object containing a 'body' property to process.
 * @param {Object} config - Configuration or context object passed to the body processor and handler.
 * @returns {Promise<any>} The result of the handler function after processing the subscription body.
 */
async function createProcessedSubscription(subscriptionData, config) {
  // Process the 'body' property asynchronously using the 'mt' function
  const processedBody = await mt(subscriptionData.body, config);

  // Create a new subscription object with the processed body
  const processedSubscription = {
    ...subscriptionData,
    body: processedBody
  };

  // Pass the processed subscription to the handler function and return its result
  return createAndDecorateValidationException(processedSubscription, config);
}

module.exports = createProcessedSubscription;