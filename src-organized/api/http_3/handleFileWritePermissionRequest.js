/**
 * Handles the UI and logic for requesting permission to write or edit a file, including diff display, logging, and user confirmation.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.setToolPermissionContext - Function to set the tool permission context.
 * @param {Object} params.toolUseConfirm - The tool use confirmation object, containing input, context, and callbacks.
 * @param {Object} params.toolUseContext - The context for tool usage, including permission context.
 * @param {Function} params.onDone - Callback to invoke when the process is completed.
 * @param {Function} params.onReject - Callback to invoke when the process is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output.
 * @returns {React.ReactElement} The rendered React element for the permission request UI.
 */
function handleFileWritePermissionRequest({
  setToolPermissionContext,
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose
}) {
  // Parse file path and content from the tool input schema
  const {
    file_path: filePath,
    content: newFileContent
  } = uF.inputSchema.parse(toolUseConfirm.input);

  // Get the current tool permission context
  const permissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();

  // Check if the file exists (memoized)
  const fileExists = VW.useMemo(() => f1().existsSync(filePath), [filePath]);

  // Prepare metadata for logging (memoized)
  const permissionRequestMetadata = VW.useMemo(() => ({
    completion_type: "write_file_single",
    language_name: $createCompatibleVersionChecker(filePath)
  }), [filePath]);

  // Log the tool permission request
  FC(toolUseConfirm, permissionRequestMetadata);

  /**
   * Handles the user'createInteractionAccessor response to the permission request.
   * @param {string} userResponse - The user'createInteractionAccessor response ("yes", "yes-dont-ask-again", or "no").
   * @param {Object} fileEdit - The file edit details.
   * @param {string} fileEdit.file_path - The file path.
   * @param {string} fileEdit.content - The new file content.
   */
  function handleUserResponse(userResponse, { file_path: responseFilePath, content: responseContent }) {
    // Close the tab in IDE if needed (side effect)
    renderToolUseConfirmationDialog();
    switch (userResponse) {
      case "yes":
        // Log acceptance and allow temporary write
        u5({
          completion_type: "write_file_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        toolUseConfirm.onAllow("temporary", {
          file_path: responseFilePath,
          content: responseContent
        });
        onDone();
        break;
      case "yes-dont-ask-again": {
        // Log acceptance and allow permanent write
        u5({
          completion_type: "write_file_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        const updatedPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        // Set permanent permission for this file
        updateSubscriptionWithModeAndDirectories(responseFilePath, "edit", updatedPermissionContext, setToolPermissionContext);
        onDone();
        toolUseConfirm.onAllow("permanent", {
          file_path: responseFilePath,
          content: responseContent
        });
        break;
      }
      case "no":
        // Log rejection and call reject callbacks
        u5({
          completion_type: "write_file_single",
          event: "reject",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        toolUseConfirm.onReject();
        onReject();
        onDone();
        break;
    }
  }

  // Keyboard shortcut: Shift+Tab triggers "yes-dont-ask-again" if available
  D0((_, keyboardEvent) => {
    if (
      keyboardEvent.tab &&
      keyboardEvent.shift &&
      getYesNoSessionOptions(filePath, permissionContext).some(option => option.value === "yes-dont-ask-again")
    ) {
      handleUserResponse("yes-dont-ask-again", {
        file_path: filePath,
        content: newFileContent
      });
    }
  });

  // Read the current file content if isBlobOrFileLikeObject exists (memoized)
  const oldFileContent = VW.useMemo(() => (f1().existsSync(filePath) ? CI(filePath) : ""), [filePath]);

  // IDE diff accessor hook: manages IDE diff view and callbacks
  const {
    closeTabInIDE: closeTab,
    showingDiffInIDE,
    ideName
  } = useIdeDiffAccessor({
    onChange(userResponse, { file_path: changedFilePath, edits }) {
      handleUserResponse(userResponse, {
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

  // If showing diff in IDE, render the IDE diff UI
  if (showingDiffInIDE) {
    return VW.default.createElement(EditConfirmationPanel, {
      onChange: (userResponse, { file_path: changedFilePath, new_string: changedContent }) => {
        handleUserResponse(userResponse, {
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

  // Otherwise, render the permission request UI
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
    // Title: Edit or Create file
    VW.default.createElement(renderPermissionTitle, {
      title: `${fileExists ? "Edit" : "Create"} file`
    }),
    // File preview
    VW.default.createElement(
      g,
      { flexDirection: "column" },
      VW.default.createElement(renderFilePatchPreview, {
        file_path: filePath,
        content: newFileContent,
        verbose
      })
    ),
    // Confirmation prompt and options
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
        onChange: userResponse => handleUserResponse(userResponse, {
          file_path: filePath,
          content: newFileContent
        }),
        onCancel: () => handleUserResponse("no", {
          file_path: filePath,
          content: newFileContent
        })
      })
    )
  );
}

module.exports = handleFileWritePermissionRequest;