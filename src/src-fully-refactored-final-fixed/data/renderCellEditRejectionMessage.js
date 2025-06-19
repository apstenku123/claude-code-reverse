/**
 * Renders a rejection message UI when a user rejects an edit operation on a notebook cell.
 * The message details the operation, notebook path, cell number, and optionally shows the new source code.
 *
 * @param {Object} params - The parameters for rendering the rejection message.
 * @param {string} params.notebook_path - The path to the notebook file.
 * @param {number} params.cell_number - The number of the cell being edited.
 * @param {string} params.new_source - The new source code/content for the cell.
 * @param {string} params.cell_type - The type of the cell (e.g., 'markdown', 'code').
 * @param {string} [params.edit_mode="replace"] - The type of edit operation ('replace', 'insert', 'delete', etc.).
 * @param {boolean} params.verbose - Whether to display the full notebook path or a shortened version.
 * @returns {React.ReactElement} The rendered rejection message UI.
 */
function renderCellEditRejectionMessage({
  notebook_path,
  cell_number,
  new_source,
  cell_type,
  edit_mode = "replace",
  verbose
}) {
  // Determine the operation description based on the edit mode
  const operationDescription = edit_mode === "delete" ? "delete" : `${edit_mode} cell in`;

  // Get the error color from the current theme
  const errorColor = getThemeStylesheet().error;

  // Determine the notebook path to display (full or shortened)
  const displayedNotebookPath = verbose ? notebook_path : TD5(iA(), notebook_path);

  return c7.createElement(
    ConditionalRowContainer,
    null,
    c7.createElement(
      g,
      { flexDirection: "column" },
      c7.createElement(
        g,
        { flexDirection: "row" },
        // Main rejection message
        c7.createElement(
          _,
          { color: errorColor },
          "User rejected ",
          operationDescription,
          " "
        ),
        // Notebook path (bold)
        c7.createElement(
          _,
          { bold: true, color: errorColor },
          displayedNotebookPath
        ),
        // Cell number
        c7.createElement(
          _,
          { color: errorColor },
          " at cell ",
          cell_number
        )
      ),
      // If not a delete operation, show the new source code
      edit_mode !== "delete" &&
        c7.createElement(
          g,
          { marginTop: 1, flexDirection: "column" },
          c7.createElement(
            _,
            { dimColor: true },
            c7.createElement(
              DW,
              {
                code: new_source,
                language: cell_type === "markdown" ? "markdown" : "python"
              }
            )
          )
        )
    )
  );
}

module.exports = renderCellEditRejectionMessage;