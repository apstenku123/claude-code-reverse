/**
 * Filters out configuration objects that are either of type 'progress',
 * or of type 'attachment' when the external source type is not 'ant'.
 *
 * @param {Array<Object>} configs - Array of configuration objects to filter.
 * @returns {Array<Object>} Filtered array of valid configuration objects.
 */
function filterValidConfigs(configs) {
  return configs.filter(config => {
    // Exclude configs of type 'progress'
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

module.exports = filterValidConfigs;
