/**
 * Returns encoding strategy functions for high-resolution time and span context based on the provided options.
 *
 * @param {Object} [options] - Configuration options for encoding strategies.
 * @param {boolean} [options.useLongBits=true] - Whether to use long bits encoding for high-resolution time.
 * @param {boolean} [options.useHex=false] - Whether to use hexadecimal encoding for span context.
 * @returns {Object} An object containing encoding functions for high-resolution time, span context, and optional span context.
 *   - encodeHrTime: Function to encode high-resolution time.
 *   - encodeSpanContext: Function to encode span context.
 *   - encodeOptionalSpanContext: Function to encode optional span context.
 */
function getEncodingStrategies(options) {
  // If options are not provided, return the default encoding strategies
  if (options === undefined) return EA6;

  // Determine which encoding strategies to use based on options
  const useLongBits = options.useLongBits ?? true;
  const useHexEncoding = options.useHex ?? false;

  return {
    // Choose encoding function for high-resolution time
    encodeHrTime: useLongBits ? Ob1 : wA6,
    // Choose encoding function for span context
    encodeSpanContext: useHexEncoding ? processInteractionEntries : Lb1.hexToBinary,
    // Choose encoding function for optional span context
    encodeOptionalSpanContext: useHexEncoding ? processInteractionEntries : convertHexToBinary
  };
}

module.exports = getEncodingStrategies;