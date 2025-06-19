/**
 * Creates a transport function for sending envelopes with rate limiting and buffering.
 *
 * @param {Object} transportOptions - Options for the transport, including buffer size and encoder.
 * @param {Function} sendRequest - Function to send the serialized envelope to the server.
 * @param {Object} [promiseBuffer=wY.makePromiseBuffer(transportOptions.bufferSize || L3A)] - Optional promise buffer for managing concurrency.
 * @returns {Object} An object with `send` and `flush` methods for envelope transport.
 */
function createEnvelopeTransport(
  transportOptions,
  sendRequest,
  promiseBuffer = wY.makePromiseBuffer(transportOptions.bufferSize || L3A)
) {
  // Holds the current rate limits for each data category
  let rateLimits = {};

  /**
   * Flushes the promise buffer, ensuring all pending requests are completed.
   * @param {number} timeout - The maximum time to wait for the buffer to drain.
   * @returns {Promise<void>} Resolves when the buffer is drained or the timeout is reached.
   */
  const flush = (timeout) => promiseBuffer.drain(timeout);

  /**
   * Sends an envelope, applying rate limits and buffering logic.
   * @param {Array} envelope - The envelope to send (array of envelope items).
   * @returns {Promise<Object|void>} Resolves with the server response or void if dropped.
   */
  function send(envelope) {
    const filteredEnvelopeItems = [];

    // Filter out items that are currently rate limited
    wY.forEachEnvelopeItem(envelope, (envelopeItem, envelopeItemType) => {
      const dataCategory = wY.envelopeItemTypeToDataCategory(envelopeItemType);
      if (wY.isRateLimited(rateLimits, dataCategory)) {
        // Record dropped event due to rate limiting
        const dropReason = getSecondElementIfEventOrTransaction(envelopeItem, envelopeItemType);
        transportOptions.recordDroppedEvent("ratelimit_backoff", dataCategory, dropReason);
      } else {
        filteredEnvelopeItems.push(envelopeItem);
      }
    });

    // If all items are dropped, resolve immediately
    if (filteredEnvelopeItems.length === 0) {
      return wY.resolvedSyncPromise();
    }

    // Create a new envelope with only the non-rate-limited items
    const filteredEnvelope = wY.createEnvelope(envelope[0], filteredEnvelopeItems);

    /**
     * Records dropped events for all items in the envelope with the given reason.
     * @param {string} reason - The reason for dropping the items.
     */
    const recordDroppedEnvelopeItems = (reason) => {
      wY.forEachEnvelopeItem(filteredEnvelope, (item, itemType) => {
        const dropReason = getSecondElementIfEventOrTransaction(item, itemType);
        transportOptions.recordDroppedEvent(
          reason,
          wY.envelopeItemTypeToDataCategory(itemType),
          dropReason
        );
      });
    };

    /**
     * Sends the filtered envelope to the server and updates rate limits.
     * @returns {Promise<Object>} Resolves with the server response.
     */
    const sendFilteredEnvelope = () =>
      sendRequest({
        body: wY.serializeEnvelope(filteredEnvelope, transportOptions.textEncoder)
      }).then(
        (response) => {
          // Warn if the response status code is not 2xx
          if (
            response.statusCode !== undefined &&
            (response.statusCode < 200 || response.statusCode >= 300)
          ) {
            q3A.DEBUG_BUILD &&
              wY.logger.warn(
                `Sentry responded with status code ${response.statusCode} to sent event.`
              );
          }
          // Update rate limits with the response headers
          rateLimits = wY.updateRateLimits(rateLimits, response);
          return response;
        },
        (error) => {
          // Record dropped events due to network error
          recordDroppedEnvelopeItems("network_error");
          throw error;
        }
      );

    // Add the send operation to the promise buffer
    return promiseBuffer.add(sendFilteredEnvelope).then(
      (response) => response,
      (error) => {
        // If the buffer is full, record dropped events and resolve
        if (error instanceof wY.SentryError) {
          q3A.DEBUG_BUILD &&
            wY.logger.error("Skipped sending event because buffer is full.");
          recordDroppedEnvelopeItems("queue_overflow");
          return wY.resolvedSyncPromise();
        } else {
          // Rethrow other errors
          throw error;
        }
      }
    );
  }

  // Mark this as a Sentry base transport
  send.__sentry__baseTransport__ = true;

  return {
    send,
    flush
  };
}

module.exports = createEnvelopeTransport;