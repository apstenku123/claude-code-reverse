/**
 * Renders detailed information about a permission result, including behavior, message, reason, and suggested rules.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.permissionResult - The permission result object containing behavior, message, decisionReason, and ruleSuggestions.
 * @returns {React.ReactElement} The rendered React element displaying permission result details.
 */
function renderPermissionResultDetails({ permissionResult }) {
  // Extract relevant fields from the permissionResult object
  const {
    behavior,
    message,
    decisionReason,
    ruleSuggestions
  } = permissionResult;

  // Only show rule suggestions if behavior is not 'allow'
  const suggestions = behavior !== "allow" ? ruleSuggestions : undefined;

  // Render the main container with column direction
  return G8.default.createElement(g, { flexDirection: "column" },
    // Row for Behavior
    G8.default.createElement(g, { flexDirection: "row" },
      G8.default.createElement(g, { justifyContent: "flex-end", minWidth: 10 },
        G8.default.createElement(_, { dimColor: true }, "Behavior ")
      ),
      G8.default.createElement(_, null, behavior)
    ),
    // Row for Message (only if behavior is not 'allow')
    behavior !== "allow" && G8.default.createElement(g, { flexDirection: "row" },
      G8.default.createElement(g, { justifyContent: "flex-end", minWidth: 10 },
        G8.default.createElement(_, { dimColor: true }, "Message ")
      ),
      G8.default.createElement(_, null, message)
    ),
    // Row for Reason
    G8.default.createElement(g, { flexDirection: "row" },
      G8.default.createElement(g, { justifyContent: "flex-end", minWidth: 10 },
        G8.default.createElement(_, { dimColor: true }, "Reason ")
      ),
      // If decisionReason is undefined, display 'undefined', else use renderDecisionReasonDetails component
      decisionReason === undefined
        ? G8.default.createElement(_, null, "undefined")
        : G8.default.createElement(renderDecisionReasonDetails, { decisionReason })
    ),
    // Row for Suggested Rules
    G8.default.createElement(g, { flexDirection: "row" },
      G8.default.createElement(g, {
        flexDirection: "column",
        alignItems: "flex-end",
        minWidth: 10
      },
        G8.default.createElement(_, { dimColor: true }, "Suggested "),
        G8.default.createElement(_, { dimColor: true }, "rules ")
      ),
      // If no suggestions, display 'None', else map each suggestion
      !suggestions || suggestions.length === 0
        ? G8.default.createElement(_, null, "None")
        : suggestions.map((suggestion, index) =>
            G8.default.createElement(_, { key: index }, y0.bullet, " ", formatToolNameWithRule(suggestion))
          )
    )
  );
}

module.exports = renderPermissionResultDetails;