/**
 * Logs a 'tengu_unary_event' with relevant event and metadata details.
 *
 * @param {Object} eventData - The event data object containing event details and metadata.
 * @param {string} eventData.event - The name or type of the event.
 * @param {string} eventData.completion_type - The type of completion for the event.
 * @param {Object} eventData.metadata - Additional metadata about the event.
 * @param {string} eventData.metadata.language_name - The programming language name associated with the event.
 * @param {string|number} eventData.metadata.message_id - The unique identifier for the message.
 * @param {string} eventData.metadata.platform - The platform where the event occurred.
 * @returns {void} This function does not return a value.
 */
function logTenguUnaryEvent(eventData) {
  // Forward the event and selected metadata to the logging/analytics system
  logTelemetryEventIfEnabled("tengu_unary_event", {
    event: eventData.event,
    completion_type: eventData.completion_type,
    language_name: eventData.metadata.language_name,
    message_id: eventData.metadata.message_id,
    platform: eventData.metadata.platform
  });
}

module.exports = logTenguUnaryEvent;