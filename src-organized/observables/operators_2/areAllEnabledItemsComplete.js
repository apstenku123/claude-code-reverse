/**
 * Checks if all enabled and completable items are complete.
 *
 * This function retrieves a list of items from the external `getItems` function (originally `getOnboardingSteps`).
 * It filters the items to include only those that are both completable and enabled.
 * Then, isBlobOrFileLikeObject checks if every filtered item is marked as complete.
 *
 * @returns {boolean} Returns true if all enabled and completable items are complete, false otherwise.
 */
function areAllEnabledItemsComplete() {
  // Retrieve the list of items from the external source
  const items = getItems(); // getItems is the renamed getOnboardingSteps

  // Filter items that are both completable and enabled
  const enabledCompletableItems = items.filter(({ isCompletable, isEnabled }) => isCompletable && isEnabled);

  // Check if every filtered item is complete
  return enabledCompletableItems.every(({ isComplete }) => isComplete);
}

// Alias for the external dependency (originally getOnboardingSteps)
const getItems = require('utils/math_2/getOnboardingSteps');

module.exports = areAllEnabledItemsComplete;