/**
 * Renders a prompt UI for confirming or rejecting file edits, handling user permissions and tool context.
 *
 * @param {Object} params - The parameters for the permission prompt.
 * @param {Function} params.setToolPermissionContext - Function to set the tool permission context.
 * @param {Object} params.toolUseConfirm - The tool use confirmation object, containing input and context.
 * @param {Object} params.toolUseContext - The context for tool usage and permissions.
 * @param {Function} params.onDone - Callback when the operation is completed.
 * @param {Function} params.onReject - Callback when the operation is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output.
 * @returns {React.ReactElement} The rendered permission prompt component.
 */
function FileEditPermissionPrompt({
  setToolPermissionContext,
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose
}) {
  // Parse file path and edits from the tool use confirmation input
  const {
    file_path: filePath,
    edits
  } = C$.inputSchema.parse(toolUseConfirm.input);

  // Get the current permission context for the tool
  const permissionOptions = toolUseConfirm.toolUseContext.getToolPermissionContext();

  // Memoize completion metadata for analytics/events
  const completionMetadata = gK.useMemo(() => ({
    completion_type: "str_replace_multi",
    language_name: $createCompatibleVersionChecker(filePath)
  }), [filePath]);

  // Log the tool use event (side effect)
  FC(toolUseConfirm, completionMetadata);

  // Keyboard shortcut handler for 'yes-dont-ask-again' option
  D0((_, keyboardEvent) => {
    if (
      keyboardEvent.tab &&
      keyboardEvent.shift &&
      getYesNoSessionOptions(filePath, permissionOptions).some(option => option.value === "yes-dont-ask-again")
    ) {
      handlePermissionChoice("yes-dont-ask-again", { file_path: filePath, edits });
      return;
    }
  });

  /**
   * Handles the user'createInteractionAccessor permission choice for the file edit.
   * @param {string} choice - The user'createInteractionAccessor choice ("yes", "yes-dont-ask-again", or "no").
   * @param {Object} context - The context containing file path and edits.
   */
  function handlePermissionChoice(choice, { file_path: chosenFilePath, edits: chosenEdits }) {
    // Close the tab in the IDE if needed
    closeTabInIDE();
    switch (choice) {
      case "yes":
        // User accepts the edit temporarily
        u5({
          completion_type: "str_replace_multi",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(chosenFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        toolUseConfirm.onAllow("temporary", {
          file_path: chosenFilePath,
          edits: chosenEdits
        });
        break;
      case "yes-dont-ask-again": {
        // User accepts the edit permanently and updates permission context
        u5({
          completion_type: "str_replace_multi",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(chosenFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        const updatedPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        updateSubscriptionWithModeAndDirectories(chosenFilePath, "edit", updatedPermissionContext, setToolPermissionContext);
        onDone();
        toolUseConfirm.onAllow("permanent", {
          file_path: chosenFilePath,
          edits: chosenEdits
        });
        break;
      }
      case "no":
        // User rejects the edit
        u5({
          completion_type: "str_replace_multi",
          event: "reject",
          metadata: {
            language_name: $createCompatibleVersionChecker(chosenFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        onReject();
        toolUseConfirm.onReject();
        break;
      default:
        // No action for unknown choices
        break;
    }
  }

  // Destructure IDE-related utilities from useIdeDiffAccessor
  const {
    closeTabInIDE,
    showingDiffInIDE,
    ideName
  } = useIdeDiffAccessor({
    onChange: handlePermissionChoice,
    toolUseContext,
    filePath,
    edits,
    editMode: "multiple"
  });

  // If showing diff in IDE, render the diff prompt component
  if (showingDiffInIDE) {
    return gK.default.createElement(EditConfirmationPanel, {
      onChange: handlePermissionChoice,
      options: getYesNoSessionOptions(filePath, permissionOptions),
      file_path: filePath,
      input: {
        file_path: filePath,
        edits
      },
      ideName
    });
  }

  // Render the main permission prompt UI
  return gK.default.createElement(
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
    gK.default.createElement(renderPermissionTitle, {
      title: "Edit file"
    }),
    gK.default.createElement(FilePatchPreview, {
      file_path: filePath,
      edits,
      verbose
    }),
    gK.default.createElement(
      g,
      { flexDirection: "column" },
      gK.default.createElement(
        _,
        null,
        "normalizeToError you want to make this edit to ",
        gK.default.createElement(_, { bold: true }, PV5(filePath)),
        "?"
      ),
      gK.default.createElement(SelectableOptionsList, {
        options: getYesNoSessionOptions(filePath, permissionOptions),
        onChange: choice => handlePermissionChoice(choice, { file_path: filePath, edits }),
        onCancel: () => handlePermissionChoice("no", { file_path: filePath, edits })
      })
    )
  );
}

module.exports = FileEditPermissionPrompt;
