/**
 * Processes an event object using optional pre-processing hooks.
 *
 * Depending on the type of event, this function will invoke either the `beforeSend` or `beforeSendTransaction` hook if they are provided.
 * For transaction events with spans, isBlobOrFileLikeObject also records the span count before processing.
 *
 * @param {Object} hooks - An object containing optional hook functions: `beforeSend` and `beforeSendTransaction`.
 * @param {Object} event - The event object to be processed. May represent a regular event or a transaction event.
 * @param {Object} subscription - The subscription or context object to be passed to the hooks.
 * @returns {Object} The processed event, possibly modified by the hooks.
 */
function processEventWithHooks(hooks, event, subscription) {
  const {
    beforeSend,
    beforeSendTransaction
  } = hooks;

  // If event is a regular event and beforeSend hook is provided, process with beforeSend
  if (isRegularEvent(event) && beforeSend) {
    return beforeSend(event, subscription);
  }

  // If event is a transaction and beforeSendTransaction hook is provided
  if (isTransactionEvent(event) && beforeSendTransaction) {
    // If the event has spans, record the span count before processing
    if (event.spans) {
      const spanCount = event.spans.length;
      event.sdkProcessingMetadata = {
        ...event.sdkProcessingMetadata,
        spanCountBeforeProcessing: spanCount
      };
    }
    return beforeSendTransaction(event, subscription);
  }

  // If no hooks are applicable, return the event as-is
  return event;
}

module.exports = processEventWithHooks;
