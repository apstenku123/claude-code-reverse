/**
 * Renders a tool usage progress message using the provided source and configuration.
 * If rendering fails, logs the error and returns null.
 *
 * @param {Object} toolRenderer - An object with a renderToolUseProgressMessage method and a name property.
 * @param {Object} toolList - The list or configuration of tools to pass to the renderer.
 * @param {any} progressData - The data representing the current progress state.
 * @param {Object} options - Additional options for rendering.
 * @param {boolean} options.verbose - Whether to render in verbose mode.
 * @returns {any} The rendered progress message, or null if an error occurs.
 */
function renderToolProgressWithErrorHandling(toolRenderer, toolList, progressData, { verbose }) {
  try {
    // Attempt to render the tool use progress message with the provided parameters
    return toolRenderer.renderToolUseProgressMessage(progressData, {
      tools: toolList,
      verbose: verbose
    });
  } catch (error) {
    // Log the error using the reportErrorIfAllowed function and return null
    reportErrorIfAllowed(new Error(`Error rendering tool use progress message for ${toolRenderer.name}: ${error}`));
    return null;
  }
}

module.exports = renderToolProgressWithErrorHandling;