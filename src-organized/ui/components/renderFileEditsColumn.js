/**
 * Renders a column UI component displaying file edits with optional border and verbose file path display.
 *
 * @param {Object} params - The parameters for rendering the file edits column.
 * @param {string} params.file_path - The path to the file being edited.
 * @param {Array<Object>} params.edits - The list of edit objects to display as patches.
 * @param {boolean} params.verbose - Whether to display the full file path (true) or a shortened version (false).
 * @param {boolean} [params.useBorder=true] - Whether to render the column with a rounded border.
 * @returns {React.Element} The rendered column React element containing the file edits.
 */
function renderFileEditsColumn({
  file_path,
  edits,
  verbose,
  useBorder = true
}) {
  // Memoize file contents: read and normalize line endings if file exists, else empty string
  const fileContents = nt1.useMemo(
    () => f1().existsSync(file_path) ? CI(file_path) : "",
    [file_path]
  );

  // Memoize the computed patches/edits to display
  const patches = nt1.useMemo(
    () => applyEditsAndGenerateDiffHunks({
      filePath: file_path,
      fileContents: fileContents,
      edits: edits
    }),
    [file_path, fileContents, edits]
  );

  // Render the column with optional border and file path heading
  return nF.createElement(
    g,
    { flexDirection: "column" },
    nF.createElement(
      g,
      {
        borderColor: getThemeStylesheet().secondaryBorder,
        borderStyle: useBorder ? "round" : undefined,
        flexDirection: "column",
        paddingX: 1
      },
      nF.createElement(
        g,
        { paddingBottom: 1 },
        nF.createElement(
          _,
          { bold: true },
          // Show full or shortened file path based on 'verbose'
          verbose ? file_path : iW5(iA(), file_path)
        )
      ),
      // Render patches, inserting ellipsis between each patch except the first
      FW(
        patches.map(patch =>
          nF.createElement(dD, {
            key: patch.newStart,
            patch: patch,
            dim: false
          })
        ),
        (index) =>
          nF.createElement(
            _,
            {
              color: getThemeStylesheet().secondaryText,
              key: `ellipsis-${index}`
            },
            "..."
          )
      )
    )
  );
}

module.exports = renderFileEditsColumn;