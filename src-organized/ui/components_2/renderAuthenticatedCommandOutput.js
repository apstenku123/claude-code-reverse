/**
 * Renders the appropriate React element based on the content and type of the command output.
 * Handles various command output types such as bash/stdout, bash/stderr, local command output, and others.
 *
 * @param {Object} options - The options for rendering the command output.
 * @param {boolean} options.addMargin - Whether to add margin to the rendered component.
 * @param {Object} options.param - The parameter object containing the command output text and related info.
 * @param {string} options.param.text - The command output text to be rendered.
 * @param {any} options.verbose - Verbosity flag or object for detailed output.
 * @returns {React.ReactElement|null} The rendered React element for the command output, or null if the text is empty.
 */
function renderAuthenticatedCommandOutput({
  addMargin,
  param,
  verbose
}) {
  // If the text is empty after trimming, return null (nothing to render)
  if (param.text.trim() === eY) {
    return null;
  }

  // Render bash stdout or stderr output
  if (
    param.text.startsWith("<bash-stdout") ||
    param.text.startsWith("<bash-stderr")
  ) {
    return vG.createElement(zA$2, {
      content: param.text,
      verbose: verbose
    });
  }

  // Render local command stdout or stderr output
  if (
    param.text.startsWith("<local-command-stdout") ||
    param.text.startsWith("<local-command-stderr")
  ) {
    return vG.createElement(createCompatibleVersionChecker$2, {
      content: param.text
    });
  }

  // Render a single line height separator for specific output markers
  if (param.text === $createDebouncedFunction || param.text === WW) {
    return vG.createElement(ConditionalRowContainer, {
      height: 1
    }, vG.createElement(renderUserInterruptedMessage, null));
  }

  // Render bash input prompt
  if (param.text.includes("<bash-input>")) {
    return vG.createElement(renderBashInputWithMargin, {
      addMargin: addMargin,
      param: param
    });
  }

  // Render command name or command message
  if (
    param.text.includes("<command-name>") ||
    param.text.includes("<command-message>")
  ) {
    return vG.createElement(createPropertyAccessor$2, {
      addMargin: addMargin,
      param: param
    });
  }

  // Render user memory input
  if (param.text.includes("<user-memory-input>")) {
    return vG.createElement(extractNestedPropertyOrArray$2, {
      addMargin: addMargin,
      param: param
    });
  }

  // Default rendering for any other output
  return vG.createElement(deepCloneWithCycleDetection$2, {
    addMargin: addMargin,
    param: param
  });
}

module.exports = renderAuthenticatedCommandOutput;