/**
 * Renders a React element or null based on the type of attachment event provided.
 * Handles various attachment event types such as new files, directories, diagnostics, etc.,
 * and returns a formatted React element for display in the UI.
 *
 * @param {Object} params - The parameters for rendering the attachment event.
 * @param {Object} params.attachment - The attachment event object containing event details.
 * @param {boolean} params.addMargin - Whether to add margin to the rendered component (used for queued_command).
 * @param {boolean} params.verbose - Whether to render in verbose mode (used for queued_command and diagnostics).
 * @returns {React.ReactElement|null} The rendered React element for the event, or null if not applicable.
 */
function renderAttachmentEvent({
  attachment,
  addMargin,
  verbose
}) {
  switch (attachment.type) {
    case "new_directory": {
      // Render a message for a newly listed directory
      const directoryPath = j11(iA(), attachment.path) + kW5;
      return WC.default.createElement(aj, {
        text: `Listed directory ${FA.bold(directoryPath)}`
      });
    }
    case "new_file": {
      // Handle notebook files differently from other files
      if (attachment.content.type === "notebook") {
        return WC.default.createElement(aj, {
          text: `Read ${FA.bold(j11(iA(), attachment.filename))} (${attachment.content.file.cells.length} cells)`
        });
      }
      // For text files, show number of lines (with + if truncated), otherwise show original size
      const fileName = FA.bold(j11(iA(), attachment.filename));
      let fileInfo = "";
      if (attachment.content.type === "text") {
        const numLines = attachment.content.file.numLines;
        const isTruncated = attachment.truncated ? "+" : "";
        fileInfo = `${numLines}${isTruncated} lines`;
      } else {
        fileInfo = `${FA.bold(formatFileSize(attachment.content.file.originalSize))}`;
      }
      return WC.default.createElement(aj, {
        text: `Read ${fileName} (${fileInfo})`
      });
    }
    case "edited_text_file":
    case "edited_image_file": {
      // No UI for edited files
      return null;
    }
    case "selected_lines_in_ide": {
      // Render the number of selected lines from a file in the IDE
      const selectedLines = attachment.content.split("\n").length;
      const fileName = FA.bold(j11(iA(), attachment.filename));
      return WC.default.createElement(aj, {
        text: `⧉ Selected ${FA.bold(selectedLines)} lines from ${fileName} in ${attachment.ideName}`
      });
    }
    case "nested_memory": {
      // Render the path for nested memory
      return WC.default.createElement(aj, {
        text: FA.bold(j11(iA(), attachment.path))
      });
    }
    case "queued_command": {
      // Render a queued command with optional margin and verbosity
      return WC.default.createElement(AH1, {
        addMargin: addMargin,
        param: {
          text: attachment.prompt,
          type: "text"
        },
        verbose: verbose
      });
    }
    case "opened_file_in_ide":
    case "ultramemory":
    case "plan_mode": {
      // No UI for these types
      return null;
    }
    case "todo": {
      // Render a todo list read message if context is post-compact
      if (attachment.context === "post-compact") {
        const itemCount = attachment.itemCount;
        const itemLabel = itemCount === 1 ? "item" : "items";
        return WC.default.createElement(aj, {
          text: `Todo list read (${itemCount} ${itemLabel})`
        });
      }
      return null;
    }
    case "diagnostics": {
      // Render diagnostics component
      return WC.default.createElement(F$2, {
        attachment: attachment,
        verbose: verbose
      });
    }
    case "mcp_resource": {
      // Render a message for reading an MCP resource
      return WC.default.createElement(aj, {
        text: `Read MCP resource ${FA.bold(attachment.name)} from ${attachment.server}`
      });
    }
    default:
      // Fallback for unknown types
      return null;
  }
}

module.exports = renderAttachmentEvent;
