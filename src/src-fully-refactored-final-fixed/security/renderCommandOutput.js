/**
 * Renders the appropriate React element based on the content of the command output.
 * Handles various types of command output (bash/local stdout/stderr, input, messages, etc.)
 * and returns the corresponding React component for rendering.
 *
 * @param {Object} options - The options object.
 * @param {boolean} options.addMargin - Whether to add margin to the rendered component.
 * @param {Object} options.param - The parameter object containing command output details.
 * @param {string} options.param.text - The text content of the command output.
 * @param {boolean} options.verbose - Whether to render in verbose mode.
 * @returns {React.ReactElement|null} The React element to render, or null if the text is empty.
 */
function renderCommandOutput({
  addMargin,
  param,
  verbose
}) {
  // If the text is empty after trimming, render nothing
  if (param.text.trim() === eY) {
    return null;
  }

  // Render bash stdout/stderr output
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

  // Render a separator line for special output markers
  if (param.text === $createDebouncedFunction || param.text === WW) {
    return vG.createElement(ConditionalRowContainer, {
      height: 1
    }, vG.createElement(renderUserInterruptedMessage, null));
  }

  // Render bash input
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

  // Default: render generic command output
  return vG.createElement(deepCloneWithCycleDetection$2, {
    addMargin: addMargin,
    param: param
  });
}

module.exports = renderCommandOutput;