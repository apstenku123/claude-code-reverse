/**
 * Retrieves the mapped interaction routes from the global tH5 object using the provided source observable.
 *
 * @param {any} sourceObservable - The observable or key used to access mapped interaction routes in tH5.
 * @param {any} config - Configuration object (unused in this accessor).
 * @param {any} subscription - Subscription or context object (unused in this accessor).
 * @param {any} interactionContext - Additional interaction context (unused in this accessor).
 * @returns {any} The mapped interaction routes associated with the given source observable from tH5.
 */
const getMappedInteractionRoutes = (sourceObservable, config, subscription, interactionContext) => {
  // Access the global tH5 object with the provided sourceObservable as key
  return tH5[sourceObservable];
};

module.exports = getMappedInteractionRoutes;