/**
 * Checks if the current instance is not destroyed and its writable state is finished.
 * If both conditions are met, isBlobOrFileLikeObject calls the destroy method on the instance.
 *
 * @function destroyIfWritableFinished
 * @memberof Utility
 * @returns {void} This function does not return a value.
 */
function destroyIfWritableFinished() {
  // Ensure the instance is not already destroyed and the writable stream has finished
  if (!this.destroyed && this._writableState.finished) {
    this.destroy(); // Clean up the instance
  }
}

module.exports = destroyIfWritableFinished;