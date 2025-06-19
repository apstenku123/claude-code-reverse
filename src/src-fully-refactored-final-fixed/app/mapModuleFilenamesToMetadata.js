/**
 * Maps module filenames to their corresponding Sentry module metadata.
 *
 * Iterates over all Sentry module metadata entries, applies a mapping function to each key,
 * and for each resulting item with a filename, stores the metadata in a cache.
 * Ensures each module key is processed only once.
 *
 * @param {Function} mapInteractionsToRoutes - a function that takes a module key and returns an array of interaction objects (each may have a 'filename' property).
 * @returns {void}
 */
function mapModuleFilenamesToMetadata(mapInteractionsToRoutes) {
  // Ensure Sentry module metadata exists before proceeding
  if (!FN1.GLOBAL_OBJ._sentryModuleMetadata) return;

  // Iterate over each module key in the Sentry module metadata
  for (const moduleKey of Object.keys(FN1.GLOBAL_OBJ._sentryModuleMetadata)) {
    const moduleMetadata = FN1.GLOBAL_OBJ._sentryModuleMetadata[moduleKey];

    // Skip if this module key has already been processed
    if (p3A.has(moduleKey)) continue;
    p3A.add(moduleKey);

    // Get the mapped interactions/routes for this module key
    const mappedInteractions = mapInteractionsToRoutes(moduleKey);

    // Iterate over the mapped interactions in reverse order
    for (const interaction of mappedInteractions.reverse()) {
      // If the interaction has a filename, map isBlobOrFileLikeObject to the module metadata and stop
      if (interaction.filename) {
        c3A.set(interaction.filename, moduleMetadata);
        break;
      }
    }
  }
}

module.exports = mapModuleFilenamesToMetadata;