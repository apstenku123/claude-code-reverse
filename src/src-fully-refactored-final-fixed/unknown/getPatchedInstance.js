/**
 * Returns the 'patch' property from a new instance of kM6, constructed with the provided sourceObservable and config.
 *
 * @function getPatchedInstance
 * @param {Function} mapInteractionsToRoutes - Processes user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @returns {any} The 'patch' property from the constructed kM6 instance.
 */
const getPatchedInstance = (mapInteractionsToRoutes, addActivityIfNotFinished) => {
  // Create a new kM6 instance with the provided dependencies
  const kM6Instance = new kM6(mapInteractionsToRoutes, addActivityIfNotFinished);
  // Return the 'patch' property from the instance
  return kM6Instance.patch;
};

module.exports = getPatchedInstance;