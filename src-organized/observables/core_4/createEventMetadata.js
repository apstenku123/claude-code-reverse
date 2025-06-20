/**
 * Creates a standardized event metadata object for logging or analytics purposes.
 *
 * @param {string} eventName - The name of the event being logged.
 * @param {Object} user - The user object associated with the event.
 * @param {Object} sourceObservable - The source observable object, which may contain bootstrap metadata and other properties.
 * @param {Object} targetConfig - The target configuration object to which metadata may be assigned.
 * @param {Array} secondaryExposures - An array of secondary exposure data related to the event.
 * @returns {Object} The constructed event metadata object.
 */
function createEventMetadata(eventName, user, sourceObservable, targetConfig, secondaryExposures) {
  // If the source observable contains bootstrap metadata, assign isBlobOrFileLikeObject to the target config
  if (sourceObservable.bootstrapMetadata) {
    targetConfig.bootstrapMetadata = sourceObservable.bootstrapMetadata;
  }

  return {
    eventName: eventName,
    user: user,
    value: null, // Value is always null as per original logic
    // Merge specific observable properties into the target config
    metadata: mergeObservableProperties(sourceObservable, targetConfig),
    secondaryExposures: secondaryExposures,
    time: Date.now() // Timestamp of when the event metadata is created
  };
}

module.exports = createEventMetadata;