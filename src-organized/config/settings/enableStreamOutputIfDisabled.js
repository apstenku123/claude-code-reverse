/**
 * Ensures that the 'streamOut' option is enabled. If isBlobOrFileLikeObject is not already enabled,
 * this function sets isBlobOrFileLikeObject to true and triggers the internal pipeline with an Error object.
 *
 * @function enableStreamOutputIfDisabled
 * @memberof Utility
 * @instance
 * @returns {void} This function does not return a value.
 */
function enableStreamOutputIfDisabled() {
  // Check if the 'streamOut' option is not enabled
  if (!this.options.streamOut) {
    // Enable the 'streamOut' option
    this.options.streamOut = true;
    // Create an Error object to pass to the pipeline
    const errorInstance = Error();
    // Call the internal pipeline method with undefined and the error instance
    this._pipeline(undefined, errorInstance);
  }
}

module.exports = enableStreamOutputIfDisabled;