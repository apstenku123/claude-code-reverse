/**
 * Returns the appropriate permission or confirmation component/function based on the interaction type.
 *
 * @param {string} interactionType - The type of user interaction or permission request.
 * @returns {Function|React.Component} The corresponding permission/confirmation component or handler function.
 */
function getPermissionComponentForInteractionType(interactionType) {
  switch (interactionType) {
    case SINGLE_STRING_REPLACE_INTERACTION:
      // Handles single string replacement permission flow
      return StringReplaceSinglePermissionAccessor;
    case MULTI_FILE_EDIT_INTERACTION:
      // Handles multi-file edit permission confirmation
      return handleMultiFileEditPermission;
    case FILE_WRITE_INTERACTION:
      // Handles file write/edit permission dialog
      return handleFileWritePermissionDialog;
    case TOOL_USE_CONFIRMATION_PANEL_INTERACTION:
      // Renders confirmation panel for tool execution
      return ToolUseConfirmationPanel;
    case TOOL_USE_PERMISSION_PROMPT_URL_INTERACTION:
      // Renders permission prompt for tool fetching content from a URL
      return ToolUsePermissionPrompt;
    case NOTEBOOK_EDIT_PERMISSION_PROMPT_INTERACTION:
      // Renders permission prompt for editing a notebook cell
      return NotebookEditPermissionPrompt;
    case TOOL_USE_CONFIRMATION_DIALOG_INTERACTION:
      // Renders confirmation dialog for code generation plan
      return ToolUseConfirmationDialog;
    case TOOL_USE_PERMISSION_PROMPT_INTERACTION:
    case TOOL_USE_PERMISSION_PROMPT_ALT_INTERACTION:
    case TOOL_USE_PERMISSION_PROMPT_GC_INTERACTION:
    case TOOL_USE_PERMISSION_PROMPT_UB_INTERACTION:
    case TOOL_USE_PERMISSION_PROMPT_PE_INTERACTION:
      // Renders generic permission prompt for tool usage
      return mapArraysToObjectWithCallback$2;
    default:
      // Default: generic tool use permission prompt
      return ToolUsePermissionPrompt;
  }
}

module.exports = getPermissionComponentForInteractionType;