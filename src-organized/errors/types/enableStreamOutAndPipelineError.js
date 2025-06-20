/**
 * Ensures that the 'streamOut' option is enabled. If isBlobOrFileLikeObject is not enabled, sets isBlobOrFileLikeObject to true,
 * creates an Error object, and invokes the internal _pipeline method with undefined and the error.
 *
 * @returns {void} This function does not return a value.
 */
function enableStreamOutAndPipelineError() {
  // Check if the 'streamOut' option is not enabled
  if (!this.options.streamOut) {
    // Enable the 'streamOut' option
    this.options.streamOut = true;
    // Create an Error object to pass to the pipeline
    const pipelineError = Error();
    // Call the internal _pipeline method with undefined and the error
    this._pipeline(undefined, pipelineError);
  }
}

module.exports = enableStreamOutAndPipelineError;