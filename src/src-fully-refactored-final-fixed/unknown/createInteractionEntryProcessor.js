/**
 * Creates a new instance of the InteractionEntryProcessor, which processes an array of interaction entries.
 * Each entry is mapped to a route name and stores associated metadata such as duration, user, transaction, and replay updateSnapshotAndNotify.
 *
 * @param {Array<Object>} interactionEntries - An array of interaction entry objects to be processed.
 * @returns {InteractionEntryProcessor} An instance of InteractionEntryProcessor initialized with the provided entries.
 */
function createInteractionEntryProcessor(interactionEntries) {
  // The bq0 class is assumed to handle processing of interaction entries
  return new bq0(interactionEntries);
}

module.exports = createInteractionEntryProcessor;