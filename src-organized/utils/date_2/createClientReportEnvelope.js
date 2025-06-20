/**
 * Creates an envelope containing a client report with discarded events and a timestamp.
 *
 * @param {Array<Object>} discardedEvents - Array of discarded event objects to include in the report.
 * @param {string} [dsn] - Optional Data Source Name (DSN) to associate with the envelope.
 * @param {number} [timestampInSeconds] - Optional timestamp (in seconds). If not provided, current timestamp is used.
 * @returns {any} The envelope object created by ic2.createEnvelope.
 */
function createClientReportEnvelope(discardedEvents, dsn, timestampInSeconds) {
  // Prepare the client report payload
  const clientReportPayload = [
    { type: "client_report" },
    {
      // Use provided timestamp or get the current timestamp in seconds
      timestamp: timestampInSeconds || nc2.dateTimestampInSeconds(),
      discarded_events: discardedEvents
    }
  ];

  // Prepare envelope headers (include DSN if provided)
  const envelopeHeaders = dsn ? { dsn } : {};

  // Create and return the envelope using the external ic2.createEnvelope function
  return ic2.createEnvelope(envelopeHeaders, [clientReportPayload]);
}

module.exports = createClientReportEnvelope;