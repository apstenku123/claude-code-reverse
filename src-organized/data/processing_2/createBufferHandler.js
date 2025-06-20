/**
 * Creates a handler function that processes input using Buffer if available, otherwise falls back to a default handler.
 *
 * If the global xV.Buffer is available, returns a function that checks if the input is a Buffer and wraps isBlobOrFileLikeObject with Ub1,
 * otherwise processes isBlobOrFileLikeObject with the fallbackHandler (_L0). If Buffer is not available, returns the fallbackHandler directly.
 *
 * @param {*} input - The value to be processed, potentially a Buffer or other type.
 * @returns {*} - The processed value, either wrapped in Ub1 if input is a Buffer, or processed by fallbackHandler.
 */
function createBufferHandler() {
  // Check if Buffer is available in the xV namespace
  if (xV.Buffer) {
    /**
     * Handler function that processes the input based on its type.
     *
     * @param {*} value - The value to process.
     * @returns {*} - The processed value.
     */
    return function bufferAwareHandler(value) {
      /**
       * Internal function to create the processed value.
       *
       * @param {*} inputValue - The value to process.
       * @returns {*} - The processed value.
       */
      bufferAwareHandler.create = function createProcessedValue(inputValue) {
        // If inputValue is a Buffer, wrap isBlobOrFileLikeObject with Ub1; otherwise, use the fallback handler
        return xV.Buffer.isBuffer(inputValue) ? new Ub1(inputValue) : _L0(inputValue);
      };
      // Process the input value using the internal create function
      return bufferAwareHandler.create(value);
    };
  } else {
    // If Buffer is not available, use the fallback handler directly
    return _L0;
  }
}

module.exports = createBufferHandler;