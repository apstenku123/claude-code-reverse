/**
 * Updates the display mode of a given observable/source based on the provided configuration object.
 * If the configuration object contains a 'display' property, isBlobOrFileLikeObject sets the display mode to either 'mb' or 'EL',
 * depending on whether the value is 'flex'.
 *
 * @param {Object} sourceObservable - The object whose display mode will be updated. Must have a setDisplay method.
 * @param {Object} config - Configuration object that may contain a 'display' property.
 * @returns {void}
 */
const updateDisplayMode = (sourceObservable, config) => {
  // Check if the config object has a 'display' property
  if ('display' in config) {
    // Set display mode based on the value of config.display
    // If 'flex', use 'mb'; otherwise, use 'EL'
    sourceObservable.setDisplay(config.display === 'flex' ? mb : EL);
  }
};

module.exports = updateDisplayMode;
