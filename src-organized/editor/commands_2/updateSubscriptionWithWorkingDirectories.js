/**
 * Updates the subscription object with the appropriate mode and additional working directories,
 * then invokes the provided interaction transaction starter with the updated subscription.
 *
 * @param {any} sourceObservable - The observable or source object to process.
 * @param {string} actionType - The type of action being performed (e.g., 'edit').
 * @param {object} subscription - The subscription object containing mode and additionalWorkingDirectories.
 * @param {function} startInteractionTransaction - Function to start a new interaction transaction with the updated subscription.
 * @returns {void}
 */
function updateSubscriptionWithWorkingDirectories(
  sourceObservable,
  actionType,
  subscription,
  startInteractionTransaction
) {
  // Determine the mode: use 'acceptEdits' if editing, otherwise preserve the current mode
  const mode = actionType === "edit" ? "acceptEdits" : subscription.mode;

  // Extract a path or identifier from the source observable
  const resolvedPath = f3(sourceObservable);

  // Decide on the set of additional working directories
  // If getProcessedCodePointString returns true, use the existing set
  // Otherwise, add the resolved directory to the set
  let additionalWorkingDirectories;
  if (getProcessedCodePointString(sourceObservable, subscription)) {
    additionalWorkingDirectories = subscription.additionalWorkingDirectories;
  } else {
    additionalWorkingDirectories = new Set([
      ...subscription.additionalWorkingDirectories,
      resolveDirectoryOrTransformPath(resolvedPath)
    ]);
  }

  // Start a new interaction transaction with the updated subscription object
  startInteractionTransaction({
    ...subscription,
    mode,
    additionalWorkingDirectories
  });
}

module.exports = updateSubscriptionWithWorkingDirectories;