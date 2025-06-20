/**
 * Handles dispatching an action with a subscription, managing errors gracefully.
 *
 * @param {Object} actionPayload - The payload for the action to dispatch.
 * @param {Object} subscriptionConfig - Configuration options for the subscription.
 * @returns {any} The return value from the subscription, or the result of error destruction if an error occurs.
 */
function dispatchWithSubscriptionHandling(actionPayload, subscriptionConfig) {
  try {
    // Create a new subscription object using the provided payload and config
    const subscription = new gd0(actionPayload, subscriptionConfig);

    // Dispatch the action, spreading the payload and adding the subscription'createInteractionAccessor request body
    this.dispatch({
      ...actionPayload,
      body: subscription.req
    }, subscription);

    // Return the result from the subscription
    return subscription.ret;
  } catch (error) {
    // On error, destroy the error using CK6 and return the result
    return new CK6().destroy(error);
  }
}

module.exports = dispatchWithSubscriptionHandling;