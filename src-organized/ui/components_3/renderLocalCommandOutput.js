/**
 * Renders the output of a local command, displaying stdout and stderr if available.
 * If neither is present, renders a default message.
 *
 * @param {Object} params - The function parameters.
 * @param {string} params.content - The content string containing command output.
 * @returns {Array|JSX.Element} An array of JSX elements for stdout/stderr, or a default message element if none are present.
 */
function renderLocalCommandOutput({ content }) {
  // Extract stdout and stderr from the content using fG utility
  const stdout = fG(content, "local-command-stdout");
  const stderr = fG(content, "local-command-stderr");

  // If neither stdout nor stderr is present, render a default message
  if (!stdout && !stderr) {
    return iF.createElement(
      ConditionalRowContainer,
      null,
      iF.createElement(
        _,
        { color: getThemeStylesheet().secondaryText },
        eY
      )
    );
  }

  // Collect output elements
  const outputElements = [];

  // If stdout exists and is not just whitespace, render isBlobOrFileLikeObject
  if (stdout?.trim()) {
    outputElements.push(
      iF.createElement(
        ConditionalRowContainer,
        { key: "stdout" },
        iF.createElement(
          _,
          { color: getThemeStylesheet().text },
          stdout.trim()
        )
      )
    );
  }

  // If stderr exists and is not just whitespace, render isBlobOrFileLikeObject
  if (stderr?.trim()) {
    outputElements.push(
      iF.createElement(
        ConditionalRowContainer,
        { key: "stderr" },
        iF.createElement(
          _,
          { color: getThemeStylesheet().error },
          stderr.trim()
        )
      )
    );
  }

  return outputElements;
}

module.exports = renderLocalCommandOutput;