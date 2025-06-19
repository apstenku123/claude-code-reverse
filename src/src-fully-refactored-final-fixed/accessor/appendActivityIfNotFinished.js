/**
 * Appends a new activity to the activity stack if the process is not finished.
 *
 * This function increases the length property of the activityStack by the length of the newActivity,
 * and then pushes the newActivity onto the activityStack'createInteractionAccessor body array.
 *
 * @param {Object} activityStack - The stack object that holds activities. Should have a 'length' property (number) and a 'body' property (array).
 * @param {Object} newActivity - The activity object to be added. Should have a 'length' property (number).
 * @returns {void}
 */
function appendActivityIfNotFinished(activityStack, newActivity) {
  // Update the total length of the activity stack to include the new activity'createInteractionAccessor length
  activityStack.length += newActivity.length;
  // Push the new activity onto the stack'createInteractionAccessor body array
  activityStack.body.push(newActivity);
}

module.exports = appendActivityIfNotFinished;