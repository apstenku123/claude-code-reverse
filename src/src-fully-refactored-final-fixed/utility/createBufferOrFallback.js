/**
 * Utility function that returns a buffer creation function if Buffer is available,
 * otherwise falls back to a default handler. The returned function creates a buffer
 * from the input if possible, or uses the fallback handler.
 *
 * @param {*} input - The data to be processed, typically a Buffer or similar object.
 * @returns {*} - Returns a new buffer if input is a Buffer, otherwise the result of the fallback handler.
 */
function createBufferOrFallback() {
  // Check if Buffer is available in the xV namespace
  if (xV.Buffer) {
    /**
     * Creates a buffer from the input if possible, otherwise uses the fallback handler.
     *
     * @param {*} input - The data to process.
     * @returns {*} - The processed data, either as a buffer or via the fallback.
     */
    const bufferHandler = function(input) {
      // Attach a 'create' method to the handler for external use
      bufferHandler.create = function(data) {
        // If the input is a Buffer, wrap isBlobOrFileLikeObject with Ub1, otherwise use the fallback handler
        return xV.Buffer.isBuffer(data) ? new Ub1(data) : _L0(data);
      };
      // Call the 'create' method with the provided input
      return bufferHandler.create(input);
    };
    return bufferHandler;
  } else {
    // If Buffer is not available, use the fallback handler directly
    return _L0;
  }
}

module.exports = createBufferOrFallback;