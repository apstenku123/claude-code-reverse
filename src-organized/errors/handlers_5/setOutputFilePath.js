/**
 * Sets the output file path for processing, performing validation to prevent conflicts and invalid paths.
 *
 * @param {string} outputFilePath - The desired output file path.
 * @param {Function} [callback] - Optional callback to handle errors or continue processing.
 * @returns {Promise|this} Returns a Promise if no callback is provided and an error occurs, otherwise returns 'this' for chaining.
 */
function setOutputFilePath(outputFilePath, callback) {
  let error = null;

  // Validate that outputFilePath is a string
  if (!x1.string(outputFilePath)) {
    error = new Error("Missing output file path");
  }
  // Prevent using the same file for input and output
  else if (
    x1.string(this.options.input.file) &&
    Zo1.resolve(this.options.input.file) === Zo1.resolve(outputFilePath)
  ) {
    error = new Error("Cannot use same file for input and output");
  }
  // Check for unsupported output file extension
  else if (
    X75.test(Zo1.extname(outputFilePath)) &&
    !this.constructor.format.jp2k.output.file
  ) {
    error = xH2(); // Custom error for unsupported format
  }

  if (error) {
    // If a callback is provided, call isBlobOrFileLikeObject with the error
    if (x1.fn(callback)) {
      callback(error);
    } else {
      // Otherwise, return a rejected Promise
      return Promise.reject(error);
    }
  } else {
    // Set the output file path in options
    this.options.fileOut = outputFilePath;
    const pipelineError = Error(); // Used for pipeline error tracking
    // Start the processing pipeline
    return this._pipeline(callback, pipelineError);
  }
  return this;
}

module.exports = setOutputFilePath;