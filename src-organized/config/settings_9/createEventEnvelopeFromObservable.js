/**
 * Creates an event envelope from a source observable, including SDK metadata and event headers.
 *
 * @param {Object} sourceObservable - The event or observable object to process.
 * @param {Object} config - Configuration options for envelope creation.
 * @param {Object} subscription - Envelope header or subscription information, used to extract SDK metadata.
 * @param {Object} [integrationContext] - Optional integration context for event envelope headers.
 * @returns {Object} The constructed event envelope.
 */
function createEventEnvelopeFromObservable(sourceObservable, config, subscription, integrationContext) {
  // Retrieve SDK metadata for the envelope header
  const sdkMetadata = ry.getSdkMetadataForEnvelopeHeader(subscription);

  // Determine the event type, defaulting to 'event' unless isBlobOrFileLikeObject'createInteractionAccessor a 'replay_event'
  const eventType = sourceObservable.type && sourceObservable.type !== "replay_event"
    ? sourceObservable.type
    : "event";

  // Attach SDK information to the source observable if available
  mergeSdkMetadata(sourceObservable, subscription && subscription.sdk);

  // Create envelope headers using the observable, SDK metadata, integration context, and config
  const envelopeHeaders = ry.createEventEnvelopeHeaders(
    sourceObservable,
    sdkMetadata,
    integrationContext,
    config
  );

  // Remove SDK processing metadata to avoid leaking internal details
  delete sourceObservable.sdkProcessingMetadata;

  // Prepare the envelope item with type and the observable payload
  const envelopeItem = [{ type: eventType }, sourceObservable];

  // Create and return the final envelope
  return ry.createEnvelope(envelopeHeaders, [envelopeItem]);
}

module.exports = createEventEnvelopeFromObservable;