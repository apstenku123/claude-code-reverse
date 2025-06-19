/**
 * Initializes the mapping of user interactions to routes if not already initialized.
 * Stores the provided observable as the source for mapping and triggers the initialization routine once.
 *
 * @param {Observable} interactionObservable - Observable stream of user interaction entries to be mapped to routes.
 * @returns {void}
 */
function initializeInteractionRouteMapping(interactionObservable) {
  // Store the observable globally for later use
  globalInteractionObservable = interactionObservable;
  // If the mapping has not been initialized yet, initialize isBlobOrFileLikeObject
  if (!isInteractionRouteMappingInitialized) {
    isInteractionRouteMappingInitialized = true;
    initializeInteractionRouteMappingRoutine();
  }
}

module.exports = initializeInteractionRouteMapping;