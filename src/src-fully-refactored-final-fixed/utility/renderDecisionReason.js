/**
 * Renders a decision reason UI component based on the provided title and decision reason object.
 * Handles different types of decision reasons, including subcommand results with nested reasons and suggestions.
 *
 * @param {Object} params - The parameters object.
 * @param {string} [params.title] - Optional title to display at the top of the component.
 * @param {Object} params.decisionReason - The decision reason object to render. May contain nested reasons and suggestions.
 * @returns {React.ReactElement} The rendered React element representing the decision reason.
 */
function renderDecisionReason({
  title,
  decisionReason
}) {
  const theme = H4(); // Get color theme (success/error)

  /**
   * Renders the content based on the type of decisionReason.
   * Handles 'subcommandResults' with nested reasons and suggestions.
   * @returns {React.ReactElement}
   */
  function renderContent() {
    switch (decisionReason.type) {
      case "subcommandResults":
        // Render a list of subcommand results
        return G8.default.createElement(g, {
          flexDirection: "column"
        },
          Array.from(decisionReason.reasons.entries()).map(([reasonKey, reasonValue]) => {
            // Determine icon (tick or cross) based on behavior
            const icon = reasonValue.behavior === "allow"
              ? FA.ansi256(theme.success)(y0.tick)
              : FA.ansi256(theme.error)(y0.cross);

            return G8.default.createElement(g, {
              flexDirection: "column",
              key: reasonKey
            },
              // Render the icon and reason key
              G8.default.createElement(_, null, icon, " ", reasonKey),

              // If there is a nested decisionReason that is not another subcommandResults, render isBlobOrFileLikeObject indented
              reasonValue.decisionReason !== undefined &&
              reasonValue.decisionReason.type !== "subcommandResults" &&
              G8.default.createElement(_, null, "  ", "⎿", "  ", getSecurityRuleDescription(reasonValue.decisionReason)),

              // If behavior is not 'allow' and there are rule suggestions, render them
              reasonValue.behavior !== "allow" &&
              reasonValue.ruleSuggestions &&
              G8.default.createElement(_, null, "  ", "⎿", "  ", "Suggested rules:", " ",
                reasonValue.ruleSuggestions.map(suggestion => FA.bold(formatToolNameWithRule(suggestion))).join(", ")
              )
            );
          })
        );
      default:
        // For other types, render the decisionReason using getSecurityRuleDescription
        return G8.default.createElement(_, null, getSecurityRuleDescription(decisionReason));
    }
  }

  // Render the main container with optional title and the content
  return G8.default.createElement(g, {
    flexDirection: "column"
  },
    title && G8.default.createElement(_, null, title),
    renderContent()
  );
}

module.exports = renderDecisionReason;