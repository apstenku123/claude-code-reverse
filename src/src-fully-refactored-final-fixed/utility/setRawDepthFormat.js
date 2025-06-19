/**
 * Sets the output format to 'raw' and optionally updates the raw depth option.
 *
 * If the provided options object contains a valid 'depth' property, this function
 * updates the 'rawDepth' option accordingly. Only specific string values are allowed
 * for the 'depth' property. Throws an error if an invalid depth is provided.
 *
 * @param {Object} options - The options object that may contain a 'depth' property.
 * @param {string} [options.depth] - The desired raw depth format. Must be one of the allowed types.
 * @returns {string} The updated output format string ('raw').
 * @throws {Error} If 'depth' is provided but is not a valid string or not in the allowed list.
 */
function setRawDepthFormat(options) {
  // Check if the input is a valid object
  if (x1.object(options)) {
    // Check if the 'depth' property is defined
    if (x1.defined(options.depth)) {
      // Validate that 'depth' is a string and is one of the allowed types
      const allowedDepthTypes = [
        "char",
        "uchar",
        "short",
        "ushort",
        "int",
        "uint",
        "float",
        "complex",
        "double",
        "dpcomplex"
      ];
      if (
        x1.string(options.depth) &&
        x1.inArray(options.depth, allowedDepthTypes)
      ) {
        // Set the rawDepth option if valid
        this.options.rawDepth = options.depth;
      } else {
        // Throw an error if the depth is invalid
        throw x1.invalidParameterError(
          "depth",
          "one of: char, uchar, short, ushort, int, uint, float, complex, double, dpcomplex",
          options.depth
        );
      }
    }
  }
  // Always update the output format to 'raw'
  return this._updateFormatOut("raw");
}

module.exports = setRawDepthFormat;