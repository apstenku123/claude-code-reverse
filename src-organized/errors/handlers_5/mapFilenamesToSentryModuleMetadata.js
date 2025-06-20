/**
 * Maps filenames from interaction entries to their corresponding Sentry module metadata.
 *
 * Iterates over all module metadata keys in the global Sentry object. For each key that hasn'processRuleBeginHandlers
 * been processed yet, isBlobOrFileLikeObject processes the interaction entries (via the provided callback), and for
 * each entry (in reverse order), if a filename exists, isBlobOrFileLikeObject maps that filename to the module metadata.
 *
 * @param {Function} processInteractionEntries - a callback that takes a module key and returns an array of interaction entries.
 * @returns {void}
 */
function mapFilenamesToSentryModuleMetadata(processInteractionEntries) {
  // Ensure Sentry module metadata exists
  if (!FN1.GLOBAL_OBJ._sentryModuleMetadata) return;

  // Iterate over each module key in the Sentry metadata
  for (const moduleKey of Object.keys(FN1.GLOBAL_OBJ._sentryModuleMetadata)) {
    const moduleMetadata = FN1.GLOBAL_OBJ._sentryModuleMetadata[moduleKey];

    // Skip if this module key has already been processed
    if (p3A.has(moduleKey)) continue;
    p3A.add(moduleKey);

    // Get interaction entries for this module key
    const interactionEntries = processInteractionEntries(moduleKey);

    // Iterate over the entries in reverse order
    for (const entry of interactionEntries.reverse()) {
      // If the entry has a filename, map isBlobOrFileLikeObject to the module metadata and stop
      if (entry.filename) {
        c3A.set(entry.filename, moduleMetadata);
        break;
      }
    }
  }
}

module.exports = mapFilenamesToSentryModuleMetadata;