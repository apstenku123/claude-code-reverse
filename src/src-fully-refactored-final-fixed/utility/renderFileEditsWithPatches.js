/**
 * Renders a list of file edits as patch components within a styled container.
 *
 * @param {Object} params - The parameters for rendering file edits.
 * @param {string} params.file_path - The path to the file being edited.
 * @param {Array<Object>} params.edits - The list of edit objects to apply to the file.
 * @param {boolean} params.verbose - Whether to display the full file path (true) or a shortened version (false).
 * @param {boolean} [params.useBorder=true] - Whether to display a border around the container.
 * @returns {React.Element} The rendered React element containing the file edits and patches.
 */
function renderFileEditsWithPatches({
  file_path,
  edits,
  verbose,
  useBorder = true
}) {
  // Memoize the file contents: if the file exists, read its contents; otherwise, use an empty string
  const fileContents = nt1.useMemo(
    () => f1().existsSync(file_path) ? CI(file_path) : "",
    [file_path]
  );

  // Memoize the computed patches based on file path, contents, and edits
  const patches = nt1.useMemo(
    () => applyEditsAndGenerateDiffHunks({
      filePath: file_path,
      fileContents,
      edits
    }),
    [file_path, fileContents, edits]
  );

  // Render the container with optional border and the list of patch components
  return nF.createElement(
    g, // Outer container
    { flexDirection: "column" },
    nF.createElement(
      g, // Inner container with border and padding
      {
        borderColor: getThemeStylesheet().secondaryBorder,
        borderStyle: useBorder ? "round" : undefined,
        flexDirection: "column",
        paddingX: 1
      },
      nF.createElement(
        g, // File path/title row
        { paddingBottom: 1 },
        nF.createElement(
          _,
          { bold: true },
          verbose ? file_path : iW5(iA(), file_path) // Show full or shortened file path
        )
      ),
      // Render the patch components for each edit
      FW(
        patches.map(patch =>
          nF.createElement(dD, {
            key: patch.newStart,
            patch,
            dim: false
          })
        ),
        // Render ellipsis if needed (FW handles this logic)
        ellipsisIndex =>
          nF.createElement(
            _,
            {
              color: getThemeStylesheet().secondaryText,
              key: `ellipsis-${ellipsisIndex}`
            },
            "..."
          )
      )
    )
  );
}

module.exports = renderFileEditsWithPatches;