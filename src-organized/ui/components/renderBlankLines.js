/**
 * Renders a specified number of blank lines using the Ink framework.
 *
 * @param {Object} options - Configuration options for rendering blank lines.
 * @param {number} [options.count=1] - The number of blank lines to render.
 * @returns {React.Element} a React element containing the specified number of blank lines.
 */
function renderBlankLines({ count = 1 } = {}) {
  // Repeat the newline character 'count' times to create blank lines
  const blankLines = '\n'.repeat(count);

  // Render the blank lines inside an Ink <Text> component
  return zG0.default.createElement('ink-text', null, blankLines);
}

module.exports = renderBlankLines;