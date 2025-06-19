/**
 * Handles the UI dialog and logic for requesting permission to write or edit a file.
 * Presents the user with options to accept, reject, or always allow file write operations.
 * Integrates with IDE diff view if available, and tracks user actions for analytics.
 *
 * @param {Object} params - The parameters for the dialog and permission context.
 * @param {Function} params.setToolPermissionContext - Setter for updating the tool permission context.
 * @param {Object} params.toolUseConfirm - Contains input, context, and callbacks for the tool use.
 * @param {Object} params.toolUseContext - Context object for tool usage, provides permission context.
 * @param {Function} params.onDone - Callback invoked when the dialog completes.
 * @param {Function} params.onReject - Callback invoked when the user rejects the action.
 * @param {boolean} params.verbose - Whether to show verbose output in the UI.
 * @returns {React.ReactElement} The rendered React element for the permission dialog.
 */
function handleFileWritePermissionDialog({
  setToolPermissionContext,
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose
}) {
  // Parse input schema for file path and content
  const {
    file_path: filePath,
    content: newFileContent
  } = uF.inputSchema.parse(toolUseConfirm.input);

  // Get current tool permission context
  const permissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();

  // Check if the file already exists
  const fileExists = VW.useMemo(() => f1().existsSync(filePath), [filePath]);

  // Prepare metadata for analytics/tracking
  const completionMetadata = VW.useMemo(() => ({
    completion_type: "write_file_single",
    language_name: $createCompatibleVersionChecker(filePath)
  }), [filePath]);

  // Track the file completion event
  FC(toolUseConfirm, completionMetadata);

  /**
   * Handles the user'createInteractionAccessor response to the permission dialog.
   * @param {string} userChoice - The user'createInteractionAccessor choice ("yes", "yes-dont-ask-again", or "no").
   * @param {Object} fileEdit - The file edit details.
   * @param {string} fileEdit.file_path - The file path.
   * @param {string} fileEdit.content - The new file content.
   */
  function handleUserChoice(userChoice, { file_path: chosenFilePath, content: chosenContent }) {
    // Close the IDE diff tab if open
    closeTabInIDE();
    switch (userChoice) {
      case "yes":
        // User allows this edit once
        u5({
          completion_type: "write_file_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(chosenFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        toolUseConfirm.onAllow("temporary", {
          file_path: chosenFilePath,
          content: chosenContent
        });
        onDone();
        break;
      case "yes-dont-ask-again": {
        // User allows all future edits to this file
        u5({
          completion_type: "write_file_single",
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
          content: chosenContent
        });
        break;
      }
      case "no":
        // User rejects the edit
        u5({
          completion_type: "write_file_single",
          event: "reject",
          metadata: {
            language_name: $createCompatibleVersionChecker(chosenFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        toolUseConfirm.onReject();
        onReject();
        onDone();
        break;
      default:
        break;
    }
  }

  // Keyboard shortcut: Shift+Tab triggers "yes-dont-ask-again" if available
  D0((key, modifiers) => {
    if (
      modifiers.tab &&
      modifiers.shift &&
      getYesNoSessionOptions(filePath, permissionContext).some(option => option.value === "yes-dont-ask-again")
    ) {
      handleUserChoice("yes-dont-ask-again", {
        file_path: filePath,
        content: newFileContent
      });
    }
  });

  // Read the old file content for diff view (if file exists)
  const oldFileContent = VW.useMemo(
    () => (f1().existsSync(filePath) ? CI(filePath) : ""),
    [filePath]
  );

  // IDE diff integration hook
  const {
    closeTabInIDE,
    showingDiffInIDE,
    ideName
  } = useIdeDiffAccessor({
    onChange(userChoice, { file_path: changedFilePath, edits }) {
      handleUserChoice(userChoice, {
        file_path: changedFilePath,
        content: edits[0].new_string
      });
    },
    toolUseContext,
    filePath,
    edits: [{
      old_string: oldFileContent,
      new_string: newFileContent
    }],
    editMode: "single"
  });

  // If IDE diff is showing, render the diff dialog
  if (showingDiffInIDE) {
    return VW.default.createElement(EditConfirmationPanel, {
      onChange: (userChoice, { file_path: changedFilePath, new_string: changedContent }) => {
        handleUserChoice(userChoice, {
          file_path: changedFilePath,
          content: changedContent
        });
      },
      options: getYesNoSessionOptions(filePath, permissionContext),
      file_path: filePath,
      input: {
        file_path: filePath,
        old_string: oldFileContent,
        new_string: newFileContent
      },
      ideName
    });
  }

  // Otherwise, render the standard permission dialog
  return VW.default.createElement(
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
    VW.default.createElement(renderPermissionTitle, {
      title: `${fileExists ? "Edit" : "Create"} file`
    }),
    VW.default.createElement(
      g,
      { flexDirection: "column" },
      VW.default.createElement(renderFilePatchPreview, {
        file_path: filePath,
        content: newFileContent,
        verbose
      })
    ),
    VW.default.createElement(
      g,
      { flexDirection: "column" },
      VW.default.createElement(
        _,
        null,
        "normalizeToError you want to ",
        fileExists ? "make this edit to" : "create",
        " ",
        VW.default.createElement(_, { bold: true }, DF5(filePath)),
        "?"
      ),
      VW.default.createElement(SelectableOptionsList, {
        options: getYesNoSessionOptions(filePath, permissionContext),
        onChange: userChoice =>
          handleUserChoice(userChoice, {
            file_path: filePath,
            content: newFileContent
          }),
        onCancel: () =>
          handleUserChoice("no", {
            file_path: filePath,
            content: newFileContent
          })
      })
    )
  );
}

module.exports = handleFileWritePermissionDialog;