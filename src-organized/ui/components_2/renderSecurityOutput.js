/**
 * Renders the appropriate React component based on the content of the security output text.
 *
 * @param {Object} options - The options for rendering the security output.
 * @param {boolean} options.addMargin - Whether to add margin to the rendered component.
 * @param {Object} options.param - The parameter object containing the output text and related data.
 * @param {string} options.param.text - The output text to be analyzed and rendered.
 * @param {boolean} options.verbose - Whether to render in verbose mode.
 * @returns {React.ReactElement|null} The rendered React element based on the output text, or null if the text is empty.
 */
function renderSecurityOutput({
  addMargin,
  param,
  verbose
}) {
  // Return null if the text is empty after trimming
  if (param.text.trim() === eY) {
    return null;
  }

  // Render Bash stdout/stderr output
  if (
    param.text.startsWith("<bash-stdout") ||
    param.text.startsWith("<bash-stderr")
  ) {
    return vG.createElement(zA$2, {
      content: param.text,
      verbose: verbose
    });
  }

  // Render local command stdout/stderr output
  if (
    param.text.startsWith("<local-command-stdout") ||
    param.text.startsWith("<local-command-stderr")
  ) {
    return vG.createElement(createCompatibleVersionChecker$2, {
      content: param.text
    });
  }

  // Render a separator line if the text matches specific values
  if (param.text === $createDebouncedFunction || param.text === WW) {
    return vG.createElement(ConditionalRowContainer, {
      height: 1
    }, vG.createElement(renderUserInterruptedMessage, null));
  }

  // Render Bash input
  if (param.text.includes("<bash-input>")) {
    return vG.createElement(renderBashInputWithMargin, {
      addMargin: addMargin,
      param: param
    });
  }

  // Render command name or message
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

  // Default rendering for all other cases
  return vG.createElement(deepCloneWithCycleDetection$2, {
    addMargin: addMargin,
    param: param
  });
}

module.exports = renderSecurityOutput;