/**
 * Creates a new instance of the current class with cloned options, preserving specific listeners and debug settings.
 * If the input is a stream, sets up a 'finish' event to synchronize the input buffer and emit the finish event on the new instance.
 *
 * @returns {object} a new instance of the current class with cloned and adjusted options.
 */
function createClonedInstanceWithOptions() {
  // Create a new instance of the current class using its constructor
  const clonedInstance = this.constructor.call();

  // Destructure options to extract debuglog and queueListener, and collect the rest
  const {
    debuglog: debugLogger,
    queueListener,
    ...otherOptions
  } = this.options;

  // Clone the remaining options to avoid mutation
  clonedInstance.options = structuredClone(otherOptions);
  // Preserve debugLogger and queueListener in the cloned options
  clonedInstance.options.debuglog = debugLogger;
  clonedInstance.options.queueListener = queueListener;

  // If the input is a stream, set up a finish event to synchronize buffers and emit finish
  if (this._isStreamInput()) {
    this.on("finish", () => {
      this._flattenBufferIn();
      // Synchronize the input buffer in the cloned instance
      clonedInstance.options.input.buffer = this.options.input.buffer;
      // Emit finish event on the cloned instance
      clonedInstance.emit("finish");
    });
  }

  return clonedInstance;
}

module.exports = createClonedInstanceWithOptions;