/**
 * Parses a comma-separated string of key=value pairs, trims whitespace, and decodes URI components.
 *
 * Example input: "foo=bar,baz=qux%20quux"
 * Output: { foo: "bar", baz: "qux quux" }
 *
 * @param {string} keyValueString - The comma-separated key=value string to parse and decode.
 * @returns {Object.<string, string>} An object mapping decoded keys to decoded values.
 */
function parseCommaSeparatedKeyValuePairs(keyValueString) {
  return keyValueString
    .split(",") // Split the string by commas to get key=value pairs
    .map(pair => {
      // Split each pair by '=' and trim/URI-decode both key and value
      return pair.split("=").map(part => decodeURIComponent(part.trim()));
    })
    .reduce((result, [key, value]) => {
      // Assign each decoded key/value to the result object
      result[key] = value;
      return result;
    }, {});
}

module.exports = parseCommaSeparatedKeyValuePairs;