/**
 * Renders a human-readable description for a given rule, based on its tool name and content.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.ruleValue - The rule value object containing toolName and ruleContent.
 * @param {string} params.ruleValue.toolName - The name of the tool the rule applies to.
 * @param {string} [params.ruleValue.ruleContent] - The specific content or pattern of the rule (optional).
 * @returns {React.ReactNode|null} a React element describing the rule, or null if not applicable.
 */
function renderRuleDescription({ ruleValue }) {
  const themeStyles = getThemeStylesheet(); // getThemeStylesheet
  const isBashTool = ruleValue.toolName === P4.name;
  const hasRuleContent = Boolean(ruleValue.ruleContent);

  // Handle Bash tool rules
  if (isBashTool) {
    if (hasRuleContent) {
      // If the rule content ends with ':*', describe any Bash command starting with the given prefix
      if (ruleValue.ruleContent.endsWith(":*")) {
        const commandPrefix = ruleValue.ruleContent.slice(0, -2);
        return nD.createElement(
          _,
          { color: themeStyles.secondaryText },
          "Any Bash command starting with",
          " ",
          nD.createElement(_, { bold: true }, commandPrefix)
        );
      } else {
        // Otherwise, describe the specific Bash command
        return nD.createElement(
          _,
          { color: themeStyles.secondaryText },
          "The Bash command ",
          nD.createElement(_, { bold: true }, ruleValue.ruleContent)
        );
      }
    } else {
      // No rule content: describe any Bash command
      return nD.createElement(
        _,
        { color: themeStyles.secondaryText },
        "Any Bash command"
      );
    }
  }

  // Handle non-Bash tool rules
  if (!hasRuleContent) {
    return nD.createElement(
      _,
      { color: themeStyles.secondaryText },
      "Any use of the ",
      nD.createElement(_, { bold: true }, ruleValue.toolName),
      " tool"
    );
  }

  // If ruleContent exists for a non-Bash tool, render nothing
  return null;
}

module.exports = renderRuleDescription;