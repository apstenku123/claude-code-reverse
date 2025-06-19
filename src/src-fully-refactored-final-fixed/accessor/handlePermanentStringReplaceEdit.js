/**
 * Handles the process of confirming and applying a single string replacement edit in a file,
 * including permission context management, IDE diff integration, and user confirmation UI.
 *
 * @param {Object} params - The parameters for the edit handler.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} params.toolUseConfirm - The tool use confirmation object, containing input and callbacks.
 * @param {Object} params.toolUseContext - The context object for tool usage, provides permission context.
 * @param {Function} params.onDone - Callback to invoke when the operation is completed.
 * @param {Function} params.onReject - Callback to invoke when the operation is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output in the UI.
 * @returns {React.ReactElement} The rendered UI for confirming and applying the string replacement edit.
 */
function handlePermanentStringReplaceEdit({
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

  // Get the current tool permission context
  const toolPermissionContext = toolUseContext.getToolPermissionContext();

  // Memoize completion metadata for analytics/logging
  const completionMetadata = yK.useMemo(
    () => ({
      completion_type: "str_replace_single",
      language_name: $createCompatibleVersionChecker(filePath)
    }),
    [filePath]
  );

  // Log or track the tool use confirmation
  FC(toolUseConfirm, completionMetadata);

  // Register a global key handler for Shift+Tab to allow 'yes-dont-ask-again' shortcut
  D0((event, keyState) => {
    if (
      keyState.tab &&
      keyState.shift &&
      getYesNoSessionOptions(filePath, toolPermissionContext).filter(option => option.value === "yes-dont-ask-again").length > 0
    ) {
      // If the shortcut is available, immediately accept permanently
      handleUserResponse("yes-dont-ask-again", {
        file_path: filePath,
        edits: [{ old_string: oldString, new_string: newString }]
      });
      return;
    }
  });

  /**
   * Handles user responses to the edit confirmation (yes, yes-dont-ask-again, no).
   * @param {string} userChoice - The user'createInteractionAccessor choice.
   * @param {Object} editPayload - The payload for the edit action.
   * @param {string} editPayload.file_path - The file path to edit.
   * @param {Array} editPayload.edits - Array of edit objects ({old_string, new_string}).
   */
  function handleUserResponse(userChoice, { file_path: responseFilePath, edits }) {
    // Close the diff tab in the IDE if open
    closeTabInIDE();
    const { old_string: editOldString, new_string: editNewString } = edits[0];
    if (edits.length > 1) {
      // Warn if more than one edit is provided
      reportErrorIfAllowed(new Error("Too many edits provided - continuing with just the first edit"));
    }
    switch (userChoice) {
      case "yes":
        // Log acceptance and apply the edit temporarily
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
        // Log acceptance and apply the edit permanently
        u5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        const updatedPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        // Update the tool permission context to remember this choice
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
        // Log rejection and invoke rejection callbacks
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
    }
  }

  // Integrate with IDE diff tool and get helpers for UI state
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

  // If showing diff in IDE, render the diff confirmation UI
  if (showingDiffInIDE) {
    return yK.default.createElement(EditConfirmationPanel, {
      onChange: handleUserResponse,
      options: getYesNoSessionOptions(filePath, toolPermissionContext),
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
    yK.default.createElement(renderPermissionTitle, {
      title: "Edit file"
    }),
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
        onChange: userChoice => handleUserResponse(userChoice, {
          file_path: filePath,
          edits: [{ old_string: oldString, new_string: newString }]
        }),
        onCancel: () => handleUserResponse("no", {
          file_path: filePath,
          edits: [{ old_string: oldString, new_string: newString }]
        })
      })
    )
  );
}

module.exports = handlePermanentStringReplaceEdit;