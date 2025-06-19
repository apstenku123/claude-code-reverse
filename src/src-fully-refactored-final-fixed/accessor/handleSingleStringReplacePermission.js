/**
 * Handles the permission workflow for a single string replacement edit in a file, including user confirmation,
 * IDE diff integration, and permission context management. Presents UI for accepting/rejecting the edit and
 * manages permanent/temporary permissions based on user choice.
 *
 * @param {Object} params - The parameters for the handler.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} params.toolUseConfirm - The tool use confirmation object, containing input and callbacks.
 * @param {Object} params.toolUseContext - Context object for tool permissions and IDE integration.
 * @param {Function} params.onDone - Callback to invoke when the operation is completed.
 * @param {Function} params.onReject - Callback to invoke when the operation is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output in the UI.
 * @returns {React.ReactElement} The rendered UI for the permission workflow.
 */
function handleSingleStringReplacePermission({
  setToolPermissionContext,
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose
}) {
  // Parse input schema for file path and string edits
  const {
    file_path: filePath,
    new_string: newString,
    old_string: oldString
  } = jI.inputSchema.parse(toolUseConfirm.input);

  // Get current tool permission context
  const permissionContext = toolUseContext.getToolPermissionContext();

  // Memoize metadata for analytics/event tracking
  const completionMetadata = yK.useMemo(
    () => ({
      completion_type: "str_replace_single",
      language_name: $createCompatibleVersionChecker(filePath)
    }),
    [filePath]
  );

  // Track the tool use event
  FC(toolUseConfirm, completionMetadata);

  // Keyboard shortcut handler for 'yes-dont-ask-again' (Shift+Tab)
  D0((keyboardEvent, keyModifiers) => {
    const yesDontAskAgainOption = getYesNoSessionOptions(filePath, permissionContext).filter(option => option.value === "yes-dont-ask-again");
    if (keyModifiers.tab && keyModifiers.shift && yesDontAskAgainOption.length > 0) {
      handleUserChoice("yes-dont-ask-again", {
        file_path: filePath,
        edits: [{ old_string: oldString, new_string: newString }]
      });
      return;
    }
  });

  /**
   * Handles the user'createInteractionAccessor choice from the confirmation UI or keyboard shortcut.
   *
   * @param {string} userChoice - The user'createInteractionAccessor selection ("yes", "yes-dont-ask-again", or "no").
   * @param {Object} editPayload - The edit payload containing file path and edits.
   */
  function handleUserChoice(userChoice, { file_path: editFilePath, edits }) {
    closeTabInIDE();
    const { old_string: editOldString, new_string: editNewString } = edits[0];
    if (edits.length > 1) {
      // Warn if more than one edit is provided (should not happen)
      reportErrorIfAllowed(new Error("Too many edits provided - continuing with just the first edit"));
    }
    switch (userChoice) {
      case "yes":
        // Accept the edit temporarily
        u5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(editFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        toolUseConfirm.onAllow("temporary", {
          file_path: editFilePath,
          new_string: editNewString,
          old_string: editOldString
        });
        break;
      case "yes-dont-ask-again": {
        // Accept the edit and set permanent permission
        u5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(editFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        const updatedPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        updateSubscriptionWithModeAndDirectories(editFilePath, "edit", updatedPermissionContext, setToolPermissionContext);
        onDone();
        toolUseConfirm.onAllow("permanent", {
          file_path: editFilePath,
          new_string: editNewString,
          old_string: editOldString
        });
        break;
      }
      case "no":
        // Reject the edit
        u5({
          completion_type: "str_replace_single",
          event: "reject",
          metadata: {
            language_name: $createCompatibleVersionChecker(editFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        onReject();
        toolUseConfirm.onReject();
        break;
    }
  }

  // IDE diff integration: get helpers and state for showing diffs and closing tabs
  const {
    closeTabInIDE,
    showingDiffInIDE,
    ideName
  } = useIdeDiffAccessor({
    onChange: handleUserChoice,
    toolUseContext,
    filePath,
    edits: [{ old_string: oldString, new_string: newString }],
    editMode: "single"
  });

  // If showing diff in IDE, render the IDE diff confirmation UI
  if (showingDiffInIDE) {
    return yK.default.createElement(EditConfirmationPanel, {
      onChange: handleUserChoice,
      options: getYesNoSessionOptions(filePath, permissionContext),
      file_path: filePath,
      input: {
        file_path: filePath,
        edits: [{ old_string: oldString, new_string: newString }]
      },
      ideName
    });
  }

  // Otherwise, render the standard confirmation UI
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
        onChange: userChoice => handleUserChoice(userChoice, {
          file_path: filePath,
          edits: [{ old_string: oldString, new_string: newString }]
        }),
        onCancel: () => handleUserChoice("no", {
          file_path: filePath,
          edits: [{ old_string: oldString, new_string: newString }]
        })
      })
    )
  );
}

module.exports = handleSingleStringReplacePermission;