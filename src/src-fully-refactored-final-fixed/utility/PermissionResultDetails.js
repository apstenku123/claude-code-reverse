/**
 * Renders detailed information about a permission result, including behavior, message, reason, and suggested rules.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.permissionResult - The permission result object to display.
 * @param {string} props.permissionResult.behavior - The behavior outcome (e.g., 'allow', 'deny').
 * @param {string} [props.permissionResult.message] - Optional message explaining the behavior.
 * @param {string} [props.permissionResult.decisionReason] - Optional reason for the decision.
 * @param {Array} [props.permissionResult.ruleSuggestions] - Optional array of suggested rules.
 * @returns {React.ReactElement} The rendered permission result details.
 */
function PermissionResultDetails({ permissionResult }) {
  const {
    behavior,
    message,
    decisionReason,
    ruleSuggestions
  } = permissionResult;

  // Only show rule suggestions if behavior is not 'allow'
  const suggestions = behavior !== "allow" ? ruleSuggestions : undefined;

  // Minimum width for label columns
  const minLabelWidth = 10;

  return G8.default.createElement(g, { flexDirection: "column" },
    // Behavior row
    G8.default.createElement(g, { flexDirection: "row" },
      G8.default.createElement(g, { justifyContent: "flex-end", minWidth: minLabelWidth },
        G8.default.createElement(_, { dimColor: true }, "Behavior ")
      ),
      G8.default.createElement(_, null, behavior)
    ),

    // Message row (only if behavior is not 'allow')
    behavior !== "allow" && G8.default.createElement(g, { flexDirection: "row" },
      G8.default.createElement(g, { justifyContent: "flex-end", minWidth: minLabelWidth },
        G8.default.createElement(_, { dimColor: true }, "Message ")
      ),
      G8.default.createElement(_, null, message)
    ),

    // Reason row
    G8.default.createElement(g, { flexDirection: "row" },
      G8.default.createElement(g, { justifyContent: "flex-end", minWidth: minLabelWidth },
        G8.default.createElement(_, { dimColor: true }, "Reason ")
      ),
      decisionReason === undefined
        ? G8.default.createElement(_, null, "undefined")
        : G8.default.createElement(renderDecisionReasonDetails, { decisionReason })
    ),

    // Suggested rules row
    G8.default.createElement(g, { flexDirection: "row" },
      G8.default.createElement(g, {
        flexDirection: "column",
        alignItems: "flex-end",
        minWidth: minLabelWidth
      },
        G8.default.createElement(_, { dimColor: true }, "Suggested "),
        G8.default.createElement(_, { dimColor: true }, "rules ")
      ),
      // If no suggestions, show 'None', else map each suggestion
      !suggestions || suggestions.length === 0
        ? G8.default.createElement(_, null, "None")
        : suggestions.map((suggestion, index) =>
            G8.default.createElement(_, { key: index }, y0.bullet, " ", formatToolNameWithRule(suggestion))
          )
    )
  );
}

module.exports = PermissionResultDetails;