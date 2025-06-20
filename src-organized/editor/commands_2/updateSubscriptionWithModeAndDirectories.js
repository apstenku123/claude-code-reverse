/**
 * Updates a subscription object with the correct mode and working directories, then triggers a UI action transaction.
 *
 * @param {object} sourceObservable - The source observable or context object.
 * @param {string} actionType - The type of action being performed (e.g., 'edit').
 * @param {object} subscription - The current subscription object containing mode and additionalWorkingDirectories.
 * @param {function} startUiActionClickTransaction - Function to start a new UI action transaction (side effect).
 * @returns {void}
 */
function updateSubscriptionWithModeAndDirectories(
  sourceObservable,
  actionType,
  subscription,
  startUiActionClickTransaction
) {
  // Determine the mode: if editing, use 'acceptEdits', otherwise keep the current mode
  const mode = actionType === "edit" ? "acceptEdits" : subscription.mode;

  // Get a normalized directory or identifier from the source observable
  const normalizedDirectory = f3(sourceObservable);

  // Determine the set of additional working directories
  // If nJ returns true, use the existing set; otherwise, add the resolved directory
  const additionalWorkingDirectories = nJ(sourceObservable, subscription)
    ? subscription.additionalWorkingDirectories
    : new Set([
        ...subscription.additionalWorkingDirectories,
        resolveDirectoryOrFallback(normalizedDirectory)
      ]);

  // Trigger the UI action transaction with the updated subscription object
  startUiActionClickTransaction({
    ...subscription,
    mode,
    additionalWorkingDirectories
  });
}

module.exports = updateSubscriptionWithModeAndDirectories;