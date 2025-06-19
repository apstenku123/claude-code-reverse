/**
 * Resets the internal inflate property and processes interaction entries.
 *
 * This function sets the internal '_inflate' property to null, updates the status code
 * of the provided interaction object, and then processes the interaction entries using
 * the instance'createInteractionAccessor processInteractionEntries method.
 *
 * @param {Object} interactionObject - The interaction object to process. This object will have its status code updated and will be passed to the processInteractionEntries method.
 * @returns {void}
 */
function resetInflateAndProcessInteraction(interactionObject) {
  // Reset the internal inflate property to null
  this[JI1]._inflate = null;

  // Set the status code property of the interaction object
  interactionObject[C70] = 1007;

  // Process the interaction entries using the instance method
  this[Xa](interactionObject);
}

module.exports = resetInflateAndProcessInteraction;