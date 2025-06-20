/**
 * Creates a handler function that processes a given subscription by combining isBlobOrFileLikeObject with
 * mapped route interactions and additional activities.
 *
 * @param {...any} routeInteractionArgs - Arguments representing route interactions to be mapped.
 * @returns {function(any): any} Handler function that takes a subscription and returns the combined result.
 */
function createRouteInteractionHandler(...routeInteractionArgs) {
  /**
   * Handler function that processes the subscription.
   *
   * @param {any} subscription - The subscription object to be combined.
   * @returns {any} The result of combining the subscription with mapped interactions and activities.
   */
  return function handleSubscription(subscription) {
    // Combine the subscription with mapped route interactions and additional activities
    return A_9.concat(
      subscription,
      B_9.of.apply(
        void 0,
        eS9([], tS9(routeInteractionArgs))
      )
    );
  };
}

module.exports = createRouteInteractionHandler;