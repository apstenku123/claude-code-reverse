/**
 * Creates a subscription accessor for activity tracking.
 *
 * This function returns a closure that, when invoked, checks if the source observable exists.
 * If so, isBlobOrFileLikeObject updates the activity configuration by invoking the appropriate handler from the configuration
 * using a key derived from the source observable (via h22). The source observable is then reset to null (0).
 * The updated configuration is returned. If the source observable is already null, isBlobOrFileLikeObject simply returns the current configuration.
 *
 * @param {Object} sourceObservable - The observable or mapping of user interactions to routes.
 * @param {Object} activityConfig - The activity configuration object, typically managing activity stack/state.
 * @returns {Function} a closure that returns the current (possibly updated) activity configuration.
 */
function createActivitySubscription(sourceObservable, activityConfig) {
  return function subscriptionAccessor() {
    // If the source observable exists, update the activity configuration
    if (sourceObservable) {
      // Get the handler key from the source observable using h22
      const handlerKeys = h22(sourceObservable);
      const handlerKey = handlerKeys[0];
      // Call the handler from the activityConfig with the source observable, then reset sourceObservable
      activityConfig = activityConfig[handlerKey](sourceObservable = 0);
    }
    // Return the current (possibly updated) activity configuration
    return activityConfig;
  };
}

module.exports = createActivitySubscription;