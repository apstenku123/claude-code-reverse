/**
 * Renders a React component displaying Bash command output (stdout and stderr).
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.content - The content object containing Bash output data.
 * @param {boolean} params.verbose - Flag to enable verbose output in the component.
 * @returns {React.ReactElement} The rendered Bash output component.
 */
function renderBashOutputComponent({ content, verbose }) {
  // Extract stdout and stderr from the content using fG utility, defaulting to empty string if not found
  const stdout = fG(content, "bash-stdout") ?? "";
  const stderr = fG(content, "bash-stderr") ?? "";

  // Render the Bash output component with the extracted data and verbose flag
  return lt1.createElement(renderCliOutput, {
    content: {
      stdout: stdout,
      stderr: stderr
    },
    verbose: Boolean(verbose)
  });
}

module.exports = renderBashOutputComponent;