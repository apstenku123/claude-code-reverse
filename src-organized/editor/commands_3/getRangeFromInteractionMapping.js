/**
 * Retrieves the 'range' property from a new nL6 instance using the provided interaction mapping and activity configuration.
 * If the 'range' property is not available, returns '*'. If an error occurs during instantiation, returns null.
 *
 * @param {Array} interactionMappings - Array of user interaction entries to be mapped to route names and contexts.
 * @param {Object} activityConfig - Configuration object for adding an activity if not finished.
 * @returns {string|null} The extracted 'range' value, '*' if not present, or null if an error occurs.
 */
function getRangeFromInteractionMapping(interactionMappings, activityConfig) {
  try {
    // Attempt to create a new nL6 instance with the provided mappings and config
    // and return its 'range' property if available, otherwise return '*'.
    const interactionRange = new nL6(interactionMappings, activityConfig).range;
    return interactionRange || "*";
  } catch (error) {
    // If any error occurs during instantiation, return null
    return null;
  }
}

module.exports = getRangeFromInteractionMapping;