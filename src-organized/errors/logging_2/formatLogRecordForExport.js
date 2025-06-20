/**
 * Formats a log record object for export by encoding time fields, severity, and context information.
 *
 * @param {Object} logRecord - The log record to format. Should contain hrTime, hrTimeObserved, severityNumber, severityText, body, attributes, droppedAttributesCount, and optionally spanContext.
 * @param {Object} encoderUtils - Utility object providing encoding methods for hrTime and span context.
 * @returns {Object} The formatted log record ready for export.
 */
function formatLogRecordForExport(logRecord, encoderUtils) {
  return {
    // Encode the high-resolution time of the log record
    timeUnixNano: encoderUtils.encodeHrTime(logRecord.hrTime),

    // Encode the observed high-resolution time
    observedTimeUnixNano: encoderUtils.encodeHrTime(logRecord.hrTimeObserved),

    // Map and encode the severity number
    severityNumber: processInteractionEntries(logRecord.severityNumber),

    // Pass through the severity text
    severityText: logRecord.severityText,

    // Convert the body to a standardized AnyValue format
    body: anyValueConverter.toAnyValue(logRecord.body),

    // Map and encode the attributes
    attributes: encodeAttributes(logRecord.attributes),

    // Pass through the count of dropped attributes
    droppedAttributesCount: logRecord.droppedAttributesCount,

    // Extract trace flags from the span context if available
    flags: logRecord.spanContext?.traceFlags,

    // Encode the trace updateSnapshotAndNotify from the span context if available
    traceId: encoderUtils.encodeOptionalSpanContext(logRecord.spanContext?.traceId),

    // Encode the span updateSnapshotAndNotify from the span context if available
    spanId: encoderUtils.encodeOptionalSpanContext(logRecord.spanContext?.spanId)
  };
}

module.exports = formatLogRecordForExport;