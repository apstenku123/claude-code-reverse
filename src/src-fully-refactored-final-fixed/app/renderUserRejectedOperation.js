/**
 * Renders a UI component indicating that a user has rejected an operation, with optional patch details.
 *
 * @param {Object} params - The parameters for rendering the rejection message.
 * @param {string} params.file_path - The path of the file involved in the operation.
 * @param {string} params.operation - The name of the operation that was rejected.
 * @param {Array<Object>} params.patch - An array of patch objects representing changes.
 * @param {string} params.style - The display style (e.g., 'condensed').
 * @param {boolean} params.verbose - Whether to display the verbose file path or a shortened version.
 * @returns {React.ReactElement} The rendered React element representing the rejection message.
 */
function renderUserRejectedOperation({
  file_path,
  operation,
  patch,
  style,
  verbose
}) {
  // Get terminal column width from configuration
  const { columns: terminalColumns } = Z4();

  // Compose the main rejection message row
  const rejectionMessageRow = u7.createElement(
    g,
    { flexDirection: "row" },
    u7.createElement(
      _,
      { color: getThemeStylesheet().error },
      "User rejected ",
      operation,
      " to "
    ),
    u7.createElement(
      _,
      { bold: true, color: getThemeStylesheet().error },
      verbose ? file_path : BZ5(iA(), file_path)
    )
  );

  // If style is 'condensed' and not verbose, only show the rejection message row
  if (style === "condensed" && !verbose) {
    return rejectionMessageRow;
  }

  // Otherwise, show the rejection message and the patch details
  return u7.createElement(
    ConditionalRowContainer,
    null,
    u7.createElement(
      g,
      { flexDirection: "column" },
      rejectionMessageRow,
      // Render patch details, mapping each patch to a diff component
      FW(
        patch.map(patchItem =>
          u7.createElement(
            g,
            { flexDirection: "column", key: patchItem.newStart },
            u7.createElement(dD, {
              patch: patchItem,
              dim: true,
              width: terminalColumns - 12
            })
          )
        ),
        // Render ellipsis for omitted lines
        ellipsisIndex =>
          u7.createElement(
            g,
            { key: `ellipsis-${ellipsisIndex}` },
            u7.createElement(
              _,
              { color: getThemeStylesheet().secondaryText },
              "..."
            )
          )
      )
    )
  );
}

module.exports = renderUserRejectedOperation;