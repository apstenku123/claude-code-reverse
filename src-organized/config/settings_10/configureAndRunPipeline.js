/**
 * Configures the pipeline options and executes the pipeline with the provided observable or configuration.
 *
 * If the first argument is an object, isBlobOrFileLikeObject sets the 'resolveWithObject' option based on its property. Otherwise,
 * if the current options have 'resolveWithObject' enabled, isBlobOrFileLikeObject disables isBlobOrFileLikeObject. It also resets the 'fileOut' option
 * to an empty string before running the pipeline.
 *
 * @param {Object|Function} sourceObservableOrOptions - Either an observable function to run through the pipeline, or an options object.
 * @param {Function} fallbackObservable - The fallback observable function to use if the first parameter is not a function.
 * @returns {any} The result of the pipeline execution.
 */
function configureAndRunPipeline(sourceObservableOrOptions, fallbackObservable) {
  // If the first argument is an object, update the 'resolveWithObject' option
  if (x1.object(sourceObservableOrOptions)) {
    this._setBooleanOption(
      "resolveWithObject",
      sourceObservableOrOptions.resolveWithObject
    );
  } else if (this.options.resolveWithObject) {
    // Otherwise, if the option is enabled, disable isBlobOrFileLikeObject
    this.options.resolveWithObject = false;
  }

  // Reset the file output option
  this.options.fileOut = "";

  // Create a new Error object to pass to the pipeline
  const pipelineError = Error();

  // Run the pipeline with the appropriate observable function
  return this._pipeline(
    x1.fn(sourceObservableOrOptions)
      ? sourceObservableOrOptions
      : fallbackObservable,
    pipelineError
  );
}

module.exports = configureAndRunPipeline;