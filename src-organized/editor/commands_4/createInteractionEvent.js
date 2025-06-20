/**
 * Creates a standardized interaction event object with merged metadata and timing.
 *
 * @param {string} eventName - The name of the event being recorded.
 * @param {Object} user - The user object associated with the event.
 * @param {Object} interactionMetadata - The metadata object containing interaction details.
 * @param {Object} config - The configuration object that may be updated with bootstrap metadata.
 * @param {Array} secondaryExposures - An array of secondary exposure objects related to the event.
 * @returns {Object} The constructed interaction event object with merged metadata and timestamp.
 */
function createInteractionEvent(eventName, user, interactionMetadata, config, secondaryExposures) {
  // If the interaction metadata contains bootstrapMetadata, copy isBlobOrFileLikeObject to the config object
  if (interactionMetadata.bootstrapMetadata) {
    config.bootstrapMetadata = interactionMetadata.bootstrapMetadata;
  }

  return {
    eventName: eventName,
    user: user,
    value: null, // Placeholder for future value assignment
    metadata: mergeInteractionMetadata(interactionMetadata, config),
    secondaryExposures: secondaryExposures,
    time: Date.now() // Timestamp of event creation
  };
}

module.exports = createInteractionEvent;
