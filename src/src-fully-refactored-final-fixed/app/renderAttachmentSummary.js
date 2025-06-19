/**
 * Renders a summary React element for a given attachment action in the CLI app.
 * Handles various attachment types such as files, directories, diagnostics, etc.,
 * and returns a formatted React element or null as appropriate.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.attachment - The attachment object describing the action.
 * @param {boolean} params.addMargin - Whether to add margin to the rendered element (used for queued_command).
 * @param {boolean} params.verbose - Whether to render in verbose mode (passed to some components).
 * @returns {React.ReactElement|null} The rendered React element summarizing the attachment, or null if not applicable.
 */
function renderAttachmentSummary({
  attachment,
  addMargin,
  verbose
}) {
  switch (attachment.type) {
    case "new_directory":
      // Render summary for a newly listed directory
      return WC.default.createElement(aj, {
        text: `Listed directory ${FA.bold(j11(iA(), attachment.path) + kW5)}`
      });
    case "new_file":
      // Render summary for a newly read file
      if (attachment.content.type === "notebook") {
        return WC.default.createElement(aj, {
          text: `Read ${FA.bold(j11(iA(), attachment.filename))} (${attachment.content.file.cells.length} cells)`
        });
      }
      return WC.default.createElement(aj, {
        text: `Read ${FA.bold(j11(iA(), attachment.filename))} (${attachment.content.type === "text" ? `${attachment.content.file.numLines}${attachment.truncated ? "+" : ""} lines` : `${FA.bold(formatFileSize(attachment.content.file.originalSize))}`})`
      });
    case "edited_text_file":
    case "edited_image_file":
      // No summary for edited files
      return null;
    case "selected_lines_in_ide":
      // Render summary for selected lines in IDE
      return WC.default.createElement(aj, {
        text: `⧉ Selected ${FA.bold(attachment.content.split(`\n`).length)} lines from ${FA.bold(j11(iA(), attachment.filename))} in ${attachment.ideName}`
      });
    case "nested_memory":
      // Render summary for nested memory
      return WC.default.createElement(aj, {
        text: FA.bold(j11(iA(), attachment.path))
      });
    case "queued_command":
      // Render summary for a queued command
      return WC.default.createElement(AH1, {
        addMargin: addMargin,
        param: {
          text: attachment.prompt,
          type: "text"
        },
        verbose: verbose
      });
    case "opened_file_in_ide":
    case "ultramemory":
    case "plan_mode":
      // No summary for these types
      return null;
    case "todo":
      // Render summary for todo list if context is post-compact
      if (attachment.context === "post-compact") {
        return WC.default.createElement(aj, {
          text: `Todo list read (${attachment.itemCount} ${attachment.itemCount === 1 ? "item" : "items"})`
        });
      }
      return null;
    case "diagnostics":
      // Render diagnostics summary
      return WC.default.createElement(F$2, {
        attachment: attachment,
        verbose: verbose
      });
    case "mcp_resource":
      // Render summary for MCP resource
      return WC.default.createElement(aj, {
        text: `Read MCP resource ${FA.bold(attachment.name)} from ${attachment.server}`
      });
    default:
      // Unknown type: return null
      return null;
  }
}

module.exports = renderAttachmentSummary;