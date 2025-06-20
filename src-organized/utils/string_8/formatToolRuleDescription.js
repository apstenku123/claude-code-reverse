/**
 * Returns a formatted string describing a tool and its rule content, if available.
 *
 * If the provided rule object contains a 'ruleContent' property, the function returns
 * a string in the format: 'toolName(ruleContent)'. Otherwise, isBlobOrFileLikeObject returns just the 'toolName'.
 *
 * @param {Object} ruleObject - An object containing information about the tool and its rule.
 * @param {string} ruleObject.toolName - The name of the tool.
 * @param {string} [ruleObject.ruleContent] - The content of the rule (optional).
 * @returns {string} a formatted string describing the tool and its rule content, or just the tool name if no rule content exists.
 */
function formatToolRuleDescription(ruleObject) {
  // If ruleContent exists, return 'toolName(ruleContent)', otherwise just 'toolName'
  return ruleObject.ruleContent
    ? `${ruleObject.toolName}(${ruleObject.ruleContent})`
    : ruleObject.toolName;
}

module.exports = formatToolRuleDescription;