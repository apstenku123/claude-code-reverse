/**
 * Renders a detailed React element describing the decision reason for a security rule or subcommand.
 * Handles both simple and nested (subcommandResults) decision reasons, including rule suggestions and descriptions.
 *
 * @param {Object} params - The parameters for rendering.
 * @param {string} [params.title] - Optional title to display at the top.
 * @param {Object} params.decisionReason - The decision reason object to render. Can be a simple reason or a subcommandResults object.
 * @returns {React.ReactElement} a React element representing the decision reason details.
 */
function renderDecisionReasonDetails({
  title,
  decisionReason
}) {
  // Get the current theme colors (success, error, etc.)
  const themeColors = H4();

  /**
   * Renders the main content based on the type of decision reason.
   * Handles both 'subcommandResults' and default cases.
   * @returns {React.ReactElement}
   */
  function renderContent() {
    switch (decisionReason.type) {
      case "subcommandResults": {
        // Render a list of subcommand results with their statuses and details
        return G8.default.createElement(
          g,
          { flexDirection: "column" },
          Array.from(decisionReason.reasons.entries()).map(([subcommandName, subcommandResult]) => {
            // Determine icon (tick/cross) based on behavior
            const icon = subcommandResult.behavior === "allow"
              ? FA.ansi256(themeColors.success)(y0.tick)
              : FA.ansi256(themeColors.error)(y0.cross);

            return G8.default.createElement(
              g,
              { flexDirection: "column", key: subcommandName },
              // Row: icon and subcommand name
              G8.default.createElement(_, null, icon, " ", subcommandName),

              // If there is a nested decision reason (not of type 'subcommandResults'), render its description
              subcommandResult.decisionReason !== undefined &&
                subcommandResult.decisionReason.type !== "subcommandResults" &&
                G8.default.createElement(
                  _,
                  null,
                  "  ", "⎿", "  ", getSecurityRuleDescription(subcommandResult.decisionReason)
                ),

              // If behavior is not 'allow' and there are rule suggestions, render them
              subcommandResult.behavior !== "allow" &&
                subcommandResult.ruleSuggestions &&
                G8.default.createElement(
                  _,
                  null,
                  "  ", "⎿", "  ",
                  "Suggested rules:", " ",
                  subcommandResult.ruleSuggestions
                    .map(suggestion => FA.bold(formatToolNameWithRule(suggestion)))
                    .join(", ")
                )
            );
          })
        );
      }
      default:
        // For all other types, just render the description
        return G8.default.createElement(_, null, getSecurityRuleDescription(decisionReason));
    }
  }

  // Render the container with optional title and the main content
  return G8.default.createElement(
    g,
    { flexDirection: "column" },
    title && G8.default.createElement(_, null, title),
    renderContent()
  );
}

module.exports = renderDecisionReasonDetails;
