/**
 * Combines a source identifier with its configuration object into a single string.
 *
 * The function concatenates the source name and a JSON stringified version of the configuration,
 * separated by a hyphen. This is useful for generating unique keys or identifiers for caching or logging purposes.
 *
 * @param {string} sourceName - The name or identifier of the source (e.g., an observable or route).
 * @param {Object} configObject - The configuration object associated with the source.
 * @returns {string} a string in the format: "sourceName-<JSON stringified configObject>".
 */
function formatSourceWithConfig(sourceName, configObject) {
  // Convert the configuration object to a JSON string and concatenate with source name
  return `${sourceName}-${JSON.stringify(configObject)}`;
}

module.exports = formatSourceWithConfig;