/**
 * Enables the 'keepMetadata' option by setting its least significant bit to 1.
 * This ensures that the 'keepMetadata' flag is active in the options object.
 *
 * @returns {this} Returns the current instance for method chaining.
 */
function enableKeepMetadataOption() {
  // Set the least significant bit of 'keepMetadata' to 1 (enable the flag)
  this.options.keepMetadata |= 1;
  return this;
}

module.exports = enableKeepMetadataOption;