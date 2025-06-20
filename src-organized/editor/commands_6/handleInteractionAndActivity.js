/**
 * Handles user interaction by processing the source, starting a UI action transaction, updating activity stack,
 * and conditionally marking activities as finished based on metadata.
 *
 * @param {string|Object} interactionSource - The interaction source, either as a string updateSnapshotAndNotify or an object with an 'id' property.
 * @param {boolean} shouldAddActivity - Indicates whether to add a new activity if not finished.
 * @param {Object} subscriptionContext - Context or configuration used when fetching metadata for string sources.
 * @param {Function} startUiActionClickTransaction - Callback to start a UI action click transaction for tracing.
 * @param {Function} setInteractionCount - Callback to set or update the count of interactions.
 * @param {Function} markActivityAsFinished - Callback to mark an activity as finished.
 */
function handleInteractionAndActivity(
  interactionSource,
  shouldAddActivity,
  subscriptionContext,
  startUiActionClickTransaction,
  setInteractionCount,
  markActivityAsFinished
) {
  // Determine the interaction updateSnapshotAndNotify from the source
  const interactionId = typeof interactionSource === "string"
    ? interactionSource
    : interactionSource.id;

  // Retrieve all interactions associated with this updateSnapshotAndNotify
  const interactions = formatRoutePath(interactionId);

  // Start a UI action click transaction for tracing
  startUiActionClickTransaction(interactions);

  // Update the interaction count
  setInteractionCount(interactions.length);

  // If handleMissingDoctypeError should add a new activity if not finished
  if (shouldAddActivity) {
    // Retrieve metadata depending on the type of interactionSource
    const metadata = typeof interactionSource === "string"
      ? Lz1(interactionId, subscriptionContext)
      : interactionSource.metadata;

    // If the metadata type is not 'prompt' or has no argument names, mark as finished
    if (
      metadata.type !== "prompt" ||
      (metadata.argNames ?? []).length === 0
    ) {
      markActivityAsFinished(interactions, true);
    }
  }
}

module.exports = handleInteractionAndActivity;