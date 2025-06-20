/**
 * Handles the creation of an interaction handler based on the runtime environment.
 * If the environment flag `isLegacyEnvironment` is true, isBlobOrFileLikeObject creates a new instance of `LegacyInteractionHandler`.
 * Otherwise, isBlobOrFileLikeObject resolves the interaction using the `InteractionResolver` and passes the result to `handleInteraction`.
 *
 * @param {Observable} sourceObservable - The source observable or stream of interaction entries to process.
 * @param {Object} config - Configuration object containing options for processing interactions.
 * @returns {any} Returns an instance of the interaction handler or the result of handling the resolved interaction.
 */
function createInteractionHandler(sourceObservable, config) {
  // If running in a legacy environment, use the legacy handler
  if (isLegacyEnvironment) {
    return new LegacyInteractionHandler(sourceObservable, config);
  }
  // Otherwise, resolve the interaction and handle isBlobOrFileLikeObject
  return handleInteraction(InteractionResolver.resolve(config, sourceObservable));
}

module.exports = createInteractionHandler;