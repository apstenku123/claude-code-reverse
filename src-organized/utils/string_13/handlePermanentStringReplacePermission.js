/**
 * Handles user permission flow for performing a single string replacement in a file, including IDE diff display and logging.
 *
 * @param {Object} params - The parameters for the permission handler.
 * @param {Function} params.setToolPermissionContext - Setter for updating the tool permission context.
 * @param {Object} params.toolUseConfirm - Tool use confirmation object, containing input and callbacks.
 * @param {Object} params.toolUseContext - Context object for tool use, provides permission context.
 * @param {Function} params.onDone - Callback invoked when the operation is completed.
 * @param {Function} params.onReject - Callback invoked when the operation is rejected.
 * @param {boolean} params.verbose - Flag to enable verbose output.
 * @returns {React.ReactElement} The rendered React element for the permission UI.
 */
function handlePermanentStringReplacePermission({
  setToolPermissionContext,
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose
}) {
  // Parse input schema for file path and string replacements
  const {
    file_path: filePath,
    new_string: newString,
    old_string: oldString
  } = jI.inputSchema.parse(toolUseConfirm.input);

  // Get current tool permission context
  const toolPermissionContext = toolUseContext.getToolPermissionContext();

  // Memoize metadata for logging
  const toolPermissionRequestMetadata = yK.useMemo(
    () => ({
      completion_type: "str_replace_single",
      language_name: $createCompatibleVersionChecker(filePath)
    }),
    [filePath]
  );

  // Log tool permission request
  FC(toolUseConfirm, toolPermissionRequestMetadata);

  // Keyboard shortcut handler for 'yes-dont-ask-again' quick accept
  D0((keyboardEvent, keyboardState) => {
    if (
      keyboardState.tab &&
      keyboardState.shift &&
      getYesNoSessionOptions(filePath, toolPermissionContext).some(option => option.value === "yes-dont-ask-again")
    ) {
      // User pressed Tab+Shift and "yes-dont-ask-again" is available
      handleUserDecision("yes-dont-ask-again", {
        file_path: filePath,
        edits: [{ old_string: oldString, new_string: newString }]
      });
      return;
    }
  });

  /**
   * Handles the user'createInteractionAccessor decision (yes, yes-dont-ask-again, no) for the string replacement.
   *
   * @param {string} decision - The user'createInteractionAccessor decision.
   * @param {Object} payload - The payload containing file path and edits.
   */
  function handleUserDecision(decision, { file_path: decisionFilePath, edits }) {
    closeTabInIDE();
    const { old_string: editOldString, new_string: editNewString } = edits[0];
    if (edits.length > 1) {
      // Only one edit is supported; warn if more are provided
      reportErrorIfAllowed(new Error("Too many edits provided - continuing with just the first edit"));
    }
    switch (decision) {
      case "yes":
        // Log acceptance event
        u5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(decisionFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        toolUseConfirm.onAllow("temporary", {
          file_path: decisionFilePath,
          new_string: editNewString,
          old_string: editOldString
        });
        break;
      case "yes-dont-ask-again": {
        // Log acceptance and update permanent permission context
        u5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(decisionFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        const updatedPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        updateSubscriptionWithModeAndDirectories(decisionFilePath, "edit", updatedPermissionContext, setToolPermissionContext);
        onDone();
        toolUseConfirm.onAllow("permanent", {
          file_path: decisionFilePath,
          new_string: editNewString,
          old_string: editOldString
        });
        break;
      }
      case "no":
        // Log rejection event
        u5({
          completion_type: "str_replace_single",
          event: "reject",
          metadata: {
            language_name: $createCompatibleVersionChecker(decisionFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        onReject();
        toolUseConfirm.onReject();
        break;
      default:
        // Unknown decision; do nothing
        break;
    }
  }

  // Use custom hook to manage IDE diff display and tab closing
  const {
    closeTabInIDE,
    showingDiffInIDE,
    ideName
  } = useIdeDiffAccessor({
    onChange: handleUserDecision,
    toolUseContext,
    filePath,
    edits: [{ old_string: oldString, new_string: newString }],
    editMode: "single"
  });

  // If showing diff in IDE, render the IDE diff component
  if (showingDiffInIDE) {
    return yK.default.createElement(EditConfirmationPanel, {
      onChange: handleUserDecision,
      options: getYesNoSessionOptions(filePath, toolPermissionContext),
      file_path: filePath,
      input: {
        file_path: filePath,
        edits: [{ old_string: oldString, new_string: newString }]
      },
      ideName
    });
  }

  // Otherwise, render the permission UI
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
        options: getYesNoSessionOptions(filePath, toolPermissionContext),
        onChange: decision => handleUserDecision(decision, {
          file_path: filePath,
          edits: [{ old_string: oldString, new_string: newString }]
        }),
        onCancel: () => handleUserDecision("no", {
          file_path: filePath,
          edits: [{ old_string: oldString, new_string: newString }]
        })
      })
    )
  );
}

module.exports = handlePermanentStringReplacePermission;