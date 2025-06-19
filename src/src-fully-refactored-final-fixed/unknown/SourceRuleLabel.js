/**
 * Renders a label indicating the source of a given rule, styled with the secondary text color from the current theme.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.rule - The rule object containing a source property.
 * @returns {React.ReactElement} a React element displaying the source label.
 */
function SourceRuleLabel({ rule }) {
  // Retrieve the current theme'createInteractionAccessor stylesheet to access color definitions
  const themeStyles = getThemeStylesheet();

  // Format the source information using the getSettingsSourceLabel utility
  const formattedSource = getSettingsSourceLabel(rule.source);

  // Render the label with appropriate styling
  return R2.createElement(
    _,
    { color: themeStyles.secondaryText },
    `From ${formattedSource}`
  );
}

module.exports = SourceRuleLabel;