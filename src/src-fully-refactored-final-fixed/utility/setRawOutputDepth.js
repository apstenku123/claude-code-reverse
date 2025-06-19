/**
 * Sets the raw output depth option if provided and valid, then updates the output format to 'raw'.
 *
 * @param {Object} options - Configuration object that may contain a 'depth' property specifying the output depth type.
 * @returns {string} The result of updating the output format to 'raw'.
 * @throws {Error} If the 'depth' property is provided but not a valid string or not in the allowed list.
 */
function setRawOutputDepth(options) {
  // Check if the input is an object
  if (x1.object(options)) {
    // Check if the 'depth' property is defined
    if (x1.defined(options.depth)) {
      // Validate that 'depth' is a string and is one of the allowed depth types
      const allowedDepthTypes = [
        "char", "uchar", "short", "ushort", "int", "uint", "float", "complex", "double", "dpcomplex"
      ];
      if (
        x1.string(options.depth) &&
        x1.inArray(options.depth, allowedDepthTypes)
      ) {
        // Set the rawDepth option if valid
        this.options.rawDepth = options.depth;
      } else {
        // Throw an error if 'depth' is invalid
        throw x1.invalidParameterError(
          "depth",
          "one of: char, uchar, short, ushort, int, uint, float, complex, double, dpcomplex",
          options.depth
        );
      }
    }
  }
  // Update the output format to 'raw' and return the result
  return this._updateFormatOut("raw");
}

module.exports = setRawOutputDepth;