/**
 * Retrieves the current main loop model override from the N9 module.
 *
 * @returns {any} The current main loop model override value.
 */
function getMainLoopModelOverride() {
  // Access and return the mainLoopModelOverride property from the N9 module
  return N9.mainLoopModelOverride;
}

module.exports = getMainLoopModelOverride;