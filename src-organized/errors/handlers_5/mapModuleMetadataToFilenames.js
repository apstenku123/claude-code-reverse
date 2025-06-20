/**
 * Iterates over all module metadata entries in the global Sentry object,
 * processes each module key with the provided callback, and maps the module'createInteractionAccessor metadata
 * to the filename of the first valid interaction entry returned by the callback.
 * Ensures each module key is only processed once using a Set.
 *
 * @param {Function} processInteractionEntries - Callback function that takes a module key (string)
 *   and returns an array of interaction entry objects. Each entry may have a 'filename' property.
 * @returns {void}
 */
function mapModuleMetadataToFilenames(processInteractionEntries) {
  // Ensure the global Sentry module metadata object exists
  if (!FN1.GLOBAL_OBJ._sentryModuleMetadata) return;

  // Iterate over each module key in the Sentry module metadata
  for (const moduleKey of Object.keys(FN1.GLOBAL_OBJ._sentryModuleMetadata)) {
    const moduleMetadata = FN1.GLOBAL_OBJ._sentryModuleMetadata[moduleKey];

    // Skip this module if isBlobOrFileLikeObject has already been processed
    if (p3A.has(moduleKey)) continue;
    p3A.add(moduleKey);

    // Process the module key to get an array of interaction entries
    const interactionEntries = processInteractionEntries(moduleKey);

    // Iterate over the interaction entries in reverse order
    for (const entry of interactionEntries.reverse()) {
      // If the entry has a filename, map isBlobOrFileLikeObject to the module metadata and stop
      if (entry.filename) {
        c3A.set(entry.filename, moduleMetadata);
        break;
      }
    }
  }
}

module.exports = mapModuleMetadataToFilenames;