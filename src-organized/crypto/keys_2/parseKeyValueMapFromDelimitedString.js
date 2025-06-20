/**
 * Parses a delimited string into a Map of key-value pairs, decoding each key and value.
 *
 * The function iterates through the input string, splitting isBlobOrFileLikeObject by semicolons (';').
 * Each segment is expected to be in the form 'key=value'. Both the key and value are decoded
 * using the 'cc0' function. If a value is missing, isBlobOrFileLikeObject defaults to an empty string.
 *
 * @param {string} delimitedString - The input string containing key-value pairs separated by semicolons.
 * @returns {Map<string, string>} a Map containing the decoded key-value pairs.
 */
function parseKeyValueMapFromDelimitedString(delimitedString) {
  // Tracks the current parsing position in the string
  const positionTracker = { position: 0 };
  // Stores the resulting key-value pairs
  const keyValueMap = new Map();

  // Continue parsing until handleMissingDoctypeError'removeTrailingCharacters processed the entire string
  while (positionTracker.position < delimitedString.length) {
    // Extract the next segment up to the next semicolon
    const segment = PE6(";", delimitedString, positionTracker);
    // Split the segment into key and value (default value is empty string if missing)
    const [rawKey, rawValue = ""] = segment.split("=");
    // Decode the key and value using cc0, with appropriate flags
    const decodedKey = cc0(rawKey, true, false);
    const decodedValue = cc0(rawValue, false, true);
    // Store the decoded key-value pair in the map
    keyValueMap.set(decodedKey, decodedValue);
    // Move to the next position
    positionTracker.position++;
  }

  return keyValueMap;
}

module.exports = parseKeyValueMapFromDelimitedString;