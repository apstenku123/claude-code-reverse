/**
 * Retrieves log record attribute limits from the provided configuration object or environment variables.
 *
 * This function returns an object containing the attribute count limit and attribute value length limit for log records.
 * It checks the provided config object first, then falls back to environment variables, and finally to hardcoded defaults if necessary.
 *
 * @param {Object} config - Configuration object that may specify attribute limits.
 * @param {number} [config.attributeCountLimit] - Optional maximum number of attributes per log record.
 * @param {number} [config.attributeValueLengthLimit] - Optional maximum length for attribute values.
 * @returns {Object} An object with 'attributeCountLimit' and 'attributeValueLengthLimit' properties.
 */
function getLogRecordAttributeLimits(config) {
  return {
    // Determine the maximum number of attributes per log record
    attributeCountLimit:
      config.attributeCountLimit ??
      eg.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT") ??
      eg.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ??
      128, // Default to 128 if nothing else is set

    // Determine the maximum length for attribute values
    attributeValueLengthLimit:
      config.attributeValueLengthLimit ??
      eg.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT") ??
      eg.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ??
      Infinity // Default to Infinity if nothing else is set
  };
}

module.exports = getLogRecordAttributeLimits;
