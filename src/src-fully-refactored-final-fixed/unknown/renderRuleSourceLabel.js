/**
 * Renders a label indicating the source of a rule, styled with the secondary text color from the current theme.
 *
 * @param {Object} params - The function parameters.
 * @param {Object} params.rule - The rule object containing the source information.
 * @returns {React.ReactElement} a React element displaying the source of the rule.
 */
function renderRuleSourceLabel({ rule }) {
  // Retrieve the current theme'createInteractionAccessor stylesheet to access color definitions
  const themeStylesheet = getThemeStylesheet();

  // Extract the source property from the rule object
  const { source: ruleSource } = rule;

  // Format the source for display using the external getSettingsSourceLabel function
  const formattedSource = getSettingsSourceLabel(ruleSource);

  // Render the label with the appropriate color and formatted source
  return R2.createElement(
    _,
    { color: themeStylesheet.secondaryText },
    `From ${formattedSource}`
  );
}

module.exports = renderRuleSourceLabel;