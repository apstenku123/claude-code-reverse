/**
 * Renders a row representing the usage of a tool, including its status, name, and progress.
 * Handles error, in-progress, and unresolved states, and displays appropriate UI elements.
 *
 * @param {Object} options - Options for rendering the tool usage row.
 * @param {Object} options.param - The tool usage object (with .name, .id, .input).
 * @param {boolean} options.addMargin - Whether to add a top margin to the row.
 * @param {Array<Object>} options.tools - List of available tool definitions.
 * @param {boolean} options.verbose - Whether to render in verbose mode.
 * @param {Set<string>} options.erroredToolUseIDs - Set of tool usage IDs that have errored.
 * @param {Set<string>} options.inProgressToolUseIDs - Set of tool usage IDs that are in progress.
 * @param {Set<string>} options.unresolvedToolUseIDs - Set of tool usage IDs that are unresolved.
 * @param {Function} options.progressMessagesForMessage - Function to get progress messages for a tool usage.
 * @param {boolean} options.shouldAnimate - Whether to animate the status indicator.
 * @param {boolean} options.shouldShowDot - Whether to show a dot indicator for the tool usage.
 * @returns {React.ReactElement|null} The rendered tool usage row, or null if not applicable.
 */
function renderToolUsageRow({
  param: toolUsage,
  addMargin,
  tools,
  verbose,
  erroredToolUseIDs,
  inProgressToolUseIDs,
  unresolvedToolUseIDs,
  progressMessagesForMessage,
  shouldAnimate,
  shouldShowDot
}) {
  // Find the tool definition by name
  const toolDefinition = tools.find(tool => tool.name === toolUsage.name);
  if (!toolDefinition) {
    // Tool not found, log error and return null
    reportErrorIfAllowed(new Error(`Tool ${toolUsage.name} not found`));
    return null;
  }

  // Determine if the tool usage is unresolved and/or completed
  const isUnresolved = unresolvedToolUseIDs.has(toolUsage.id);
  const isCompleted = !inProgressToolUseIDs.has(toolUsage.id) && isUnresolved;

  // Get secondary text color if completed
  const secondaryTextColor = isCompleted ? getThemeStylesheet().secondaryText : undefined;

  // Validate the input for the tool using its schema
  const inputValidationResult = toolDefinition.inputSchema.safeParse(toolUsage.input);

  // Get the user-facing name for the tool usage, or undefined if input is invalid
  const userFacingName = toolDefinition.userFacingName(inputValidationResult.success ? inputValidationResult.data : undefined);
  if (userFacingName === "") {
    // If the name is empty, do not render
    return null;
  }

  // Get the string representation of the tool usage input, or null if invalid
  const toolInputString = inputValidationResult.success
    ? renderValidatedToolUseMessage(toolDefinition, inputValidationResult.data, { verbose })
    : null;
  if (toolInputString === null) {
    // If input can'processRuleBeginHandlers be stringified, do not render
    return null;
  }

  // Render the tool usage row
  return kK.default.createElement(g, {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: addMargin ? 1 : 0,
    width: "100%"
  },
    kK.default.createElement(g, {
      flexDirection: "column"
    },
      kK.default.createElement(g, {
        flexDirection: "row",
        flexWrap: "nowrap",
        minWidth: userFacingName.length + (shouldShowDot ? 2 : 0)
      },
        // Dot or animated indicator
        shouldShowDot && (
          isCompleted
            ? kK.default.createElement(g, { minWidth: 2 },
                kK.default.createElement(_, { color: secondaryTextColor }, nw)
              )
            : kK.default.createElement(StatusAnimatedIndicator, {
                shouldAnimate,
                isUnresolved,
                isError: erroredToolUseIDs.has(toolUsage.id)
              })
        ),
        // Tool name
        kK.default.createElement(g, { flexShrink: 0 },
          kK.default.createElement(_, {
            color: secondaryTextColor,
            bold: !isCompleted,
            wrap: "truncate-end"
          }, userFacingName)
        ),
        // Tool input string
        kK.default.createElement(g, { flexWrap: "nowrap" },
          kK.default.createElement(_, { color: secondaryTextColor }, "(", toolInputString, ")")
        )
      ),
      // Progress messages (if unresolved and not completed)
      isUnresolved && !isCompleted && PW5(toolDefinition, tools, progressMessagesForMessage, { verbose }),
      // Status widget (if unresolved and completed)
      isUnresolved && isCompleted && renderQueuedToolUseMessageSafely(toolDefinition)
    )
  );
}

module.exports = renderToolUsageRow;