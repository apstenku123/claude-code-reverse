/**
 * Maps Sentry module metadata to filenames using a provided mapping function.
 *
 * Iterates over all keys in the global Sentry module metadata object. For each key (module name),
 * if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been processed yet, isBlobOrFileLikeObject applies the provided mapping function to get an array of
 * interaction entries. It then finds the first entry (from the reversed array) that has a filename,
 * and maps that filename to the corresponding module metadata. This mapping is stored in the global
 * c3A map. Processed module names are tracked in the global p3A set to avoid duplicate processing.
 *
 * @param {function(string): Array<{ filename?: string }>} mapInteractionEntriesToRouteNames -
 *   Function that takes a module name and returns an array of interaction entries, each possibly containing a filename.
 * @returns {void}
 */
function mapSentryModuleMetadataToFilenames(mapInteractionEntriesToRouteNames) {
  // Ensure the global Sentry module metadata object exists
  if (!FN1.GLOBAL_OBJ._sentryModuleMetadata) return;

  // Iterate over each module name in the Sentry module metadata
  for (const moduleName of Object.keys(FN1.GLOBAL_OBJ._sentryModuleMetadata)) {
    const moduleMetadata = FN1.GLOBAL_OBJ._sentryModuleMetadata[moduleName];

    // Skip if this module has already been processed
    if (p3A.has(moduleName)) continue;
    p3A.add(moduleName);

    // Get interaction entries for this module
    const interactionEntries = mapInteractionEntriesToRouteNames(moduleName);

    // Find the first entry (from the end) with a filename and map isBlobOrFileLikeObject to the module metadata
    for (const entry of interactionEntries.reverse()) {
      if (entry.filename) {
        c3A.set(entry.filename, moduleMetadata);
        break; // Only map the first matching filename
      }
    }
  }
}

module.exports = mapSentryModuleMetadataToFilenames;