/**
 * Creates a transport function for sending envelopes with rate limiting and buffering.
 *
 * @param {Object} transportOptions - Options for the transport, including bufferSize and textEncoder.
 * @param {Function} sendRequest - Function to send the serialized envelope (returns a Promise).
 * @param {Object} [promiseBuffer=wY.makePromiseBuffer(transportOptions.bufferSize || L3A)] - Optional promise buffer for controlling concurrency.
 * @returns {Object} An object with `send` and `flush` methods for envelope transport.
 */
function createRateLimitedEnvelopeTransport(
  transportOptions,
  sendRequest,
  promiseBuffer = wY.makePromiseBuffer(transportOptions.bufferSize || L3A)
) {
  // Stores the current rate limits for each data category
  let rateLimits = {};

  /**
   * Flushes the promise buffer, draining all pending requests.
   * @param {number} timeout - The maximum time to wait for the buffer to drain.
   * @returns {Promise<void>} Resolves when the buffer is drained or the timeout is reached.
   */
  const flush = (timeout) => promiseBuffer.drain(timeout);

  /**
   * Sends an envelope, respecting rate limits and buffering.
   * Drops items that are currently rate limited and records dropped events.
   *
   * @param {Array} envelope - The envelope to send (array of envelope items).
   * @returns {Promise<Object|void>} Resolves with the response or void if dropped due to buffer overflow.
   */
  function send(envelope) {
    const itemsToSend = [];

    // Filter envelope items, dropping those that are rate limited
    wY.forEachEnvelopeItem(envelope, (item, itemType) => {
      const dataCategory = wY.envelopeItemTypeToDataCategory(itemType);
      if (wY.isRateLimited(rateLimits, dataCategory)) {
        // Record dropped event due to rate limiting
        const reason = getSecondElementIfEventOrTransaction(item, itemType);
        transportOptions.recordDroppedEvent("ratelimit_backoff", dataCategory, reason);
      } else {
        itemsToSend.push(item);
      }
    });

    // If all items are dropped, resolve synchronously
    if (itemsToSend.length === 0) {
      return wY.resolvedSyncPromise();
    }

    // Create a new envelope with only the items to send
    const filteredEnvelope = wY.createEnvelope(envelope[0], itemsToSend);

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
     * Sends the envelope using the provided sendRequest function.
     * Updates rate limits based on the response.
     * @returns {Promise<Object>} The response from sendRequest.
     */
    const sendEnvelopeRequest = () =>
      sendRequest({
        body: wY.serializeEnvelope(filteredEnvelope, transportOptions.textEncoder)
      }).then(
        (response) => {
          // Warn if Sentry responds with a non-2xx status code
          if (
            response.statusCode !== undefined &&
            (response.statusCode < 200 || response.statusCode >= 300)
          ) {
            q3A.DEBUG_BUILD &&
              wY.logger.warn(
                `Sentry responded with status code ${response.statusCode} to sent event.`
              );
          }
          // Update rate limits
          rateLimits = wY.updateRateLimits(rateLimits, response);
          return response;
        },
        (error) => {
          // Record dropped items due to network error and rethrow
          recordDroppedEnvelopeItems("network_error");
          throw error;
        }
      );

    // Add the send request to the buffer
    return promiseBuffer.add(sendEnvelopeRequest).then(
      (response) => response,
      (error) => {
        // If buffer is full, record dropped events and resolve synchronously
        if (error instanceof wY.SentryError) {
          q3A.DEBUG_BUILD &&
            wY.logger.error(
              "Skipped sending event because buffer is full."
            );
          recordDroppedEnvelopeItems("queue_overflow");
          return wY.resolvedSyncPromise();
        } else {
          // Rethrow other errors
          throw error;
        }
      }
    );
  }

  // Mark the send function as a Sentry base transport
  send.__sentry__baseTransport__ = true;

  return {
    send,
    flush
  };
}

module.exports = createRateLimitedEnvelopeTransport;
