/**
 * Renders a permission prompt for editing a notebook cell (insert, delete, or edit).
 * Handles user confirmation, rejection, and permission context updates for tool usage.
 *
 * @param {Object} params - The parameters for the permission prompt.
 * @param {Function} params.setToolPermissionContext - Updates the tool permission context (for 'don'processRuleBeginHandlers ask again' option).
 * @param {Object} params.toolUseConfirm - Contains details about the tool usage request, including input, context, and callbacks.
 * @param {Function} params.onDone - Callback invoked when the operation is completed (accepted or rejected).
 * @param {Function} params.onReject - Callback invoked when the operation is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output in the UI.
 * @returns {React.Element|null} The rendered permission prompt UI, or null if input parsing fails.
 */
function NotebookCellEditPermissionPrompt({
  setToolPermissionContext,
  toolUseConfirm,
  onDone,
  onReject,
  verbose
}) {
  // Get UI column width from context
  const { columns: terminalColumns } = Z4();

  // Validate and parse the tool input schema
  const inputParseResult = PO.inputSchema.safeParse(toolUseConfirm.input);
  const parsedInput = inputParseResult.success ? inputParseResult.data : null;

  // Determine cell language type for metadata
  const cellLanguage = parsedInput?.cell_type === "markdown" ? "markdown" : "python";

  // Memoize completion metadata for analytics/logging
  const completionMetadata = ZE.useMemo(
    () => ({
      completion_type: "tool_use_single",
      language_name: cellLanguage
    }),
    [cellLanguage]
  );

  // Log the tool usage attempt
  FC(toolUseConfirm, completionMetadata);

  // If input parsing failed, log error and return null
  if (!parsedInput) {
    reportErrorIfAllowed(new Error(
      `Failed to parse notebook edit input: ${inputParseResult.success ? "unknown error" : inputParseResult.error.message}`
    ));
    return null;
  }

  // Determine the action description based on edit mode
  let actionDescription;
  switch (parsedInput.edit_mode) {
    case "insert":
      actionDescription = "insert this cell into";
      break;
    case "delete":
      actionDescription = "delete this cell from";
      break;
    default:
      actionDescription = "make this edit to";
      break;
  }

  /**
   * Handles user response to the permission prompt.
   * @param {string} response - The user'createInteractionAccessor response: 'yes', 'yes-dont-ask-again', or 'no'.
   */
  function handleUserResponse(response) {
    switch (response) {
      case "yes":
        // Log acceptance, invoke done callback, and allow tool use temporarily
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
      case "yes-dont-ask-again":
        // Log acceptance, update permission context, invoke done callback, and allow tool use permanently
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
      case "no":
        // Log rejection, invoke done and reject callbacks, and call onReject handler
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
      default:
        // No action for unknown response
        break;
    }
  }

  // Render the permission prompt UI
  return ZE.default.createElement(
    g,
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
      title:
        parsedInput.edit_mode === "insert"
          ? "Insert cell"
          : parsedInput.edit_mode === "delete"
          ? "Delete cell"
          : "Edit cell"
    }),
    // Cell edit preview
    ZE.default.createElement(renderNotebookCellEditPreview, {
      notebook_path: parsedInput.notebook_path,
      cell_number: parsedInput.cell_number,
      new_source: parsedInput.new_source,
      cell_type: parsedInput.cell_type,
      edit_mode: parsedInput.edit_mode,
      verbose: verbose,
      width: terminalColumns - 12
    }),
    // Prompt and options
    ZE.default.createElement(
      g,
      { flexDirection: "column" },
      ZE.default.createElement(
        _,
        null,
        "normalizeToError you want to ",
        actionDescription,
        " ",
        ZE.default.createElement(
          _,
          { bold: true },
          OV5(parsedInput.notebook_path)
        ),
        "?"
      ),
      ZE.default.createElement(SelectableOptionsList, {
        options: getConfirmationOptions(
          parsedInput.notebook_path,
          toolUseConfirm.toolUseContext.getToolPermissionContext()
        ),
        onCancel: () => handleUserResponse("no"),
        onChange: handleUserResponse
      })
    )
  );
}

module.exports = NotebookCellEditPermissionPrompt;
