/**
 * Renders a user rejection message for a notebook cell edit operation.
 *
 * Displays a message indicating that the user has rejected an edit (replace, insert, or delete) on a specific cell in a notebook.
 * Optionally displays the notebook path in full or shortened form, and shows the cell'createInteractionAccessor source code if the operation was not a delete.
 *
 * @param {Object} params - The parameters for rendering the rejection message.
 * @param {string} params.notebook_path - The path to the notebook file.
 * @param {number} params.cell_number - The index or number of the cell being edited.
 * @param {string} params.new_source - The new source code/content for the cell.
 * @param {string} params.cell_type - The type of the cell (e.g., 'code' or 'markdown').
 * @param {string} [params.edit_mode="replace"] - The type of edit operation ('replace', 'insert', or 'delete').
 * @param {boolean} params.verbose - Whether to display the full notebook path (true) or a shortened version (false).
 * @returns {React.ReactElement} The rendered rejection message component.
 */
function NotebookCellEditRejectionMessage({
  notebook_path,
  cell_number,
  new_source,
  cell_type,
  edit_mode = "replace",
  verbose
}) {
  // Determine the operation description for the rejection message
  const operationDescription = edit_mode === "delete" ? "delete" : `${edit_mode} cell in`;

  // Get the error color from the current theme
  const errorColor = getThemeStylesheet().error;

  // Determine the notebook path to display (full or shortened)
  // TD5(iA(), notebook_path) presumably shortens the path
  const displayedNotebookPath = verbose ? notebook_path : TD5(iA(), notebook_path);

  // Determine the language for the code block (markdown or python)
  const codeLanguage = cell_type === "markdown" ? "markdown" : "python";

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
        c7.createElement(
          _,
          { bold: true, color: errorColor },
          displayedNotebookPath
        ),
        c7.createElement(
          _,
          { color: errorColor },
          " at cell ",
          cell_number
        )
      ),
      // If not a delete operation, show the new source code block
      edit_mode !== "delete" &&
        c7.createElement(
          g,
          { marginTop: 1, flexDirection: "column" },
          c7.createElement(
            _,
            { dimColor: true },
            c7.createElement(DW, {
              code: new_source,
              language: codeLanguage
            })
          )
        )
    )
  );
}

module.exports = NotebookCellEditRejectionMessage;