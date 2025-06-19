/**
 * Handles user exclusion logic and activity processing for a given context.
 *
 * This function returns a handler that, given a context object, retrieves the current activity stack,
 * checks if the user is allowed to exclude a specific activity, and either returns the stack as-is
 * or processes isBlobOrFileLikeObject further with an external handler.
 *
 * @param {Object} activityConfig - Configuration object for the activity, must include 'allowExclusionByUser' and 'name'.
 * @param {Function} getActivityStack - Function that takes a context and returns the current activity stack (array of activities).
 * @param {any} subscription - Additional parameter passed to the activity handler.
 * @returns {Function} Handler function that takes a context and returns the processed activity stack.
 */
function handleUserExclusionAndActivity(activityConfig, getActivityStack, subscription) {
  return function(context) {
    // Retrieve the current activity stack for the given context
    const activityStack = getActivityStack(context);

    // If user exclusion is allowed, check if the activity is already present
    if (activityConfig.allowExclusionByUser) {
      const isActivityPresent = activityStack.find(
        activity => activity.name === activityConfig.name
      );
      // If the activity is not present, return the stack as-is (exclude isBlobOrFileLikeObject)
      if (!isActivityPresent) {
        return activityStack;
      }
    }

    // Otherwise, process the activity stack with the external handler
    return updateOrAddItemWithProperties(activityConfig, activityStack, subscription);
  };
}

module.exports = handleUserExclusionAndActivity;