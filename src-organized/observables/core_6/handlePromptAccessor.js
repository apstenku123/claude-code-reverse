/**
 * Handles prompt accessor logic by retrieving an observable'createInteractionAccessor updateSnapshotAndNotify, fetching its values, and performing
 * additional actions based on its metadata and configuration.
 *
 * @param {(string|object)} sourceObservable - The observable source, either as a string updateSnapshotAndNotify or an object with an 'id' property.
 * @param {boolean} shouldCheckPrompt - Flag indicating whether to check for prompt metadata.
 * @param {object} subscription - Subscription or context object used when fetching metadata.
 * @param {function} onValuesRetrieved - Callback invoked with the observable'createInteractionAccessor values array.
 * @param {function} onLengthRetrieved - Callback invoked with the length of the observable'createInteractionAccessor values array.
 * @param {function} onPromptMissing - Callback invoked if the observable is not a prompt or has no arguments.
 */
function handlePromptAccessor(
  sourceObservable,
  shouldCheckPrompt,
  subscription,
  onValuesRetrieved,
  onLengthRetrieved,
  onPromptMissing
) {
  // Determine the observable updateSnapshotAndNotify from the source (string or object)
  const observableId = typeof sourceObservable === "string" ? sourceObservable : sourceObservable.id;
  // Retrieve the observable'createInteractionAccessor values array using the updateSnapshotAndNotify
  const observableValues = formatRoutePath(observableId);

  // Invoke the callback with the observable'createInteractionAccessor values
  onValuesRetrieved(observableValues);
  // Invoke the callback with the length of the observable'createInteractionAccessor values
  onLengthRetrieved(observableValues.length);

  // If prompt checking is enabled
  if (shouldCheckPrompt) {
    // Retrieve metadata: either via Lz1 (if source is string) or from the object
    const observableMetadata = typeof sourceObservable === "string"
      ? Lz1(observableId, subscription)
      : sourceObservable.metadata;

    // If the observable is not a prompt or has no argument names, invoke the missing prompt callback
    if (
      observableMetadata.type !== "prompt" ||
      (observableMetadata.argNames ?? []).length === 0
    ) {
      onPromptMissing(observableValues, true);
    }
  }
}

module.exports = handlePromptAccessor;