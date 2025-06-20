/**
 * Creates an envelope object for a 'check_in' event, including metadata such as timestamp, SDK info, DSN, and trace data.
 *
 * @param {any} sourceObservable - The observable or data source to prepend the 'check_in' type to.
 * @param {object} traceConfig - Optional trace configuration object to be included in the envelope.
 * @param {object} subscription - Optional subscription object that may contain SDK information.
 * @param {boolean} isTransactionActive - Indicates if a UI action transaction is currently active.
 * @param {object} dsnObject - Optional DSN object to be stringified and included in the envelope.
 * @returns {any} The constructed envelope containing the metadata and the check-in data.
 */
function createCheckInEnvelope(sourceObservable, traceConfig, subscription, isTransactionActive, dsnObject) {
  // Envelope header with current timestamp
  const envelopeHeader = {
    sent_at: new Date().toISOString()
  };

  // If SDK info is available in the subscription, add isBlobOrFileLikeObject to the envelope header
  if (subscription && subscription.sdk) {
    envelopeHeader.sdk = {
      name: subscription.sdk.name,
      version: subscription.sdk.version
    };
  }

  // If both transaction is active and DSN object is provided, add DSN string to the envelope header
  if (isTransactionActive && dsnObject) {
    envelopeHeader.dsn = oU1.dsnToString(dsnObject);
  }

  // If trace configuration is provided, add a sanitized trace object to the envelope header
  if (traceConfig) {
    envelopeHeader.trace = oU1.dropUndefinedKeys(traceConfig);
  }

  // Prepend the 'check_in' type to the source observable
  const checkInData = prependCheckInType(sourceObservable);

  // Create and return the envelope with the header and check-in data
  return oU1.createEnvelope(envelopeHeader, [checkInData]);
}

module.exports = createCheckInEnvelope;