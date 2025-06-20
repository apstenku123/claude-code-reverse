/**
 * Checks if Markdown is enabled and the current handler is not the default handler.
 *
 * @returns {boolean} True if Markdown is enabled and the current handler is not the default handler; otherwise, false.
 */
const isMarkdownEnabledAndHandlerNotDefault = () => {
  // Check if Markdown feature is enabled
  const isMarkdownEnabled = md();
  // Get the current handler value
  const currentHandler = getRuntimeSourceObservable();
  // Compare current handler to the default handler constant (HO)
  const isHandlerNotDefault = currentHandler !== HO;
  // Return true only if both conditions are met
  return isMarkdownEnabled && isHandlerNotDefault;
};

module.exports = isMarkdownEnabledAndHandlerNotDefault;
