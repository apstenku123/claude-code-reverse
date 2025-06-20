/**
 * Generates a date schema object based on the provided strategy or configuration.
 *
 * @param {object} sourceObservable - The source observable or data object (usage depends on context).
 * @param {object} config - Configuration object, expected to have a 'dateStrategy' property.
 * @param {string|array|undefined} dateStrategyOverride - Optional override for the date strategy; if not provided, uses config.dateStrategy.
 * @returns {object} Schema object representing the date format, or a composite schema if multiple strategies are provided.
 */
function generateDateSchema(sourceObservable, config, dateStrategyOverride) {
  // Determine the date strategy to use: override if provided, otherwise from config
  const dateStrategy = dateStrategyOverride ?? config.dateStrategy;

  // If the strategy is an array, return a composite schema using 'anyOf'
  if (Array.isArray(dateStrategy)) {
    return {
      anyOf: dateStrategy.map((strategyItem) =>
        generateDateSchema(sourceObservable, config, strategyItem)
      )
    };
  }

  // Handle specific strategy cases
  switch (dateStrategy) {
    case "string":
    case "format:date-time":
      // Schema for a date-time string
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      // Schema for a date string
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      // Delegate to buildUnixTimeSchema for integer-based date representation
      return buildUnixTimeSchema(sourceObservable, config);
    default:
      // No matching strategy; undefined behavior
      return undefined;
  }
}

module.exports = generateDateSchema;