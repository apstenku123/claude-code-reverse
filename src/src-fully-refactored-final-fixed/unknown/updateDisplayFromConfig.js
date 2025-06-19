/**
 * Updates the display property of a given object based on the provided configuration.
 *
 * @param {Object} displayTarget - The object whose display property should be updated. Must have a setDisplay method.
 * @param {Object} config - Configuration object that may contain a 'display' property.
 * @returns {void}
 *
 * If the config object has a 'display' property, this function sets the displayTarget'createInteractionAccessor display
 * to the corresponding constant value: 'mb' if config.display is 'flex', otherwise 'EL'.
 */
function updateDisplayFromConfig(displayTarget, config) {
  // Check if the config object has a 'display' property
  if ('display' in config) {
    // Set display to 'mb' if display is 'flex', otherwise set to 'EL'
    displayTarget.setDisplay(config.display === 'flex' ? mb : EL);
  }
}

module.exports = updateDisplayFromConfig;