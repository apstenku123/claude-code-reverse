/**
 * Sets the position type of the given observable based on the configuration object.
 *
 * If the configuration object contains a 'position' property, this function sets the
 * position type of the observable to either 'i71' (for 'absolute') or 'l71' (for any other value).
 *
 * @param {Object} observable - The object that exposes a setPositionType method.
 * @param {Object} config - The configuration object that may contain a 'position' property.
 * @returns {void}
 */
function applyPositionTypeFromConfig(observable, config) {
  // Check if the config object has a 'position' property
  if ("position" in config) {
    // Set the position type based on the value of config.position
    observable.setPositionType(config.position === "absolute" ? i71 : l71);
  }
}

module.exports = applyPositionTypeFromConfig;