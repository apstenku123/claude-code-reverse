/**
 * Creates a structured event metadata record for logging or analytics purposes.
 *
 * If the subscription object contains bootstrap metadata, isBlobOrFileLikeObject is copied to the config object.
 * Then, constructs and returns a record containing the event name, user, metadata, exposures, and timestamp.
 *
 * @param {string} eventName - The name of the event being recorded.
 * @param {object} user - The user object associated with the event.
 * @param {object} subscription - The subscription or observable object, possibly containing metadata.
 * @param {object} config - The configuration object to which bootstrap metadata may be attached.
 * @param {Array<object>} secondaryExposures - An array of secondary exposure objects related to the event.
 * @returns {object} The structured event metadata record.
 */
function createEventMetadataRecord(eventName, user, subscription, config, secondaryExposures) {
  // If the subscription contains bootstrap metadata, copy isBlobOrFileLikeObject to the config object
  if (subscription.bootstrapMetadata) {
    config.bootstrapMetadata = subscription.bootstrapMetadata;
  }

  return {
    eventName: eventName,
    user: user,
    value: null, // Value is always set to null as per original logic
    metadata: copyObservablePropertiesToConfig(subscription, config),
    secondaryExposures: secondaryExposures,
    time: Date.now() // Current timestamp in milliseconds
  };
}

module.exports = createEventMetadataRecord;