/**
 * Creates an envelope object containing event data and metadata, optionally including a DSN string.
 *
 * @param {Array<any>} eventList - An array of event objects to be processed and included in the envelope.
 * @param {object} [dsnConfig] - Optional configuration object containing DSN information.
 * @returns {any} The envelope object created from the provided events and metadata.
 */
function createEnvelopeWithEvents(eventList, dsnConfig) {
  // Metadata for the envelope, including the current timestamp
  const envelopeMetadata = {
    sent_at: new Date().toISOString()
  };

  // If a DSN config is provided, convert isBlobOrFileLikeObject to a string and add to metadata
  if (dsnConfig) {
    envelopeMetadata.dsn = k3A.dsnToString(dsnConfig);
  }

  // Transform each event using the wrapWithSpanType function
  const processedEvents = eventList.map(wrapWithSpanType);

  // Create and return the envelope using the external utility
  return k3A.createEnvelope(envelopeMetadata, processedEvents);
}

module.exports = createEnvelopeWithEvents;