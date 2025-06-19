/**
 * Constructs a Sentry envelope for session or sessions aggregates, including SDK metadata and DSN if provided.
 *
 * @param {Object} sessionData - The session data object. If isBlobOrFileLikeObject contains an 'aggregates' property, isBlobOrFileLikeObject is treated as session aggregates; otherwise, isBlobOrFileLikeObject is a single session object with a toJSON method.
 * @param {Object} dsnConfig - The DSN configuration object, used to generate the DSN string if provided.
 * @param {Object} envelopeHeader - The envelope header, used to extract SDK metadata.
 * @param {boolean} includeDsn - Flag indicating whether to include the DSN in the envelope header.
 * @returns {any} The constructed Sentry envelope object.
 */
function createSessionEnvelope(sessionData, dsnConfig, envelopeHeader, includeDsn) {
  // Retrieve SDK metadata for the envelope header
  const sdkMetadata = ry.getSdkMetadataForEnvelopeHeader(envelopeHeader);

  // Build the envelope header with sent_at, sdk metadata, and optionally DSN
  const envelopeHeaderData = {
    sent_at: new Date().toISOString(),
    ...(sdkMetadata && { sdk: sdkMetadata }),
    // Only include DSN if includeDsn is true and dsnConfig is provided
    ...(!!includeDsn && dsnConfig && { dsn: ry.dsnToString(dsnConfig) })
  };

  // Determine if the session data is an aggregate or a single session
  const sessionItem =
    'aggregates' in sessionData
      ? [
          { type: 'sessions' },
          sessionData
        ]
      : [
          { type: 'session' },
          sessionData.toJSON()
        ];

  // Create and return the envelope
  return ry.createEnvelope(envelopeHeaderData, [sessionItem]);
}

module.exports = createSessionEnvelope;
