/**
 * Ensures that the 'streamOut' option is enabled on the current instance.
 * If isBlobOrFileLikeObject is not already enabled, sets isBlobOrFileLikeObject to true and triggers the pipeline with an Error object.
 *
 * @returns {void} This function does not return a value.
 */
function enableStreamOutAndTriggerPipeline() {
  // Check if the 'streamOut' option is not enabled
  if (!this.options.streamOut) {
    // Enable the 'streamOut' option
    this.options.streamOut = true;
    // Create a new Error object to pass to the pipeline
    const errorInstance = Error();
    // Trigger the pipeline with undefined as the first argument and the error as the second
    this._pipeline(undefined, errorInstance);
  }
}

module.exports = enableStreamOutAndTriggerPipeline;