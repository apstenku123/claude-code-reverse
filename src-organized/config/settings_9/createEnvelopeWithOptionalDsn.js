/**
 * Creates an envelope using the provided envelope header and items, optionally overriding the DSN.
 *
 * @param {Array} envelopeData - An array where the first element is the envelope header (object), and the second element is the envelope items (any type).
 * @param {string|undefined} [dsnOverride] - Optional DSN string to override the DSN in the envelope header.
 * @returns {any} The result of YN1.createEnvelope with the constructed envelope header and items.
 */
function createEnvelopeWithOptionalDsn(envelopeData, dsnOverride) {
  // Destructure the envelope header and items from the envelopeData array
  const [envelopeHeader, envelopeItems] = envelopeData;

  // If dsnOverride is provided, create a new envelope header with the overridden DSN
  const finalEnvelopeHeader = dsnOverride
    ? { ...envelopeHeader, dsn: dsnOverride }
    : envelopeHeader;

  // Call the external YN1.createEnvelope function with the constructed header and items
  return YN1.createEnvelope(finalEnvelopeHeader, envelopeItems);
}

module.exports = createEnvelopeWithOptionalDsn;