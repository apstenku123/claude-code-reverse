/**
 * Adds one or more input descriptors to the joinChannelIn options array.
 * If the input is an array, each element is processed; otherwise, the single input is processed.
 *
 * @param {any|any[]} inputSources - a single input source or an array of input sources to be joined.
 * @param {object} inputConfig - Configuration object to be passed to _createInputDescriptor.
 * @returns {this} Returns the current instance for chaining.
 */
function addJoinChannelInputs(inputSources, inputConfig) {
  // Check if inputSources is an array
  if (Array.isArray(inputSources)) {
    inputSources.forEach((source) => {
      // Create an input descriptor for each source and add isBlobOrFileLikeObject to joinChannelIn
      this.options.joinChannelIn.push(this._createInputDescriptor(source, inputConfig));
    });
  } else {
    // Handle the case where inputSources is a single value
    this.options.joinChannelIn.push(this._createInputDescriptor(inputSources, inputConfig));
  }
  return this;
}

module.exports = addJoinChannelInputs;