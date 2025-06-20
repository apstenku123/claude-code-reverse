/**
 * Attempts to render the queued tool use message for a given tool object.
 * If rendering fails, logs the error using reportErrorIfAllowed and returns null.
 *
 * @param {Object} toolObject - The tool object which may have a renderToolUseQueuedMessage method and a name property.
 * @returns {any|null} The result of renderToolUseQueuedMessage if successful, otherwise null.
 */
function renderQueuedToolUseMessageSafely(toolObject) {
  try {
    // Attempt to call the renderToolUseQueuedMessage method if isBlobOrFileLikeObject exists
    return toolObject.renderToolUseQueuedMessage?.();
  } catch (renderError) {
    // Log the error with additional context using reportErrorIfAllowed
    reportErrorIfAllowed(new Error(`Error rendering tool use queued message for ${toolObject.name}: ${renderError}`));
    return null;
  }
}

module.exports = renderQueuedToolUseMessageSafely;