/**
 * Filters out progress events and, unless the external source type is 'ant', filters out attachment events from the provided configuration array.
 *
 * @param {Array<Object>} configList - An array of configuration objects, each expected to have a 'type' property.
 * @returns {Array<Object>} - a filtered array containing only relevant configuration objects.
 */
function filterRelevantConfigs(configList) {
  return configList.filter(config => {
    // Exclude any config with type 'progress'
    if (config.type === "progress") {
      return false;
    }
    // Exclude 'attachment' configs unless the external source type is 'ant'
    if (config.type === "attachment" && getExternalSourceType() !== "ant") {
      return false;
    }
    // Include all other configs
    return true;
  });
}

module.exports = filterRelevantConfigs;
