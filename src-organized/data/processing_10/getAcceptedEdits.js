/**
 * Handles the confirmation and processing of notebook cell edit actions (insert, delete, edit) by the user.
 * Parses the tool input, determines the edit type, and renders a confirmation UI.
 * Handles user responses (accept, reject, accept permanently) and triggers the appropriate callbacks and permission context updates.
 *
 * @param {Object} params - The parameters for handling the notebook edit confirmation.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context (permanent acceptance).
 * @param {Object} params.toolUseConfirm - Object containing details about the tool use confirmation, including input, context, and callbacks.
 * @param {Function} params.onDone - Callback to invoke when the action is completed (accepted or rejected).
 * @param {Function} params.onReject - Callback to invoke when the action is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output in the UI.
 * @returns {React.ReactElement|null} The confirmation UI element, or null if input parsing fails.
 */
function getAcceptedEdits({
  setToolPermissionContext,
  toolUseConfirm,
  onDone,
  onReject,
  verbose
}) {
  // Get UI column width from context
  const { columns: uiColumns } = Z4();

  // Parse the tool input using the input schema
  const parsedInputResult = PO.inputSchema.safeParse(toolUseConfirm.input);
  const parsedInput = parsedInputResult.success ? parsedInputResult.data : null;

  // Determine cell language type (markdown or python)
  const cellLanguage = parsedInput?.cell_type === "markdown" ? "markdown" : "python";

  // Memoize completion metadata for this tool use
  const completionMetadata = ZE.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: cellLanguage
  }), [cellLanguage]);

  // Log the tool use attempt
  FC(toolUseConfirm, completionMetadata);

  // If parsing failed, log error and return null
  if (!parsedInput) {
    reportErrorIfAllowed(new Error(`Failed to parse notebook edit input: ${parsedInputResult.success ? "unknown error" : parsedInputResult.error.message}`));
    return null;
  }

  // Determine the edit action description for the UI
  let editActionDescription;
  switch (parsedInput.edit_mode) {
    case "insert":
      editActionDescription = "insert this cell into";
      break;
    case "delete":
      editActionDescription = "delete this cell from";
      break;
    default:
      editActionDescription = "make this edit to";
  }

  /**
   * Handles the user'createInteractionAccessor response to the confirmation prompt.
   * @param {string} userChoice - The user'createInteractionAccessor choice ("yes", "yes-dont-ask-again", or "no").
   */
  function handleUserChoice(userChoice) {
    switch (userChoice) {
      case "yes": {
        // Accept this edit temporarily
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: cellLanguage,
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
        break;
      }
      case "yes-dont-ask-again": {
        // Accept this edit permanently (update permission context)
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: cellLanguage,
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        setToolPermissionContext({
          ...toolUseConfirm.toolUseContext.getToolPermissionContext(),
          mode: "acceptEdits"
        });
        onDone();
        toolUseConfirm.onAllow("permanent", toolUseConfirm.input);
        break;
      }
      case "no": {
        // Reject the edit
        u5({
          completion_type: "tool_use_single",
          event: "reject",
          metadata: {
            language_name: cellLanguage,
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        onReject();
        toolUseConfirm.onReject();
        break;
      }
      default:
        // No action for unknown choice
        break;
    }
  }

  // Render the confirmation UI
  return ZE.default.createElement(
    g, // Container component
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: getThemeStylesheet().permission,
      marginTop: 1,
      paddingLeft: 1,
      paddingRight: 1,
      paddingBottom: 1
    },
    // Title
    ZE.default.createElement(renderPermissionTitle, {
      title: `${parsedInput.edit_mode === "insert" ? "Insert cell" : parsedInput.edit_mode === "delete" ? "Delete cell" : "Edit cell"}`
    }),
    // Edit preview component
    ZE.default.createElement(renderNotebookCellEditPreview, {
      notebook_path: parsedInput.notebook_path,
      cell_number: parsedInput.cell_number,
      new_source: parsedInput.new_source,
      cell_type: parsedInput.cell_type,
      edit_mode: parsedInput.edit_mode,
      verbose: verbose,
      width: uiColumns - 12
    }),
    // Confirmation prompt and options
    ZE.default.createElement(
      g,
      { flexDirection: "column" },
      ZE.default.createElement(
        _,
        null,
        "normalizeToError you want to ",
        editActionDescription,
        " ",
        ZE.default.createElement(_, { bold: true }, OV5(parsedInput.notebook_path)),
        "?"
      ),
      ZE.default.createElement(SelectableOptionsList, {
        options: getConfirmationOptions(parsedInput.notebook_path, toolUseConfirm.toolUseContext.getToolPermissionContext()),
        onCancel: () => handleUserChoice("no"),
        onChange: handleUserChoice
      })
    )
  );
}

module.exports = getAcceptedEdits;