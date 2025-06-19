/**
 * Generates a JSON schema for date values based on the provided strategy or configuration.
 *
 * @param {any} sourceObservable - The source object or observable (usage depends on context).
 * @param {Object} config - Configuration object, expected to have a 'dateStrategy' property.
 * @param {string|string[]|undefined} dateStrategyOverride - Optional override for the date strategy; can be a string or an array of strategies.
 * @returns {Object} JSON schema object describing the date format or a composite schema if multiple strategies are provided.
 */
function getDateSchema(sourceObservable, config, dateStrategyOverride) {
  // Determine the date strategy to use: override if provided, otherwise from config
  const dateStrategy = dateStrategyOverride ?? config.dateStrategy;

  // If the strategy is an array, return a schema with anyOf for each strategy
  if (Array.isArray(dateStrategy)) {
    return {
      anyOf: dateStrategy.map((strategy) => getDateSchema(sourceObservable, config, strategy))
    };
  }

  // Handle different date strategies
  switch (dateStrategy) {
    case "string":
    case "format:date-time":
      // Schema for a string in date-time format
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      // Schema for a string in date format
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      // Delegate to buildUnixTimeSchema for integer-based date representation
      return buildUnixTimeSchema(sourceObservable, config);
    default:
      // Optionally handle unknown strategies here (currently returns undefined)
      return undefined;
  }
}

module.exports = getDateSchema;