/**
 * Sets the 'keepMetadata' option flag to include the value 8 (bitwise OR),
 * ensuring that the metadata is preserved according to the options configuration.
 *
 * @function enableKeepMetadataFlag
 * @memberof SomeClass
 * @returns {this} Returns the current instance for method chaining.
 */
function enableKeepMetadataFlag() {
  // Bitwise OR assignment to ensure the 8th bit is set in keepMetadata
  this.options.keepMetadata |= 8;
  return this;
}

module.exports = enableKeepMetadataFlag;