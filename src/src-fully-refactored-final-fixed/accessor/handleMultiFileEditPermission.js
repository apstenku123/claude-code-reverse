/**
 * Handles user permission flow for applying multiple string replacement edits to a file.
 * Presents a confirmation UI, manages permission context, and triggers callbacks based on user choice.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} params.toolUseConfirm - The tool usage confirmation object, containing input, context, and callbacks.
 * @param {Object} params.toolUseContext - The context object for tool usage, provides permission context.
 * @param {Function} params.onDone - Callback to invoke when the operation is completed.
 * @param {Function} params.onReject - Callback to invoke when the operation is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output.
 * @returns {React.ReactElement} The rendered confirmation UI component.
 */
function handleMultiFileEditPermission({
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

  // Get the current tool permission context
  const permissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();

  // Memoize the completion metadata for analytics/events
  const completionMetadata = gK.useMemo(
    () => ({
      completion_type: "str_replace_multi",
      language_name: $createCompatibleVersionChecker(filePath)
    }),
    [filePath]
  );

  // Track the start of the permission confirmation flow
  FC(toolUseConfirm, completionMetadata);

  // Keyboard shortcut handler for quick 'yes-dont-ask-again' action
  D0((_, keyboardEvent) => {
    if (
      keyboardEvent.tab &&
      keyboardEvent.shift &&
      getYesNoSessionOptions(filePath, permissionContext).filter(option => option.value === "yes-dont-ask-again").length > 0
    ) {
      handleUserChoice("yes-dont-ask-again", { file_path: filePath, edits });
      return;
    }
  });

  /**
   * Handles user choice from the confirmation UI or keyboard shortcut.
   * @param {string} userChoice - The user'createInteractionAccessor selection ("yes", "yes-dont-ask-again", or "no").
   * @param {Object} payload - The payload containing file_path and edits.
   */
  function handleUserChoice(userChoice, { file_path, edits }) {
    // Close any open tab in the IDE before proceeding
    closeTabInIDE();
    switch (userChoice) {
      case "yes":
        // User accepted the edit for this session only
        u5({
          completion_type: "str_replace_multi",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(file_path),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        toolUseConfirm.onAllow("temporary", { file_path, edits });
        break;
      case "yes-dont-ask-again": {
        // User accepted and wants to always allow this kind of edit
        u5({
          completion_type: "str_replace_multi",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(file_path),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        const updatedPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        updateSubscriptionWithModeAndDirectories(file_path, "edit", updatedPermissionContext, setToolPermissionContext);
        onDone();
        toolUseConfirm.onAllow("permanent", { file_path, edits });
        break;
      }
      case "no":
        // User rejected the edit
        u5({
          completion_type: "str_replace_multi",
          event: "reject",
          metadata: {
            language_name: $createCompatibleVersionChecker(file_path),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        onDone();
        onReject();
        toolUseConfirm.onReject();
        break;
      default:
        // No action for unknown choice
        break;
    }
  }

  // Set up the IDE integration for diff view and tab closing
  const {
    closeTabInIDE,
    showingDiffInIDE,
    ideName
  } = useIdeDiffAccessor({
    onChange: handleUserChoice,
    toolUseContext,
    filePath,
    edits,
    editMode: "multiple"
  });

  // If the IDE is showing the diff, render the diff confirmation UI
  if (showingDiffInIDE) {
    return gK.default.createElement(EditConfirmationPanel, {
      onChange: handleUserChoice,
      options: getYesNoSessionOptions(filePath, permissionContext),
      file_path: filePath,
      input: {
        file_path: filePath,
        edits
      },
      ideName
    });
  }

  // Otherwise, render the standard confirmation UI
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
        options: getYesNoSessionOptions(filePath, permissionContext),
        onChange: userChoice => handleUserChoice(userChoice, { file_path: filePath, edits }),
        onCancel: () => handleUserChoice("no", { file_path: filePath, edits })
      })
    )
  );
}

module.exports = handleMultiFileEditPermission;