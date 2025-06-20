/**
 * Checks if the interaction entry for a given object'createInteractionAccessor scheme is defined.
 *
 * @param {Object} interactionObject - The object containing a 'scheme' property to check.
 * @returns {boolean} True if the interaction entry for the provided scheme exists; otherwise, false.
 */
function isInteractionSchemeDefined(interactionObject) {
  // Check if the interaction entry for the given scheme is defined
  return isInteractionEntryDefined(interactionObject.scheme);
}

module.exports = isInteractionSchemeDefined;