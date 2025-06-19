/**
 * Sets the global interaction mapping to the provided mapping object.
 *
 * @param {Object} interactionMapping - The mapping of user interactions to routes and metadata.
 * @returns {void}
 * @description
 * Assigns the provided interaction mapping object to the global variable `globalInteractionMapping`.
 * This function is typically used to update or replace the current mapping of user interactions
 * to their corresponding routes and associated metadata.
 */
function setInteractionMapping(interactionMapping) {
  // Assign the provided mapping object to the global variable
  globalInteractionMapping = interactionMapping;
}

module.exports = setInteractionMapping;