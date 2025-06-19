/**
 * Renders a preview of file content changes, showing a diff or code block depending on file existence and patch results.
 *
 * @param {Object} params - The parameters for the component.
 * @param {string} params.file_path - The path to the file to preview and patch.
 * @param {string} params.content - The new content to compare or display.
 * @param {boolean} params.verbose - Whether to display the full file path or a shortened version.
 * @returns {React.ReactElement} The rendered preview component.
 */
function FileContentPatchPreview({
  file_path,
  content,
  verbose
}) {
  // Check if the file exists using memoization to avoid unnecessary checks
  const fileExists = ZH1.useMemo(() => f1().existsSync(file_path), [file_path]);

  // Read the file contents if isBlobOrFileLikeObject exists, using the appropriate encoding
  const originalFileContents = ZH1.useMemo(() => {
    if (!fileExists) return "";
    const encoding = detectFileEncoding(file_path);
    return f1().readFileSync(file_path, { encoding });
  }, [file_path, fileExists]);

  // Compute the patch/diff between the original and new content, if the file exists
  const patchResults = ZH1.useMemo(() => {
    if (!fileExists) return null;
    return applyEditsAndGenerateDiffHunks({
      filePath: file_path,
      fileContents: originalFileContents,
      edits: [{
        old_string: originalFileContents,
        new_string: content
      }]
    });
  }, [fileExists, file_path, originalFileContents, content]);

  // Render the preview UI
  return rF.createElement(
    g,
    {
      borderColor: getThemeStylesheet().secondaryBorder,
      borderStyle: "round",
      flexDirection: "column",
      paddingX: 1
    },
    // Header: file path (full or shortened)
    rF.createElement(
      g,
      { paddingBottom: 1 },
      rF.createElement(
        _,
        { bold: true },
        verbose ? file_path : ZF5(iA(), file_path)
      )
    ),
    // Body: diff preview or code block
    patchResults
      ? FW(
          patchResults.map(patch =>
            rF.createElement(dD, {
              key: patch.newStart,
              patch,
              dim: false
            })
          ),
          (index) =>
            rF.createElement(
              _,
              {
                color: getThemeStylesheet().secondaryText,
                key: `ellipsis-${index}`
              },
              "..."
            )
        )
      : rF.createElement(
          DW,
          {
            code: content || "(No content)",
            language: GF5(file_path).slice(1)
          }
        )
  );
}

module.exports = FileContentPatchPreview;