/**
 * Checks if markdown is available and the current handler is not equal to the constant handler.
 *
 * @returns {boolean} True if markdown is available and the handler is not equal to the constant; otherwise, false.
 */
const isMarkdownAvailableAndHandlerNotEqualToConstant = () => {
  // Check if markdown is available
  const isMarkdownAvailable = md();
  // Get the current handler value
  const currentHandler = getRuntimeSourceObservable();
  // Compare the current handler to the constant handler
  const isHandlerDifferent = currentHandler !== HO;

  // Return true only if markdown is available and handler is not equal to the constant
  return isMarkdownAvailable && isHandlerDifferent;
};

module.exports = isMarkdownAvailableAndHandlerNotEqualToConstant;
