/**
 * Returns the appropriate permission prompt or handler component based on the given permission type key.
 *
 * @param {string} permissionTypeKey - The key representing the type of permission or action requested.
 * @returns {Function|Component} The corresponding permission prompt component or handler function.
 */
function getPermissionPromptComponent(permissionTypeKey) {
  switch (permissionTypeKey) {
    case SINGLE_STRING_REPLACE_PERMISSION_KEY: // jI
      // Handles single string replacement permission
      return handleSingleStringReplacePermission;
    case FILE_EDIT_PERMISSION_KEY: // C$
      // Renders file edit permission prompt
      return FileEditPermissionPrompt;
    case FILE_WRITE_PERMISSION_KEY: // uF
      // Handles file write permission
      return handleFileWritePermission;
    case TOOL_USE_PERMISSION_KEY: // P4
      // Renders tool use permission prompt (e.g., running a Bash command)
      return ToolUsePermissionPrompt;
    case URL_FETCH_PERMISSION_KEY: // EW
      // Renders permission prompt for fetching content from a URL
      return ToolUsePermissionPrompt;
    case NOTEBOOK_CELL_EDIT_PERMISSION_KEY: // PO
      // Renders notebook cell edit permission prompt
      return NotebookCellEditPermissionPrompt;
    case TOOL_USE_CONFIRMATION_PANEL_KEY: // ld
      // Renders tool use confirmation panel
      return ToolUseConfirmationPanel;
    case TOOL_USE_PERMISSION_PROMPT_KEY: // UL$
    case TOOL_USE_PERMISSION_PROMPT_KEY_ALT1: // oj
    case TOOL_USE_PERMISSION_PROMPT_KEY_ALT2: // GC
    case TOOL_USE_PERMISSION_PROMPT_KEY_ALT3: // UB
    case TOOL_USE_PERMISSION_PROMPT_KEY_ALT4: // Pe
      // All these keys map to the same permission prompt
      return mapArraysToObjectWithCallback$2; // Not yet refactored
    default:
      // Default to generic tool use permission prompt
      return ToolUsePermissionPrompt;
  }
}

module.exports = getPermissionPromptComponent;