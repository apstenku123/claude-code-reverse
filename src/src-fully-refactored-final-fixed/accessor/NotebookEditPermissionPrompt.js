/**
 * Renders a permission prompt for notebook cell edits (insert, delete, edit) and handles user responses.
 * Validates the tool input, logs permission requests, and manages permission context updates.
 *
 * @param {Object} params - The parameters for the permission prompt.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context (e.g., for 'don'processRuleBeginHandlers ask again').
 * @param {Object} params.toolUseConfirm - The tool use confirmation object, containing input, context, and callbacks.
 * @param {Function} params.onDone - Callback to invoke when the prompt is completed (accepted or rejected).
 * @param {Function} params.onReject - Callback to invoke when the user rejects the edit.
 * @param {boolean} params.verbose - Whether to show verbose output in the cell preview.
 * @returns {React.ReactElement|null} The rendered permission prompt UI, or null if input validation fails.
 */
function NotebookEditPermissionPrompt({
  setToolPermissionContext,
  toolUseConfirm,
  onDone,
  onReject,
  verbose
}) {
  // Get current terminal window size
  const { columns: terminalColumns } = Z4();

  // Validate the tool input using the schema
  const inputValidationResult = PO.inputSchema.safeParse(toolUseConfirm.input);
  const parsedInput = inputValidationResult.success ? inputValidationResult.data : null;

  // Determine the cell language type
  const cellLanguage = parsedInput?.cell_type === "markdown" ? "markdown" : "python";

  // Memoize the response configuration for logging
  const responseConfig = ZE.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: cellLanguage
  }), [cellLanguage]);

  // Log the permission request
  FC(toolUseConfirm, responseConfig);

  // If input validation failed, log error and return null
  if (!parsedInput) {
    reportErrorIfAllowed(new Error(`Failed to parse notebook edit input: ${inputValidationResult.success ? "unknown error" : inputValidationResult.error.message}`));
    return null;
  }

  // Determine the edit action description
  const editActionDescription =
    parsedInput.edit_mode === "insert" ? "insert this cell into" :
    parsedInput.edit_mode === "delete" ? "delete this cell from" :
    "make this edit to";

  /**
   * Handles the user'createInteractionAccessor response to the permission prompt.
   * @param {"yes"|"yes-dont-ask-again"|"no"} userChoice - The user'createInteractionAccessor selected option.
   */
  function handleUserChoice(userChoice) {
    switch (userChoice) {
      case "yes":
        // Log acceptance event
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: cellLanguage,
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Complete prompt and allow this edit temporarily
        onDone();
        toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
        break;
      case "yes-dont-ask-again":
        // Log acceptance event
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: cellLanguage,
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Update permission context to accept edits permanently
        setToolPermissionContext({
          ...toolUseConfirm.toolUseContext.getToolPermissionContext(),
          mode: "acceptEdits"
        });
        // Complete prompt and allow this edit permanently
        onDone();
        toolUseConfirm.onAllow("permanent", toolUseConfirm.input);
        break;
      case "no":
        // Log rejection event
        u5({
          completion_type: "tool_use_single",
          event: "reject",
          metadata: {
            language_name: cellLanguage,
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Complete prompt, invoke rejection callbacks
        onDone();
        onReject();
        toolUseConfirm.onReject();
        break;
      default:
        // No action for unknown choice
        break;
    }
  }

  // Render the permission prompt UI
  return ZE.default.createElement(g, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: getThemeStylesheet().permission,
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  },
    ZE.default.createElement(renderPermissionTitle, {
      title: `${parsedInput.edit_mode === "insert" ? "Insert cell" : parsedInput.edit_mode === "delete" ? "Delete cell" : "Edit cell"}`
    }),
    ZE.default.createElement(renderNotebookCellEditPreview, {
      notebook_path: parsedInput.notebook_path,
      cell_number: parsedInput.cell_number,
      new_source: parsedInput.new_source,
      cell_type: parsedInput.cell_type,
      edit_mode: parsedInput.edit_mode,
      verbose: verbose,
      width: terminalColumns - 12
    }),
    ZE.default.createElement(g, {
      flexDirection: "column"
    },
      ZE.default.createElement(_, null, "normalizeToError you want to ", editActionDescription, " ",
        ZE.default.createElement(_, {
          bold: true
        }, OV5(parsedInput.notebook_path)),
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

module.exports = NotebookEditPermissionPrompt;