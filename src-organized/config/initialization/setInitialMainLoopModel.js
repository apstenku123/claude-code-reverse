/**
 * Sets the initial main loop model for the application.
 *
 * @param {any} initialMainLoopModel - The model object to be used as the initial main loop model.
 * @returns {void}
 *
 * This function assigns the provided model to the global N9 object'createInteractionAccessor initialMainLoopModel property.
 * It is typically used to initialize or reset the main loop model at application startup or during reconfiguration.
 */
function setInitialMainLoopModel(initialMainLoopModel) {
  // Assign the provided model to the global N9 object'createInteractionAccessor initialMainLoopModel property
  N9.initialMainLoopModel = initialMainLoopModel;
}

module.exports = setInitialMainLoopModel;