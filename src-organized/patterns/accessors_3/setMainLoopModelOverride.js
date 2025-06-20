/**
 * Sets the main loop model override in the N9 object.
 *
 * @param {any} mainLoopModelOverride - The value to override the main loop model with.
 * @returns {void}
 */
function setMainLoopModelOverride(mainLoopModelOverride) {
  // Assign the provided override value to the N9 object'createInteractionAccessor mainLoopModelOverride property
  N9.mainLoopModelOverride = mainLoopModelOverride;
}

module.exports = setMainLoopModelOverride;