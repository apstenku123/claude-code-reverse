/**
 * Creates an envelope object with a timestamp and optional DSN, containing mapped items.
 *
 * @param {Array<any>} items - The array of items to be mapped and included in the envelope.
 * @param {object} [dsnConfig] - Optional DSN configuration object. If provided, its string representation is added to the envelope header.
 * @returns {any} The result of k3A.createEnvelope, which is an envelope object containing the header and mapped items.
 */
function createEnvelopeWithTimestamp(items, dsnConfig) {
  // Envelope header with the current timestamp
  const envelopeHeader = {
    sent_at: new Date().toISOString()
  };

  // If DSN configuration is provided, add its string representation to the header
  if (dsnConfig) {
    envelopeHeader.dsn = k3A.dsnToString(dsnConfig);
  }

  // Map each item using the wrapWithSpanType mapping function
  const mappedItems = items.map(wrapWithSpanType);

  // Create and return the envelope using the header and mapped items
  return k3A.createEnvelope(envelopeHeader, mappedItems);
}

module.exports = createEnvelopeWithTimestamp;