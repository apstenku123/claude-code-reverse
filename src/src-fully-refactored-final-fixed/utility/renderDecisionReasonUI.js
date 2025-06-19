/**
 * Renders a UI component displaying the decision reason(createInteractionAccessor) for a given security event or rule.
 * Handles both single decision reasons and lists of subcommand results, including suggested rules and descriptions.
 *
 * @param {Object} params - The parameters object.
 * @param {string} [params.title] - Optional title to display at the top of the component.
 * @param {Object} params.decisionReason - The decision reason object, which may be a single reason or a subcommandResults object.
 * @returns {React.ReactElement} The rendered UI component displaying the decision reason(createInteractionAccessor).
 */
function renderDecisionReasonUI({
  title,
  decisionReason
}) {
  // Retrieve the current color palette for rendering status icons
  const colorPalette = H4();

  /**
   * Renders the decision reason(createInteractionAccessor) based on their type.
   * Handles both 'subcommandResults' (multiple reasons) and other types (single reason).
   * @returns {React.ReactElement}
   */
  function renderReasonContent() {
    switch (decisionReason.type) {
      case "subcommandResults": {
        // Render a list of subcommand results with their status, description, and suggestions
        return G8.default.createElement(
          g,
          { flexDirection: "column" },
          Array.from(decisionReason.reasons.entries()).map(([reasonKey, reasonValue]) => {
            // Determine the status icon (tick or cross) based on behavior
            const statusIcon = reasonValue.behavior === "allow"
              ? FA.ansi256(colorPalette.success)(y0.tick)
              : FA.ansi256(colorPalette.error)(y0.cross);

            return G8.default.createElement(
              g,
              { flexDirection: "column", key: reasonKey },
              // Render the status icon and the reason key
              G8.default.createElement(_, null, statusIcon, " ", reasonKey),
              // If there is a nested decision reason (not of type 'subcommandResults'), render its description
              reasonValue.decisionReason !== undefined &&
                reasonValue.decisionReason.type !== "subcommandResults" &&
                G8.default.createElement(
                  _,
                  null,
                  "  ",
                  "⎿",
                  "  ",
                  getSecurityRuleDescription(reasonValue.decisionReason)
                ),
              // If the behavior is not 'allow' and there are rule suggestions, render them
              reasonValue.behavior !== "allow" &&
                reasonValue.ruleSuggestions &&
                G8.default.createElement(
                  _,
                  null,
                  "  ",
                  "⎿",
                  "  ",
                  "Suggested rules:",
                  " ",
                  reasonValue.ruleSuggestions
                    .map(suggestion => FA.bold(formatToolNameWithRule(suggestion)))
                    .join(", ")
                )
            );
          })
        );
      }
      default:
        // For all other types, render the description of the decision reason
        return G8.default.createElement(_, null, getSecurityRuleDescription(decisionReason));
    }
  }

  // Render the main container with optional title and the reason content
  return G8.default.createElement(
    g,
    { flexDirection: "column" },
    title && G8.default.createElement(_, null, title),
    renderReasonContent()
  );
}

module.exports = renderDecisionReasonUI;