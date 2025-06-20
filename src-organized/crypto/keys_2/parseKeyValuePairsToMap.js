/**
 * Parses a string of key-value pairs separated by semicolons into a Map.
 * Each pair is expected to be in the format 'key=value'.
 * Uses external helpers to extract segments and process keys/values.
 *
 * @param {string} keyValueString - The input string containing key-value pairs separated by semicolons.
 * @returns {Map<string, string>} a Map where each key is mapped to its corresponding value.
 */
function parseKeyValuePairsToMap(keyValueString) {
  // Tracks the current parsing position in the string
  const parseState = {
    position: 0
  };
  // The resulting Map of parsed key-value pairs
  const keyValueMap = new Map();

  // Continue parsing until the end of the string
  while (parseState.position < keyValueString.length) {
    // Extract the next segment up to the next semicolon
    const segment = PE6(";", keyValueString, parseState);
    // Split the segment into key and value (default value is empty string if '=' is missing)
    const [rawKey, rawValue = ""] = segment.split("=");
    // Process the key and value using external cc0 helper
    const processedKey = cc0(rawKey, true, false);
    const processedValue = cc0(rawValue, false, true);
    // Store the processed key-value pair in the Map
    keyValueMap.set(processedKey, processedValue);
    // Move to the next position
    parseState.position++;
  }

  return keyValueMap;
}

module.exports = parseKeyValuePairsToMap;