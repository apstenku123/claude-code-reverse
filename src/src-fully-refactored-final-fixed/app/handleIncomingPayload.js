/**
 * Handles an incoming payload, ensuring isBlobOrFileLikeObject does not exceed the maximum allowed payload size.
 * If the payload size is within the allowed limit, isBlobOrFileLikeObject is queued for further processing.
 * If the payload size exceeds the limit, an error is set and the connection is reset.
 *
 * @param {Buffer | string} payload - The incoming data payload to process.
 * @returns {void}
 */
function handleIncomingPayload(payload) {
  // Increment the current payload size by the length of the new payload
  this[currentPayloadSizeSymbol] += payload.length;

  // Check if the payload size is within the allowed maximum, or if there is no maximum
  if (
    this[connectionOptionsSymbol]._maxPayload < 1 ||
    this[currentPayloadSizeSymbol] <= this[connectionOptionsSymbol]._maxPayload
  ) {
    // Queue the payload for further processing
    this[payloadQueueSymbol].push(payload);
    return;
  }

  // If the payload size exceeds the maximum, set an error and reset the connection
  this[errorSymbol] = new RangeError("Max payload size exceeded");
  this[errorSymbol].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
  this[errorSymbol][closeCodeSymbol] = 1009; // 1009: Message too big (WebSocket close code)
  this.removeListener("data", handleIncomingPayload);
  this.reset();
}

module.exports = handleIncomingPayload;