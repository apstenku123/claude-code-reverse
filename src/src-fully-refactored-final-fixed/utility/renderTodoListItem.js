/**
 * Renders a todo list item with status, priority, and content, supporting visual cues for status changes and verbosity.
 *
 * @param {Object} params - The parameters for rendering the todo item.
 * @param {Object} params.todo - The todo item object.
 * @param {string} params.todo.status - The current status of the todo (e.g., 'completed', 'in_progress').
 * @param {string} params.todo.priority - The priority level of the todo ('high', 'medium', 'low').
 * @param {string} params.todo.content - The content or description of the todo item.
 * @param {boolean} [params.isCurrent=false] - Whether this todo is the current/active item.
 * @param {string} params.previousStatus - The previous status of the todo item.
 * @param {boolean} params.verbose - Whether to show verbose details (e.g., priority info).
 * @returns {React.Element} The rendered todo list item as a React element.
 */
function renderTodoListItem({
  todo: {
    status: currentStatus,
    priority: priorityLevel,
    content: todoContent
  },
  isCurrent = false,
  previousStatus,
  verbose
}) {
  // Determine highlight color based on status transition
  let highlightColor;
  if (previousStatus !== "completed" && currentStatus === "completed") {
    highlightColor = getThemeStylesheet().success;
  } else if (previousStatus !== "in_progress" && currentStatus === "in_progress") {
    highlightColor = getThemeStylesheet().suggestion;
  } else {
    highlightColor = undefined;
  }

  // Render the todo item row
  return PF.createElement(
    g,
    { flexDirection: "row" },
    // Checkbox/status icon
    PF.createElement(
      g,
      { minWidth: 2 },
      PF.createElement(
        _,
        {
          color: highlightColor,
          bold: isCurrent
        },
        currentStatus === "completed" ? y0.checkboxOn : y0.checkboxOff,
        " "
      )
    ),
    // Content and optional priority
    PF.createElement(
      g,
      null,
      PF.createElement(
        _,
        {
          bold: isCurrent,
          color: highlightColor,
          strikethrough: currentStatus === "completed"
        },
        todoContent
      ),
      verbose &&
        PF.createElement(
          _,
          { dimColor: true },
          " ",
          "(initializeSyntaxHighlighting",
          priorityLevel === "high"
            ? "0"
            : priorityLevel === "medium"
            ? "1"
            : "2",
          ")"
        )
    )
  );
}

module.exports = renderTodoListItem;