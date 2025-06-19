/**
 * Creates a Sentry envelope with contextual metadata and a payload.
 *
 * @param {any} sourceObservable - The source observable or event data to be included in the envelope payload.
 * @param {object} config - The configuration object, possibly containing DSN information.
 * @param {object} subscription - The subscription context, possibly containing SDK metadata.
 * @param {object} transactionContext - The transaction context, used to determine if a DSN should be included.
 * @returns {any} The created Sentry envelope containing the metadata and payload.
 */
function createSentryEnvelopeWithContext(sourceObservable, config, subscription, transactionContext) {
  // Envelope header with the current timestamp
  const envelopeHeader = {
    sent_at: new Date().toISOString()
  };

  // If SDK information is available in the subscription, add isBlobOrFileLikeObject to the envelope header
  if (subscription && subscription.sdk) {
    envelopeHeader.sdk = {
      name: subscription.sdk.name,
      version: subscription.sdk.version
    };
  }

  // If a transaction context exists and config is provided, add DSN string to the envelope header
  if (transactionContext && config) {
    envelopeHeader.dsn = oBA.dsnToString(config);
  }

  // Create the envelope payload from the source observable
  const envelopePayload = R19(sourceObservable);

  // Create and return the Sentry envelope with the header and payload
  return oBA.createEnvelope(envelopeHeader, [envelopePayload]);
}

module.exports = createSentryEnvelopeWithContext;