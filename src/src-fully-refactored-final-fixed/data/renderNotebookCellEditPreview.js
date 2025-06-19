/**
 * Renders a preview component for editing a Jupyter notebook cell, supporting insert, delete, and replace operations.
 *
 * @param {Object} params - The parameters for rendering the cell edit preview.
 * @param {string} params.notebook_path - The file path to the notebook.
 * @param {number} params.cell_number - The index of the cell to edit.
 * @param {string|string[]} params.new_source - The new source code/content for the cell.
 * @param {string} params.cell_type - The type of the cell (e.g., 'code', 'markdown').
 * @param {string} [params.edit_mode='replace'] - The edit operation: 'replace', 'insert', or 'delete'.
 * @param {boolean} params.verbose - Whether to show the full notebook path or a shortened version.
 * @param {number} params.width - The width to use for diff rendering.
 * @returns {React.ReactElement} The rendered preview component for the notebook cell edit.
 */
function renderNotebookCellEditPreview({
  notebook_path,
  cell_number,
  new_source,
  cell_type,
  edit_mode = "replace",
  verbose,
  width
}) {
  // Check if the notebook file exists
  const notebookExists = ju.useMemo(() => f1().existsSync(notebook_path), [notebook_path]);

  // Load and parse the notebook file if isBlobOrFileLikeObject exists
  const notebookData = ju.useMemo(() => {
    if (!notebookExists) return null;
    try {
      const notebookRaw = CI(notebook_path);
      return f8(notebookRaw);
    } catch (error) {
      return null;
    }
  }, [notebook_path, notebookExists]);

  // Get the source code/content of the specified cell
  const cellSource = ju.useMemo(() => {
    if (!notebookData || !notebookData.cells[cell_number]) return "";
    const source = notebookData.cells[cell_number].source;
    // Source can be an array (lines) or a string
    return Array.isArray(source) ? source.join("") : source;
  }, [notebookData, cell_number]);

  // Get the language of the notebook (default to 'python')
  const notebookLanguage = ju.useMemo(() => {
    if (!notebookData || !notebookData.metadata.language_info) return "python";
    return notebookData.metadata.language_info.name || "python";
  }, [notebookData]);

  // Compute the diff/patch for replace operation
  const cellDiff = ju.useMemo(() => {
    // Only compute diff for 'replace' operation on existing notebook
    if (!notebookExists || edit_mode === "insert" || edit_mode === "delete") return null;
    return applyEditsAndGenerateDiffHunks({
      filePath: notebook_path,
      fileContents: cellSource,
      edits: [{
        old_string: cellSource,
        new_string: new_source
      }],
      ignoreWhitespace: false
    });
  }, [notebookExists, notebook_path, cellSource, new_source, edit_mode]);

  // Determine the operation label for UI
  let operationLabel;
  switch (edit_mode) {
    case "insert":
      operationLabel = "Insert new cell";
      break;
    case "delete":
      operationLabel = "Delete cell";
      break;
    default:
      operationLabel = "Replace cell contents";
  }

  // Render the preview UI
  return $createPropertyAccessor.createElement(g, {
    flexDirection: "column"
  },
    $createPropertyAccessor.createElement(g, {
      borderColor: getThemeStylesheet().secondaryBorder,
      borderStyle: "round",
      flexDirection: "column",
      paddingX: 1
    },
      $createPropertyAccessor.createElement(g, {
        paddingBottom: 1,
        flexDirection: "column"
      },
        // Notebook path (full or shortened)
        $createPropertyAccessor.createElement(_, {
          bold: true
        }, verbose ? notebook_path : RV5(iA(), notebook_path)),
        // Operation label and cell info
        $createPropertyAccessor.createElement(_, {
          color: getThemeStylesheet().secondaryText
        },
          operationLabel,
          " at index ",
          cell_number,
          cell_type ? ` (${cell_type})` : ""
        )
      ),
      // Cell content preview depending on operation
      edit_mode === "delete"
        ? $createPropertyAccessor.createElement(g, {
            flexDirection: "column",
            paddingLeft: 2
          },
            $createPropertyAccessor.createElement(DW, {
              code: cellSource,
              language: notebookLanguage
            })
          )
        : edit_mode === "insert"
        ? $createPropertyAccessor.createElement(g, {
            flexDirection: "column",
            paddingLeft: 2
          },
            $createPropertyAccessor.createElement(DW, {
              code: new_source,
              language: cell_type === "markdown" ? "markdown" : notebookLanguage
            })
          )
        : cellDiff
        ? FW(
            cellDiff.map(patch => $createPropertyAccessor.createElement(dD, {
              key: patch.newStart,
              patch,
              dim: false,
              width
            })),
            idx => $createPropertyAccessor.createElement(_, {
              color: getThemeStylesheet().secondaryText,
              key: `ellipsis-${idx}`
            }, "...")
          )
        : $createPropertyAccessor.createElement(DW, {
            code: new_source,
            language: cell_type === "markdown" ? "markdown" : notebookLanguage
          })
    )
  );
}

module.exports = renderNotebookCellEditPreview;