/**
 * Retrieves the pipelining setting from the provided configuration object.
 *
 * The function attempts to extract the pipelining value using the following priority:
 *   1. If the configuration has a property with key JY1, return its value.
 *   2. If the configuration has a property with key OQ, and that object has a 'defaultPipelining' property, return its value.
 *   3. If neither is found, return 1 as the default value.
 *
 * @param {Object} config - The configuration object from which to extract the pipelining setting.
 * @returns {number} The pipelining setting value, or 1 if not specified.
 */
function getPipeliningSetting(config) {
  // Attempt to retrieve the pipelining value using the JY1 key
  if (config[JY1] !== undefined && config[JY1] !== null) {
    return config[JY1];
  }

  // If not found, check if the OQ key exists and has a 'defaultPipelining' property
  if (config[OQ]?.defaultPipelining !== undefined && config[OQ]?.defaultPipelining !== null) {
    return config[OQ].defaultPipelining;
  }

  // Fallback to default value
  return 1;
}

module.exports = getPipeliningSetting;