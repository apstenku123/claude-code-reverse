/**
 * Handles the permission flow for a single string replacement edit in a file, including user confirmation,
 * IDE diff display, and permission context management. Integrates with the tool permission context and
 * manages user responses (accept, reject, accept permanently) for the edit operation.
 *
 * @param {Object} params - The parameters for the accessor.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} params.toolUseConfirm - The tool use confirmation object, including input and callbacks.
 * @param {Object} params.toolUseContext - The tool use context, providing permission context methods.
 * @param {Function} params.onDone - Callback invoked when the operation is completed.
 * @param {Function} params.onReject - Callback invoked when the operation is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output in the UI.
 * @returns {React.ReactElement} The rendered React element for the permission UI.
 */
function StringReplaceSinglePermissionAccessor({
  setToolPermissionContext,
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose
}) {
  // Parse the input schema for file path and string replacements
  const {
    file_path: filePath,
    new_string: newString,
    old_string: oldString
  } = jI.inputSchema.parse(toolUseConfirm.input);

  // Get the current tool permission context
  const permissionContext = toolUseContext.getToolPermissionContext();

  // Memoize the completion metadata for analytics/events
  const completionMetadata = yK.useMemo(
    () => ({
      completion_type: "str_replace_single",
      language_name: $createCompatibleVersionChecker(filePath)
    }),
    [filePath]
  );

  // Log the tool use confirmation event
  FC(toolUseConfirm, completionMetadata);

  // Register a keyboard shortcut handler for 'yes-dont-ask-again' quick accept
  D0((keyboardEvent, keyboardState) => {
    if (
      keyboardState.tab &&
      keyboardState.shift &&
      getYesNoSessionOptions(filePath, permissionContext).filter(option => option.value === "yes-dont-ask-again").length > 0
    ) {
      handleUserResponse("yes-dont-ask-again", {
        file_path: filePath,
        edits: [{ old_string: oldString, new_string: newString }]
      });
      return;
    }
  });

  /**
   * Handles user responses to the permission prompt, including accept, reject, and permanent accept.
   * @param {string} responseType - The type of user response ("yes", "yes-dont-ask-again", or "no").
   * @param {Object} payload - The payload containing file path and edits.
   */
  function handleUserResponse(responseType, { file_path: responseFilePath, edits }) {
    closeTabInIDE();
    const { old_string: editOldString, new_string: editNewString } = edits[0];
    if (edits.length > 1) {
      reportErrorIfAllowed(new Error("Too many edits provided - continuing with just the first edit"));
    }
    switch (responseType) {
      case "yes":
        // Log accept event
        u5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        toolUseConfirm.onAllow("temporary", {
          file_path: responseFilePath,
          new_string: editNewString,
          old_string: editOldString
        });
        break;
      case "yes-dont-ask-again": {
        // Log permanent accept event
        u5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Update tool permission context permanently
        const updatedPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        updateSubscriptionWithModeAndDirectories(responseFilePath, "edit", updatedPermissionContext, setToolPermissionContext);
        onDone();
        toolUseConfirm.onAllow("permanent", {
          file_path: responseFilePath,
          new_string: editNewString,
          old_string: editOldString
        });
        break;
      }
      case "no":
        // Log reject event
        u5({
          completion_type: "str_replace_single",
          event: "reject",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
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

  // Use the IDE diff accessor hook to manage IDE state and diff display
  const {
    closeTabInIDE,
    showingDiffInIDE,
    ideName
  } = useIdeDiffAccessor({
    onChange: handleUserResponse,
    toolUseContext,
    filePath,
    edits: [{ old_string: oldString, new_string: newString }],
    editMode: "single"
  });

  // If showing diff in IDE, render the IDE diff component
  if (showingDiffInIDE) {
    return yK.default.createElement(EditConfirmationPanel, {
      onChange: handleUserResponse,
      options: getYesNoSessionOptions(filePath, permissionContext),
      file_path: filePath,
      input: {
        file_path: filePath,
        edits: [{ old_string: oldString, new_string: newString }]
      },
      ideName
    });
  }

  // Otherwise, render the permission prompt UI
  return yK.default.createElement(
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
    yK.default.createElement(renderPermissionTitle, { title: "Edit file" }),
    yK.default.createElement(FilePatchPreview, {
      file_path: filePath,
      edits: [{ old_string: oldString, new_string: newString }],
      verbose
    }),
    yK.default.createElement(
      g,
      { flexDirection: "column" },
      yK.default.createElement(
        _,
        null,
        "normalizeToError you want to make this edit to ",
        yK.default.createElement(_, { bold: true }, aW5(filePath)),
        "?"
      ),
      yK.default.createElement(SelectableOptionsList, {
        options: getYesNoSessionOptions(filePath, permissionContext),
        onChange: responseType =>
          handleUserResponse(responseType, {
            file_path: filePath,
            edits: [{ old_string: oldString, new_string: newString }]
          }),
        onCancel: () =>
          handleUserResponse("no", {
            file_path: filePath,
            edits: [{ old_string: oldString, new_string: newString }]
          })
      })
    )
  );
}

module.exports = StringReplaceSinglePermissionAccessor;