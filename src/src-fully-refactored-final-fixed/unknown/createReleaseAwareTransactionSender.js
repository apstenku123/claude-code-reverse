/**
 * Creates a transaction sender that attaches a release identifier to certain event types before sending.
 *
 * @param {Function} createTransactionSource - Function that initializes and returns a transaction source object for a given subscription/context.
 * @param {string} releaseIdentifier - The release identifier to attach to specific event types.
 * @returns {Function} a function that takes a subscription/context and returns an enhanced transaction source object.
 */
function createReleaseAwareTransactionSender(createTransactionSource, releaseIdentifier) {
  return function initializeTransactionSender(subscriptionContext) {
    // Obtain the base transaction source for the given context
    const transactionSource = createTransactionSource(subscriptionContext);

    return {
      ...transactionSource,
      /**
       * Sends an event, attaching the release identifier if the event type matches certain criteria.
       * @param {Object} event - The event object to send.
       * @returns {Promise<any>} The result of the send operation.
       */
      send: async function sendEventWithRelease(event) {
        // Check if the event is of a type that should have the release identifier attached
        const eventTypesToTag = ["event", "transaction", "profile", "replay_event"];
        const eventToTag = WN1(event, eventTypesToTag);
        if (eventToTag) {
          // Attach the release identifier to the event
          eventToTag.release = releaseIdentifier;
        }
        // Delegate to the original send method
        return transactionSource.send(event);
      }
    };
  };
}

module.exports = createReleaseAwareTransactionSender;