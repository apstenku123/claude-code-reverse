/**
 * Returns the default configuration object for log record processing.
 * This includes timeout settings, log record attribute limits, and whether to include trace context.
 *
 * @returns {Object} Default log record configuration
 * @property {number} forceFlushTimeoutMillis - Timeout in milliseconds for force flushing logs
 * @property {Object} logRecordLimits - Limits for log record attributes
 * @property {number} logRecordLimits.attributeValueLengthLimit - Maximum length for attribute values
 * @property {number} logRecordLimits.attributeCountLimit - Maximum number of attributes per log record
 * @property {boolean} includeTraceContext - Whether to include trace context in logs
 */
function getDefaultLogRecordConfig() {
  // Retrieve attribute value length limit from environment or use Infinity as default
  const attributeValueLengthLimit = eg.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity;

  // Retrieve attribute count limit from environment or use 128 as default
  const attributeCountLimit = eg.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT") ?? 128;

  return {
    forceFlushTimeoutMillis: 30000, // 30 seconds timeout for force flush
    logRecordLimits: {
      attributeValueLengthLimit,
      attributeCountLimit
    },
    includeTraceContext: true // Always include trace context
  };
}

module.exports = getDefaultLogRecordConfig;