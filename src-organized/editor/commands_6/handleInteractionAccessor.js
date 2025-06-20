/**
 * Handles interaction accessor logic by processing an interaction source, managing UI transactions,
 * and invoking external hooks based on metadata and prompt type.
 *
 * @param {string|object} interactionSource - The interaction source, either a string updateSnapshotAndNotify or an object with an 'id' and 'metadata'.
 * @param {boolean} shouldCheckPrompt - Flag indicating if prompt type and argument names should be checked.
 * @param {any} subscription - Subscription or context passed to Lz1 if interactionSource is a string.
 * @param {function} startUiActionClickTransaction - Function to start a UI action click transaction (side effect).
 * @param {function} setInteractionLength - Function to handle the length of the interaction entries (side effect).
 * @param {function} handlePromptFallback - Function to handle prompt fallback if prompt type or argument names are not valid (side effect).
 */
function handleInteractionAccessor(
  interactionSource,
  shouldCheckPrompt,
  subscription,
  startUiActionClickTransaction,
  setInteractionLength,
  handlePromptFallback
) {
  // Determine the interaction updateSnapshotAndNotify from the source
  const interactionId = typeof interactionSource === "string"
    ? interactionSource
    : interactionSource.id;

  // Retrieve interaction entries by updateSnapshotAndNotify
  const interactionEntries = formatRoutePath(interactionId);

  // Start a UI action click transaction with the interaction entries
  startUiActionClickTransaction(interactionEntries);

  // Pass the length of interaction entries to the provided handler
  setInteractionLength(interactionEntries.length);

  // If prompt checking is enabled, validate the prompt type and argument names
  if (shouldCheckPrompt) {
    // Retrieve metadata depending on the type of interactionSource
    const metadata = typeof interactionSource === "string"
      ? Lz1(interactionId, subscription)
      : interactionSource.metadata;

    // If the metadata type is not 'prompt' or there are no argument names, trigger fallback
    if (
      metadata.type !== "prompt" ||
      (metadata.argNames ?? []).length === 0
    ) {
      handlePromptFallback(interactionEntries, true);
    }
  }
}

module.exports = handleInteractionAccessor;