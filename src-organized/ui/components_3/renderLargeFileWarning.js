/**
 * Renders a warning message when a large file is detected, indicating potential performance impact.
 *
 * @param {Object} params - The parameters for the warning component.
 * @param {string} params.path - The file path being checked.
 * @param {number} params.contentLength - The length of the file content (number of characters).
 * @returns {React.ReactElement} a React element displaying the large file warning message.
 */
function renderLargeFileWarning({
  path,
  contentLength
}) {
  // Determine the display path, stripping the base path if present
  const basePath = iA();
  const displayPath = path.startsWith(basePath) ? bw5(basePath, path) : path;

  // Get theme colors
  const theme = getThemeStylesheet();

  return f2.createElement(
    g,
    { flexDirection: "row" },
    // Warning icon or symbol
    f2.createElement(_, { color: theme.warning }, y0.warning),
    // Warning message
    f2.createElement(
      _,
      { color: theme.warning },
      "Large ",
      f2.createElement(_, { bold: true }, displayPath),
      " will impact performance (",
      formatNumberCompact(contentLength),
      " chars > ",
      formatNumberCompact(I11),
      ")",
      // Additional info
      f2.createElement(
        _,
        { color: theme.secondaryText, dimColor: true },
        " • /memory to edit"
      )
    )
  );
}

module.exports = renderLargeFileWarning;