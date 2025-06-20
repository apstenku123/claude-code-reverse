/**
 * Parses key mapping definitions (as strings, arrays, or objects) into a normalized object.
 * Each key is mapped to an array: [context, processedValue].
 * Supports lowercasing keys and recursive object structures.
 *
 * @param {string|Array|Object} keyMapping - The key mapping definition(createInteractionAccessor) to parse. Can be a space-separated string, an array of strings, or a nested object.
 * @param {boolean} [shouldLowercaseKeys=false] - Whether to lowercase all keys in the mapping.
 * @param {string} [context=defaultContext] - The context to associate with each key (used internally for recursion).
 * @returns {Object} An object mapping each key to an array: [context, processedValue].
 */
function parseKeyMappingToObject(keyMapping, shouldLowercaseKeys, context = defaultContext) {
  const result = {};

  // Helper function to process a list of key definitions
  function processKeyDefinitions(currentContext, keyDefinitions) {
    // Lowercase keys if requested
    const processedKeys = shouldLowercaseKeys
      ? keyDefinitions.map(key => key.toLowerCase())
      : keyDefinitions;

    processedKeys.forEach(keyDefinition => {
      // Support key|value syntax
      const [key, value] = keyDefinition.split('|');
      result[key] = [currentContext, processKeyValue(key, value)];
    });
  }

  if (typeof keyMapping === "string") {
    // If input is a space-separated string, split into array and process
    processKeyDefinitions(context, keyMapping.split(" "));
  } else if (Array.isArray(keyMapping)) {
    // If input is already an array, process directly
    processKeyDefinitions(context, keyMapping);
  } else if (typeof keyMapping === "object" && keyMapping !== null) {
    // If input is an object, recursively process each property
    Object.keys(keyMapping).forEach(nestedContext => {
      Object.assign(
        result,
        parseKeyMappingToObject(keyMapping[nestedContext], shouldLowercaseKeys, nestedContext)
      );
    });
  }

  return result;
}

// Export the function for use in other modules
module.exports = parseKeyMappingToObject;
