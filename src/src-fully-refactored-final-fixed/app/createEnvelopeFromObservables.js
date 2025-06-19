/**
 * Creates an envelope object from an array of observables and an optional configuration.
 * The envelope includes a timestamp and, if provided, a DSN string derived from the configuration.
 * Each observable in the array is transformed using the wrapWithSpanType function before being included in the envelope.
 *
 * @param {Array<any>} observables - An array of observables to be processed.
 * @param {object} [config] - Optional configuration object that may contain DSN information.
 * @returns {any} The envelope object created by k3A.createEnvelope.
 */
function createEnvelopeFromObservables(observables, config) {
  // Initialize the envelope metadata with the current timestamp
  const envelopeMetadata = {
    sent_at: new Date().toISOString()
  };

  // If a configuration is provided, add its DSN string to the envelope metadata
  if (config) {
    envelopeMetadata.dsn = k3A.dsnToString(config);
  }

  // Transform each observable using the wrapWithSpanType function
  const transformedObservables = observables.map(wrapWithSpanType);

  // Create and return the envelope using the metadata and transformed observables
  return k3A.createEnvelope(envelopeMetadata, transformedObservables);
}

module.exports = createEnvelopeFromObservables;