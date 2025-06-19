/**
 * Creates an envelope object for an interaction event, including metadata such as timestamp, SDK info, DSN, and trace data.
 *
 * @param {any} sourceObservable - The source observable or data to be included in the envelope.
 * @param {object} config - Optional trace configuration object to be sanitized and included.
 * @param {object} subscription - Optional subscription object containing SDK metadata.
 * @param {boolean} isInteraction - Indicates if this is an interaction event.
 * @param {object} dsnObject - DSN object to be stringified and included if present.
 * @returns {any} The constructed envelope object ready for further processing or transmission.
 */
function createInteractionEnvelope(sourceObservable, config, subscription, isInteraction, dsnObject) {
  // Initialize envelope metadata with current timestamp
  const envelopeMetadata = {
    sent_at: new Date().toISOString()
  };

  // If subscription and SDK info are provided, include them in the envelope
  if (subscription && subscription.sdk) {
    envelopeMetadata.sdk = {
      name: subscription.sdk.name,
      version: subscription.sdk.version
    };
  }

  // If both isInteraction and dsnObject are truthy, add DSN string to the envelope
  if (isInteraction && dsnObject) {
    envelopeMetadata.dsn = oU1.dsnToString(dsnObject);
  }

  // If config is provided, sanitize and include trace data
  if (config) {
    envelopeMetadata.trace = oU1.dropUndefinedKeys(config);
  }

  // Prepend 'check_in' type to the entries from the source observable
  const entriesWithCheckIn = prependCheckInType(sourceObservable);

  // Create and return the final envelope
  return oU1.createEnvelope(envelopeMetadata, [entriesWithCheckIn]);
}

module.exports = createInteractionEnvelope;