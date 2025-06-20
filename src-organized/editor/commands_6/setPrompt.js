/**
 * Sets up a prompt based on the provided source and configuration.
 * Handles prompt metadata, triggers UI actions, and manages prompt state.
 *
 * @param {string|object} sourcePrompt - The prompt identifier (string) or prompt object containing metadata.
 * @param {boolean} shouldCheckPromptType - Flag indicating whether to check the prompt type and argument names.
 * @param {object} subscription - Subscription or context object used when fetching prompt metadata.
 * @param {function} startUiActionClickTransaction - Callback to start a UI action click transaction.
 * @param {function} setPromptLength - Callback to handle the prompt length (e.g., for UI updates).
 * @param {function} handlePromptState - Callback to handle prompt state changes (e.g., enabling/disabling prompt).
 */
function setPrompt(
  sourcePrompt,
  shouldCheckPromptType,
  subscription,
  startUiActionClickTransaction,
  setPromptLength,
  handlePromptState
) {
  // Determine the prompt updateSnapshotAndNotify from the source (string or object)
  const promptId = typeof sourcePrompt === "string" ? sourcePrompt : sourcePrompt.id;
  // Retrieve the prompt data using the prompt updateSnapshotAndNotify
  const promptData = formatRoutePath(promptId);

  // Start a UI action click transaction with the prompt data
  startUiActionClickTransaction(promptData);
  // Pass the prompt length to the provided callback
  setPromptLength(promptData.length);

  // If configuration flag is set, check prompt metadata
  if (shouldCheckPromptType) {
    // Retrieve prompt metadata depending on the source type
    const promptMetadata = typeof sourcePrompt === "string"
      ? Lz1(promptId, subscription)
      : sourcePrompt.metadata;

    // If the prompt is not of type 'prompt' or has no argument names, handle prompt state
    if (
      promptMetadata.type !== "prompt" ||
      (promptMetadata.argNames ?? []).length === 0
    ) {
      handlePromptState(promptData, true);
    }
  }
}

module.exports = setPrompt;