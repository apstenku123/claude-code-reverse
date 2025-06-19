/**
 * Builds the envelope headers for an event, including optional SDK info, DSN, and trace context.
 *
 * @param {Object} event - The event object containing event_id and optional sdkProcessingMetadata.
 * @param {Object} [sdkInfo] - Optional SDK information to include in the headers.
 * @param {boolean} [shouldIncludeDsn] - Whether to include the DSN in the headers.
 * @param {Object} [dsnObject] - The DSN object to be stringified if shouldIncludeDsn is true.
 * @returns {Object} The envelope headers object with event_id, sent_at, and optional sdk, dsn, and trace fields.
 */
function buildEnvelopeHeaders(event, sdkInfo, shouldIncludeDsn, dsnObject) {
  // Extract dynamic sampling context if available
  const dynamicSamplingContext = event.sdkProcessingMetadata && event.sdkProcessingMetadata.dynamicSamplingContext;

  // Build the envelope headers object
  return {
    event_id: event.event_id,
    sent_at: new Date().toISOString(),
    // Include SDK info if provided
    ...(sdkInfo && { sdk: sdkInfo }),
    // Include DSN if both shouldIncludeDsn is true and dsnObject is provided
    ...(!!shouldIncludeDsn && dsnObject && {
      dsn: Mc2.dsnToString(dsnObject)
    }),
    // Include trace context if dynamic sampling context is available
    ...(dynamicSamplingContext && {
      trace: n5A.dropUndefinedKeys({ ...dynamicSamplingContext })
    })
  };
}

module.exports = buildEnvelopeHeaders;