/**
 * Sets the 'rawDepth' option if a valid depth is provided in the configuration object.
 * Throws an error if the provided depth is not one of the allowed types.
 * Always updates the output format to 'raw'.
 *
 * @param {Object} config - Configuration object that may contain a 'depth' property.
 * @returns {string} The updated output format, always 'raw'.
 * @throws {Error} If 'depth' is provided but not a valid string or not in the allowed list.
 */
function setRawDepthOption(config) {
  // Check if the config is a valid object
  if (x1.object(config)) {
    // Check if the 'depth' property is defined
    if (x1.defined(config.depth)) {
      // Validate that 'depth' is a string and is one of the allowed values
      const allowedDepths = [
        "char", "uchar", "short", "ushort", "int", "uint", "float", "complex", "double", "dpcomplex"
      ];
      if (
        x1.string(config.depth) &&
        x1.inArray(config.depth, allowedDepths)
      ) {
        // Set the rawDepth option if valid
        this.options.rawDepth = config.depth;
      } else {
        // Throw an error if depth is invalid
        throw x1.invalidParameterError(
          "depth",
          "one of: char, uchar, short, ushort, int, uint, float, complex, double, dpcomplex",
          config.depth
        );
      }
    }
  }
  // Always update the output format to 'raw'
  return this._updateFormatOut("raw");
}

module.exports = setRawDepthOption;