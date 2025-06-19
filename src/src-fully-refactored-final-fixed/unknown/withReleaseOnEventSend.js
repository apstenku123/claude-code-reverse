/**
 * Enhances an observable factory by injecting a release property into certain event payloads before sending.
 *
 * @param {Function} createObservable - Factory function that creates an observable or transaction handler from a subscription/context.
 * @param {string} releaseVersion - The release version string to inject into outgoing event payloads.
 * @returns {Function} a function that takes a subscription/context and returns an enhanced observable/handler.
 */
function withReleaseOnEventSend(createObservable, releaseVersion) {
  return function enhancedObservableFactory(subscriptionContext) {
    // Create the original observable/handler
    const originalHandler = createObservable(subscriptionContext);

    return {
      ...originalHandler,
      /**
       * Sends an event, injecting the release version if the event type matches certain criteria.
       *
       * @param {Object} eventPayload - The event payload to send.
       * @returns {Promise<any>} The result of the original send operation.
       */
      send: async function sendEventWithRelease(eventPayload) {
        // Check if the event type is one of the specified types
        const eventToModify = WN1(eventPayload, [
          "event",
          "transaction",
          "profile",
          "replay_event"
        ]);
        // If the event matches, inject the release version
        if (eventToModify) {
          eventToModify.release = releaseVersion;
        }
        // Delegate to the original send method
        return originalHandler.send(eventPayload);
      }
    };
  };
}

module.exports = withReleaseOnEventSend;