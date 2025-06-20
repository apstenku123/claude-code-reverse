/**
 * Creates an event envelope for transmission, including appropriate headers and metadata.
 *
 * @param {Object} eventData - The event data object to be sent. Should include a 'type' property.
 * @param {Object} [transportOptions] - Optional transport options or configuration for the envelope.
 * @param {Object} envelopeHeader - The envelope header, typically containing SDK and environment info.
 * @param {Object} [additionalContext] - Optional additional context or metadata for the envelope.
 * @returns {Array} The fully constructed envelope ready for transmission.
 */
function createEventEnvelope(eventData, transportOptions, envelopeHeader, additionalContext) {
  // Retrieve SDK metadata for the envelope header
  const sdkMetadata = ry.getSdkMetadataForEnvelopeHeader(envelopeHeader);

  // Determine the event type, defaulting to 'event' unless isBlobOrFileLikeObject'createInteractionAccessor a replay event
  const eventType = eventData.type && eventData.type !== "replay_event" ? eventData.type : "event";

  // Attach SDK information to the event data if available
  mergeSdkMetadata(eventData, envelopeHeader && envelopeHeader.sdk);

  // Create envelope headers using the event data, SDK metadata, additional context, and transport options
  const envelopeHeaders = ry.createEventEnvelopeHeaders(eventData, sdkMetadata, additionalContext, transportOptions);

  // Remove internal SDK processing metadata before sending
  delete eventData.sdkProcessingMetadata;

  // Prepare the envelope item: an array with type and the event data
  const envelopeItem = [{ type: eventType }, eventData];

  // Create and return the final envelope
  return ry.createEnvelope(envelopeHeaders, [envelopeItem]);
}

module.exports = createEventEnvelope;