/**
 * Wraps a transaction source function to inject a release property into certain event types before sending.
 *
 * @param {Function} createTransactionSource - Function that creates a transaction source object for a given subscription/context.
 * @param {string} releaseVersion - The release version to inject into outgoing events.
 * @returns {Function} a function that takes a subscription/context and returns a transaction source object with an overridden send method.
 */
function wrapTransactionWithRelease(createTransactionSource, releaseVersion) {
  return function (subscriptionContext) {
    // Create the original transaction source object
    const transactionSource = createTransactionSource(subscriptionContext);

    return {
      ...transactionSource,
      /**
       * Overrides the send method to inject the release version into specific event types.
       *
       * @param {Object} eventPayload - The event payload to send.
       * @returns {Promise<any>} The result of the original send method.
       */
      send: async function (eventPayload) {
        // Check if the event type matches one of the specified types
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
        // Send the (possibly modified) event using the original send method
        return transactionSource.send(eventPayload);
      }
    };
  };
}

module.exports = wrapTransactionWithRelease;