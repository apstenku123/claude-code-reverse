/**
 * Appends a new activity to the activity stack and updates the total length.
 *
 * @param {Object} activityStack - The object representing the current stack of activities.
 * @param {Array} activityStack.body - The array holding activity objects.
 * @param {number} activityStack.length - The current total length of activities.
 * @param {Object} newActivity - The activity object to add to the stack.
 * @param {number} newActivity.length - The length of the new activity to be added.
 *
 * @returns {void}
 *
 * @example
 * const activityStack = { length: 2, body: [{...}] };
 * const newActivity = { length: 3, ... };
 * appendActivityAndUpdateLength(activityStack, newActivity);
 * // activityStack.length is now 5, and newActivity is pushed to activityStack.body
 */
function appendActivityAndUpdateLength(activityStack, newActivity) {
  // Update the total length to include the new activity'createInteractionAccessor length
  activityStack.length += newActivity.length;
  // Add the new activity to the activity stack
  activityStack.body.push(newActivity);
}

module.exports = appendActivityAndUpdateLength;