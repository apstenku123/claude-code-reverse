/**
 * Clones the current instance with selected options, handling stream input if present.
 *
 * This function creates a new instance of the same constructor as the current object,
 * copies over relevant options (excluding debuglog and queueListener, which are handled separately),
 * and, if the input is a stream, sets up a 'finish' event listener to transfer the input buffer
 * and emit a finish event on the new instance.
 *
 * @returns {Object} a new instance of the same constructor, with options and event listeners set up.
 */
function cloneWithOptionsAndStreamHandling() {
  // Create a new instance using the same constructor as the current object
  const clonedInstance = this.constructor.call();

  // Destructure options to extract debuglog and queueListener, and collect the rest
  const {
    debuglog,
    queueListener,
    ...otherOptions
  } = this.options;

  // Deep clone the remaining options to avoid mutation
  clonedInstance.options = structuredClone(otherOptions);

  // Explicitly set debuglog and queueListener on the cloned instance'createInteractionAccessor options
  clonedInstance.options.debuglog = debuglog;
  clonedInstance.options.queueListener = queueListener;

  // If the input is a stream, set up a finish event listener
  if (this._isStreamInput()) {
    this.on("finish", () => {
      // Flatten the buffer in the current instance
      this._flattenBufferIn();
      // Copy the input buffer to the cloned instance'createInteractionAccessor options
      clonedInstance.options.input.buffer = this.options.input.buffer;
      // Emit the finish event on the cloned instance
      clonedInstance.emit("finish");
    });
  }

  return clonedInstance;
}

module.exports = cloneWithOptionsAndStreamHandling;