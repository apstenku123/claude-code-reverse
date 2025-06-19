/**
 * Handles user confirmation for notebook cell edits (insert, delete, edit) via a permission dialog.
 * Validates input, logs permission requests, and processes user responses (accept, reject, permanent accept).
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.setToolPermissionContext - Updates the tool permission context (for permanent acceptance).
 * @param {Object} params.toolUseConfirm - The tool use confirmation object, containing input, context, and callbacks.
 * @param {Function} params.onDone - Callback invoked when the dialog is completed (regardless of accept/reject).
 * @param {Function} params.onReject - Callback invoked when the edit is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output in the dialog.
 * @returns {React.ReactElement|null} The rendered confirmation dialog, or null if input validation fails.
 */
function getAcceptEdits({
  setToolPermissionContext,
  toolUseConfirm,
  onDone,
  onReject,
  verbose
}) {
  // Get current terminal window size
  const { columns: terminalColumns } = Z4();

  // Validate and parse the tool input using the schema
  const parsedInputResult = PO.inputSchema.safeParse(toolUseConfirm.input);
  const parsedInput = parsedInputResult.success ? parsedInputResult.data : null;

  // Determine cell type for logging/metadata
  const cellLanguage = parsedInput?.cell_type === "markdown" ? "markdown" : "python";

  // Memoize metadata for logging permission requests
  const permissionRequestMetadata = ZE.useMemo(
    () => ({
      completion_type: "tool_use_single",
      language_name: cellLanguage
    }),
    [cellLanguage]
  );

  // Log the permission request
  FC(toolUseConfirm, permissionRequestMetadata);

  // If input parsing failed, log error and return null
  if (!parsedInput) {
    reportErrorIfAllowed(new Error(
      `Failed to parse notebook edit input: ${parsedInputResult.success ? "unknown error" : parsedInputResult.error.message}`
    ));
    return null;
  }

  // Determine the edit action description based on edit_mode
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
      break;
  }

  /**
   * Handles user response to the permission dialog.
   * @param {string} userChoice - The user'createInteractionAccessor choice ("yes", "yes-dont-ask-again", or "no").
   */
  function handleUserResponse(userChoice) {
    const sharedMetadata = {
      completion_type: "tool_use_single",
      event: userChoice === "no" ? "reject" : "accept",
      metadata: {
        language_name: cellLanguage,
        message_id: toolUseConfirm.assistantMessage.message.id,
        platform: pA.platform
      }
    };

    switch (userChoice) {
      case "yes":
        // Log acceptance, call onDone, and allow temporarily
        u5(sharedMetadata);
        onDone();
        toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
        break;
      case "yes-dont-ask-again":
        // Log acceptance, update permission context, call onDone, and allow permanently
        u5(sharedMetadata);
        setToolPermissionContext({
          ...toolUseConfirm.toolUseContext.getToolPermissionContext(),
          mode: "acceptEdits"
        });
        onDone();
        toolUseConfirm.onAllow("permanent", toolUseConfirm.input);
        break;
      case "no":
        // Log rejection, call onDone, onReject, and toolUseConfirm.onReject
        u5(sharedMetadata);
        onDone();
        onReject();
        toolUseConfirm.onReject();
        break;
      default:
        // No action for unknown responses
        break;
    }
  }

  // Render the confirmation dialog UI
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

module.exports = getAcceptEdits;