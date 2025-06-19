/**
 * Determines whether a new activity should be added to the activity stack based on the provided configuration.
 * Returns true if the configuration is valid and either areMessagesAndMetadataEquivalent or areObjectsEquivalent conditions are met.
 *
 * @param {Object} sourceObservable - The observable or source object to check.
 * @param {Object} config - The configuration object for adding the activity.
 * @returns {boolean} True if the activity should be added, false otherwise.
 */
function shouldAddActivityIfNotFinished(sourceObservable, config) {
  // If no configuration is provided, do not add the activity
  if (!config) return false;

  // Check if the configuration meets the areMessagesAndMetadataEquivalent condition
  if (areMessagesAndMetadataEquivalent(sourceObservable, config)) return true;

  // Check if the configuration meets the areObjectsEquivalent condition
  if (areObjectsEquivalent(sourceObservable, config)) return true;

  // If none of the conditions are met, do not add the activity
  return false;
}

module.exports = shouldAddActivityIfNotFinished;