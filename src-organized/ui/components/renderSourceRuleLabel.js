/**
 * Renders a label indicating the source of a given rule, styled with the secondary text color from the current theme.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.rule - The rule object containing the source information.
 * @returns {React.ReactElement} a React element displaying the source label.
 */
function renderSourceRuleLabel({ rule }) {
  // Get the current theme'createInteractionAccessor stylesheet to access color definitions
  const themeStylesheet = getThemeStylesheet();

  // Format the source information using the external getSettingsSourceLabel function
  const formattedSource = getSettingsSourceLabel(rule.source);

  // Render the label with the secondary text color
  return R2.createElement(
    _,
    { color: themeStylesheet.secondaryText },
    `From ${formattedSource}`
  );
}

module.exports = renderSourceRuleLabel;