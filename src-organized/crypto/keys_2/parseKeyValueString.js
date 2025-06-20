/**
 * Parses a string containing key-value pairs separated by commas, semicolons, or spaces,
 * and returns an object mapping keys to their corresponding values.
 *
 * Example input: "foo=bar, baz=qux; test=123"
 * Output: { foo: "bar", baz: "qux", test: "123" }
 *
 * @param {string} keyValueString - The string containing key-value pairs to parse.
 * @returns {Object.<string, string|undefined>} An object mapping keys to their values (or undefined if no value is specified).
 */
function parseKeyValueString(keyValueString) {
  // Create a plain object with no prototype to store the result
  const keyValueMap = Object.create(null);
  // Regular expression to match key-value pairs (key = value), separated by commas, semicolons, or whitespace
  const keyValueRegex = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  // Iterate over all matches in the input string
  while ((match = keyValueRegex.exec(keyValueString)) !== null) {
    const key = match[1];
    const value = match[2]; // May be undefined if no value is specified
    keyValueMap[key] = value;
  }
  return keyValueMap;
}

module.exports = parseKeyValueString;