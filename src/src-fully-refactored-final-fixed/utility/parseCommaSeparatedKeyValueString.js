/**
 * Parses a comma-separated string of key=value pairs into an object.
 * Each key and value is trimmed and decoded using decodeURIComponent.
 *
 * Example input: "foo=bar,baz=qux%20quux"
 * Output: { foo: "bar", baz: "qux quux" }
 *
 * @param {string} keyValueString - The comma-separated key=value string to parse.
 * @returns {Object} An object mapping keys to their decoded values.
 */
function parseCommaSeparatedKeyValueString(keyValueString) {
  return keyValueString
    // Split the string into key=value pairs
    .split(",")
    // Map each pair to [key, value] arrays, trimming and decoding each part
    .map(pair => pair
      .split("=")
      .map(part => decodeURIComponent(part.trim()))
    )
    // Reduce the array of [key, value] arrays into a single object
    .reduce((resultObject, [key, value]) => {
      resultObject[key] = value;
      return resultObject;
    }, {});
}

module.exports = parseCommaSeparatedKeyValueString;