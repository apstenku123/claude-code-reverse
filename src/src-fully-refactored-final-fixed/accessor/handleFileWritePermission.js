/**
 * Handles the UI and logic for requesting and processing file write permissions from the user.
 * Presents a diff or confirmation dialog, manages user responses, and triggers appropriate callbacks.
 *
 * @param {Object} options - The configuration object.
 * @param {Function} options.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} options.toolUseConfirm - The tool use confirmation object, containing input and context.
 * @param {Object} options.toolUseContext - The context for tool usage, including permission helpers.
 * @param {Function} options.onDone - Callback to invoke when the process is completed.
 * @param {Function} options.onReject - Callback to invoke when the user rejects the action.
 * @param {boolean} options.verbose - Whether to show verbose output.
 * @returns {JSX.Element} The rendered UI for the file write permission flow.
 */
function handleFileWritePermission({
  setToolPermissionContext,
  toolUseConfirm,
  toolUseContext,
  onDone,
  onReject,
  verbose
}) {
  // Parse file path and content from the tool use confirmation input
  const {
    file_path: filePath,
    content: newFileContent
  } = uF.inputSchema.parse(toolUseConfirm.input);

  // Get the current tool permission context
  const toolPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();

  // Check if the file already exists
  const fileExists = VW.useMemo(() => f1().existsSync(filePath), [filePath]);

  // Prepare metadata for logging and tracking
  const completionMetadata = VW.useMemo(() => ({
    completion_type: "write_file_single",
    language_name: $createCompatibleVersionChecker(filePath)
  }), [filePath]);

  // Log the file completion event
  FC(toolUseConfirm, completionMetadata);

  /**
   * Handles the user'createInteractionAccessor response to the permission prompt.
   * @param {string} userResponse - The user'createInteractionAccessor choice ("yes", "yes-dont-ask-again", or "no").
   * @param {Object} fileData - The file data object.
   * @param {string} fileData.file_path - The path to the file.
   * @param {string} fileData.content - The new content for the file.
   */
  function handleUserResponse(userResponse, { file_path: responseFilePath, content: responseContent }) {
    // Close any open UI transactions
    startUiActionClickTransaction();
    switch (userResponse) {
      case "yes":
        // Log acceptance event
        u5({
          completion_type: "write_file_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Allow the file write temporarily
        toolUseConfirm.onAllow("temporary", {
          file_path: responseFilePath,
          content: responseContent
        });
        onDone();
        break;
      case "yes-dont-ask-again": {
        // Log acceptance event with permanent permission
        u5({
          completion_type: "write_file_single",
          event: "accept",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Update tool permission context for permanent permission
        const updatedPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        updateSubscriptionWithModeAndDirectories(responseFilePath, "edit", updatedPermissionContext, setToolPermissionContext);
        onDone();
        toolUseConfirm.onAllow("permanent", {
          file_path: responseFilePath,
          content: responseContent
        });
        break;
      }
      case "no":
        // Log rejection event
        u5({
          completion_type: "write_file_single",
          event: "reject",
          metadata: {
            language_name: $createCompatibleVersionChecker(responseFilePath),
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Trigger rejection callbacks
        toolUseConfirm.onReject();
        onReject();
        onDone();
        break;
    }
  }

  // Keyboard shortcut: If user presses Tab+Shift and "yes-dont-ask-again" is available, auto-select isBlobOrFileLikeObject
  D0((_, keyboardEvent) => {
    if (
      keyboardEvent.tab &&
      keyboardEvent.shift &&
      getYesNoSessionOptions(filePath, toolPermissionContext).filter(option => option.value === "yes-dont-ask-again").length > 0
    ) {
      handleUserResponse("yes-dont-ask-again", {
        file_path: filePath,
        content: newFileContent
      });
    }
  });

  // Get the current file content if isBlobOrFileLikeObject exists, otherwise empty string
  const oldFileContent = VW.useMemo(() => (f1().existsSync(filePath) ? CI(filePath) : ""), [filePath]);

  // IDE diff integration: show diff and handle user actions
  const {
    closeTabInIDE,
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

  // If IDE diff is showing, render the diff UI
  if (showingDiffInIDE) {
    return VW.default.createElement(EditConfirmationPanel, {
      onChange: (userResponse, { file_path: changedFilePath, new_string: changedContent }) => {
        handleUserResponse(userResponse, {
          file_path: changedFilePath,
          content: changedContent
        });
      },
      options: getYesNoSessionOptions(filePath, toolPermissionContext),
      file_path: filePath,
      input: {
        file_path: filePath,
        old_string: oldFileContent,
        new_string: newFileContent
      },
      ideName
    });
  }

  // Otherwise, render the confirmation UI
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
        options: getYesNoSessionOptions(filePath, toolPermissionContext),
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

module.exports = handleFileWritePermission;