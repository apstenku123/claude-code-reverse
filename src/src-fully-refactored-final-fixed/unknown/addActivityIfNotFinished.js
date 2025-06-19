/**
 * Adds a new activity to the activity stack if the process is not finished.
 *
 * @param {any} activity - The activity object to be added to the stack.
 * @returns {void}
 */
function addActivityIfNotFinished(activity) {
  // If the process is already marked as finished, do not add new activities
  if (this._finished) return;
  // Push the new activity to the stack
  this._pushActivity(activity);
}

module.exports = addActivityIfNotFinished;