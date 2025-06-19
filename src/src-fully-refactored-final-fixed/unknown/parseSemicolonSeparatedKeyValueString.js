/**
 * Parses a semicolon-separated key=value string (e.g., a cookie header) into an object.
 * Handles quoted values and URL-decoding where appropriate.
 *
 * @param {string} input - The semicolon-separated key=value string to parse.
 * @returns {Object.<string, string>} An object mapping keys to their parsed values.
 */
function parseSemicolonSeparatedKeyValueString(input) {
  const result = {};
  let currentIndex = 0;

  while (currentIndex < input.length) {
    // Find the next '=' character after currentIndex
    const equalsIndex = input.indexOf('=', currentIndex);
    if (equalsIndex === -1) break; // No more key=value pairs

    // Find the next ';' character after currentIndex
    let semicolonIndex = input.indexOf(';', currentIndex);
    if (semicolonIndex === -1) {
      semicolonIndex = input.length; // No more semicolons; use end of string
    } else if (semicolonIndex < equalsIndex) {
      // If ';' comes before '=', skip to the next segment
      currentIndex = input.lastIndexOf(';', equalsIndex - 1) + 1;
      continue;
    }

    // Extract and trim the key
    const key = input.slice(currentIndex, equalsIndex).trim();
    // Only process the key if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been set yet
    if (result[key] === undefined) {
      // Extract and trim the value
      let value = input.slice(equalsIndex + 1, semicolonIndex).trim();
      // If the value starts with a double quote, remove the surrounding quotes
      if (value.charCodeAt(0) === 34) {
        value = value.slice(1, -1);
      }
      // Attempt to decode URI components if '%' is present
      try {
        result[key] = value.indexOf('%') !== -1 ? decodeURIComponent(value) : value;
      } catch (decodeError) {
        // If decoding fails, store the raw value
        result[key] = value;
      }
    }
    // Move to the next segment
    currentIndex = semicolonIndex + 1;
  }

  return result;
}

module.exports = parseSemicolonSeparatedKeyValueString;