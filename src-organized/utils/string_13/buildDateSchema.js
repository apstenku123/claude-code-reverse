/**
 * Constructs a JSON schema for date or time fields based on the provided strategy.
 * If the strategy is an array, builds a schema using anyOf for each strategy.
 * Supports string (date-time), string (date), and integer (Unix timestamp) formats.
 *
 * @param {any} sourceObservable - The source observable or context for schema generation.
 * @param {object} config - Configuration object, must include a 'dateStrategy' property.
 * @param {string|string[]|undefined} strategyOverride - Optional override for the date strategy; if not provided, uses config.dateStrategy.
 * @returns {object} JSON schema object for the specified date/time representation.
 */
function buildDateSchema(sourceObservable, config, strategyOverride) {
  // Determine the date strategy to use: override or from config
  const dateStrategy = strategyOverride ?? config.dateStrategy;

  // If the strategy is an array, build a schema using anyOf for each strategy
  if (Array.isArray(dateStrategy)) {
    return {
      anyOf: dateStrategy.map((singleStrategy) => buildDateSchema(sourceObservable, config, singleStrategy))
    };
  }

  // Handle different date strategy cases
  switch (dateStrategy) {
    case "string":
    case "format:date-time":
      // Schema for ISO 8601 date-time string
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      // Schema for ISO 8601 date string (without time)
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      // Schema for Unix timestamp integer
      return buildUnixTimeSchema(sourceObservable, config);
    default:
      // If the strategy is unrecognized, return undefined
      return undefined;
  }
}

module.exports = buildDateSchema;