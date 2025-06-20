/**
 * Normalizes an array of configuration objects, handling specific types and input formats.
 *
 * - For objects of type 'tool_use', ensures the 'input' property is a string or object, parses if string.
 * - For objects of type 'text', ensures non-empty text; if empty, logs an event and sets a default text.
 * - All other types are returned unchanged.
 *
 * @param {Array<Object>} configArray - Array of configuration objects to normalize.
 * @returns {Array<Object>} New array with normalized configuration objects.
 */
function normalizeConfigArray(configArray) {
  return configArray.map((config) => {
    switch (config.type) {
      case "tool_use": {
        // Ensure input is a string or object
        if (typeof config.input !== "string" && !isValidInputObject(config.input)) {
          throw new Error("Tool use input must be a string or object");
        }
        return {
          ...config,
          // If input is a string, parse isBlobOrFileLikeObject; otherwise, use as-is
          input: typeof config.input === "string" ? parseInputString(config.input) ?? {} : config.input
        };
      }
      case "text": {
        // If text is empty or whitespace, log event and set default text
        if (config.text.trim().length === 0) {
          logEvent("tengu_empty_model_response", {});
          return {
            type: "text",
            text: DEFAULT_EMPTY_TEXT
          };
        }
        return config;
      }
      default:
        return config;
    }
  });
}

// External dependencies (assumed to be imported elsewhere):
// - isValidInputObject: validates if input is a valid object
// - parseInputString: parses input string into an object
// - logEvent: logs an event for analytics or debugging
// - DEFAULT_EMPTY_TEXT: default text for empty responses

module.exports = normalizeConfigArray;
