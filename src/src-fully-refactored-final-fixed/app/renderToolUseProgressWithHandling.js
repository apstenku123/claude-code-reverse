/**
 * Renders a tool use progress message using the provided renderer and configuration.
 * Handles errors by logging them and returning null if rendering fails.
 *
 * @param {Object} toolRenderer - An object with a renderToolUseProgressMessage method and a name property.
 * @param {Array|Object} toolsConfig - The configuration or list of tools to be used in rendering.
 * @param {any} progressData - Data representing the current progress to be rendered.
 * @param {Object} options - Additional options for rendering.
 * @param {boolean} options.verbose - Whether to enable verbose output.
 * @returns {any} The rendered progress message, or null if an error occurs.
 */
function renderToolUseProgressWithHandling(toolRenderer, toolsConfig, progressData, { verbose }) {
  try {
    // Attempt to render the tool use progress message
    return toolRenderer.renderToolUseProgressMessage(progressData, {
      tools: toolsConfig,
      verbose: verbose
    });
  } catch (error) {
    // Log the error using the external reportErrorIfAllowed function, then return null
    reportErrorIfAllowed(new Error(`Error rendering tool use progress message for ${toolRenderer.name}: ${error}`));
    return null;
  }
}

module.exports = renderToolUseProgressWithHandling;