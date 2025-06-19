/**
 * Renders a preview of file changes (patch) for a given file path and new content.
 * Displays the diff if the file exists, otherwise shows the new content as code.
 *
 * @param {Object} params - The parameters for rendering the patch preview.
 * @param {string} params.file_path - The path to the file to preview changes for.
 * @param {string} params.content - The new content to compare against the existing file.
 * @param {boolean} params.verbose - Whether to show the full file path (if true) or a shortened version (if false).
 * @returns {React.ReactElement} The rendered patch preview React element.
 */
function renderFilePatchPreview({
  file_path,
  content,
  verbose
}) {
  // Check if the file exists (memoized for performance)
  const fileExists = ZH1.useMemo(() => f1().existsSync(file_path), [file_path]);

  // Read the file contents if isBlobOrFileLikeObject exists (memoized)
  const originalFileContents = ZH1.useMemo(() => {
    if (!fileExists) return "";
    // Determine file encoding
    const encoding = detectFileEncoding(file_path);
    return f1().readFileSync(file_path, { encoding });
  }, [file_path, fileExists]);

  // Generate the patch/diff if the file exists (memoized)
  const patchEdits = ZH1.useMemo(() => {
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

  // Render the patch preview UI
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
    // Patch diff or code block
    patchEdits
      ? FW(
          patchEdits.map(patch =>
            rF.createElement(dD, {
              key: patch.newStart,
              patch,
              dim: false
            })
          ),
          (ellipsisKey) =>
            rF.createElement(
              _,
              {
                color: getThemeStylesheet().secondaryText,
                key: `ellipsis-${ellipsisKey}`
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

module.exports = renderFilePatchPreview;