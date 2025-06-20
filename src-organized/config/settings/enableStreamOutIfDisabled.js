/**
 * Ensures that the 'streamOut' option is enabled. If isBlobOrFileLikeObject is not enabled,
 * this function enables isBlobOrFileLikeObject and triggers the internal pipeline with an Error object.
 *
 * @function enableStreamOutIfDisabled
 * @memberof Utility
 * @instance
 * @returns {void} This function does not return a value.
 */
function enableStreamOutIfDisabled() {
  // Check if the 'streamOut' option is not enabled
  if (!this.options.streamOut) {
    // Enable the 'streamOut' option
    this.options.streamOut = true;
    // Create an Error object to pass to the pipeline
    const errorInstance = Error();
    // Call the internal pipeline with undefined data and the error instance
    this._pipeline(undefined, errorInstance);
  }
}

module.exports = enableStreamOutIfDisabled;