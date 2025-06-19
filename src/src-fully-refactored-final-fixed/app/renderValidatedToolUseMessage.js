/**
 * Attempts to validate input data against a provided schema and render a tool use message if validation succeeds.
 * If validation fails, returns null. If an error occurs during rendering, logs the error and returns null.
 *
 * @param {Object} toolDefinition - The tool definition object containing inputSchema and renderToolUseMessage.
 * @param {any} inputData - The input data to validate and render.
 * @param {Object} options - Options for rendering.
 * @param {boolean} options.verbose - Whether to render the message in verbose mode.
 * @returns {any|null} The rendered tool use message, or null if validation fails or an error occurs.
 */
function renderValidatedToolUseMessage(toolDefinition, inputData, { verbose }) {
  try {
    // Validate the input data using the tool'createInteractionAccessor input schema
    const validationResult = toolDefinition.inputSchema.safeParse(inputData);
    if (!validationResult.success) {
      // If validation fails, return null
      return null;
    }
    // If validation succeeds, render the tool use message
    return toolDefinition.renderToolUseMessage(validationResult.data, { verbose });
  } catch (error) {
    // Log the error using reportErrorIfAllowed and return null
    reportErrorIfAllowed(new Error(`Error rendering tool use message for ${toolDefinition.name}: ${error}`));
    return null;
  }
}

module.exports = renderValidatedToolUseMessage;