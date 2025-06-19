/**
 * Processes interaction entries using the provided configuration and returns the result via formatStackTraceEntries.
 *
 * @param {Function} processInteractionEntries - Function that processes an array of interaction entries, mapping each to a route name and storing associated metadata such as duration, user, transaction, and replay updateSnapshotAndNotify.
 * @param {any} config - Configuration or input required by the processing function. If undefined, the function returns early.
 * @returns {any} The result of processing the interaction entries, passed through formatStackTraceEntries, or undefined if config is not provided.
 */
function processInteractionWithConfig(processInteractionEntries, config) {
  // If no configuration is provided, exit early
  if (config === undefined) return;

  // Process the interaction entries with the given config and pass the result to formatStackTraceEntries
  return formatStackTraceEntries(processInteractionEntries(config, 1));
}

module.exports = processInteractionWithConfig;