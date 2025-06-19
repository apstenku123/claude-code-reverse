/**
 * Sets the ICC profile option and related metadata handling options.
 *
 * @param {string} iccProfile - The ICC profile string to set. Must be a string.
 * @param {Object} [options] - Optional configuration object for metadata handling.
 * @param {boolean} [options.attach] - Whether to attach ICC profile metadata. Must be a boolean if provided.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if parameters are of invalid types.
 */
function setIccProfileOptions(iccProfile, options) {
  // Validate that iccProfile is a string
  if (x1.string(iccProfile)) {
    this.options.withIccProfile = iccProfile;
  } else {
    throw x1.invalidParameterError("icc", "string", iccProfile);
  }

  // Always call keepIccProfile (side effect, possibly ensures ICC profile is retained)
  this.keepIccProfile();

  // If options is provided and is an object, process its properties
  if (x1.object(options)) {
    // If 'attach' property is defined
    if (x1.defined(options.attach)) {
      // Validate that 'attach' is a boolean
      if (x1.bool(options.attach)) {
        // If 'attach' is false, update keepMetadata bitmask to remove ICC profile metadata
        if (!options.attach) {
          this.options.keepMetadata &= -9; // Bitwise operation to clear the 4th bit
        }
      } else {
        throw x1.invalidParameterError("attach", "boolean", options.attach);
      }
    }
  }

  return this;
}

module.exports = setIccProfileOptions;