/**
 * Renders a user rejection message for cell edits in a notebook UI.
 * Displays details about the rejected action, including the notebook path, cell number, and optionally the cell'createInteractionAccessor new source code.
 *
 * @param {Object} params - The parameters for rendering the rejection message.
 * @param {string} params.notebook_path - The path to the notebook where the cell edit was attempted.
 * @param {number} params.cell_number - The number of the cell that was targeted for editing.
 * @param {string} params.new_source - The new source code/content that was proposed for the cell.
 * @param {string} params.cell_type - The type of the cell (e.g., 'markdown', 'code').
 * @param {string} [params.edit_mode="replace"] - The type of edit attempted (e.g., 'replace', 'delete').
 * @param {boolean} params.verbose - Whether to display the full notebook path or a shortened version.
 * @returns {React.ReactElement} The rendered React element displaying the rejection message.
 */
function renderUserCellEditRejectionMessage({
  notebook_path,
  cell_number,
  new_source,
  cell_type,
  edit_mode = "replace",
  verbose
}) {
  // Determine the action description based on the edit mode
  const actionDescription = edit_mode === "delete" ? "delete" : `${edit_mode} cell in`;

  // Get the error color from the current theme
  const errorColor = getThemeStylesheet().error;

  // Determine the notebook path to display (full or shortened)
  const displayedNotebookPath = verbose ? notebook_path : TD5(iA(), notebook_path);

  // Render the rejection message
  return c7.createElement(ConditionalRowContainer, null,
    c7.createElement(g, { flexDirection: "column" },
      c7.createElement(g, { flexDirection: "row" },
        c7.createElement(_, { color: errorColor },
          "User rejected ", actionDescription, " "
        ),
        c7.createElement(_, { bold: true, color: errorColor },
          displayedNotebookPath
        ),
        c7.createElement(_, { color: errorColor },
          " at cell ", cell_number
        )
      ),
      // If the action is not a delete, show the proposed new source code
      edit_mode !== "delete" && c7.createElement(g, {
        marginTop: 1,
        flexDirection: "column"
      },
        c7.createElement(_, { dimColor: true },
          c7.createElement(DW, {
            code: new_source,
            language: cell_type === "markdown" ? "markdown" : "python"
          })
        )
      )
    )
  );
}

module.exports = renderUserCellEditRejectionMessage;