/**
 * Emits a custom event with specified attributes to the event emitter, if available.
 *
 * @async
 * @function emitEventWithAttributes
 * @param {string} eventName - The name of the event to emit.
 * @param {Object} [additionalAttributes={}] - Optional additional attributes to include with the event.
 * @returns {Promise<void>} Resolves when the event has been emitted or if no emitter is available.
 */
async function emitEventWithAttributes(eventName, additionalAttributes = {}) {
  // Retrieve the event emitter instance
  const eventEmitter = x0A();
  if (!eventEmitter) return;

  // Build the attributes object, merging defaults and additional attributes
  const attributes = {
    ...buildOtelMetricsAttributes(), // Default attributes from external function
    "event.name": eventName,
    "event.timestamp": new Date().toISOString()
  };

  // Add any additional attributes, ignoring undefined values
  for (const [attributeKey, attributeValue] of Object.entries(additionalAttributes)) {
    if (attributeValue !== undefined) {
      attributes[attributeKey] = attributeValue;
    }
  }

  // Emit the event with the constructed body and attributes
  eventEmitter.emit({
    body: `claude_code.${eventName}`,
    attributes
  });
}

module.exports = emitEventWithAttributes;