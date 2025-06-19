/**
 * Generates confirmation options for tool usage based on permission results and rule suggestions.
 *
 * @param {Object} params - The input parameters object.
 * @param {Object} params.toolUseConfirm - The tool use confirmation context.
 * @param {Object} params.toolUseConfirm.permissionResult - The result of the permission check.
 * @param {string} params.toolUseConfirm.permissionResult.behavior - The permission behavior (e.g., 'allow', 'deny').
 * @param {Array} [params.toolUseConfirm.permissionResult.ruleSuggestions] - Optional rule suggestions if permission is not 'allow'.
 * @returns {Array<Object>} An array of option objects for tool use confirmation.
 */
function getToolUseConfirmationOptions({ toolUseConfirm }) {
  const { permissionResult } = toolUseConfirm;
  let additionalOptions = [];

  // If the behavior is not 'allow' and there are rule suggestions, add a 'don'processRuleBeginHandlers ask again' option
  const ruleSuggestions = permissionResult.behavior !== "allow"
    ? permissionResult.ruleSuggestions
    : undefined;

  if (ruleSuggestions && ruleSuggestions.length > 0) {
    // oW5 processes the rule suggestions and returns a prefix or identifier
    const commandPrefix = oW5(ruleSuggestions);
    // getSimilarityOrConfig formats the prefix for display
    // FA.bold and C4 are used for bolding and context name
    additionalOptions = [{
      label: `Yes, and don'processRuleBeginHandlers ask again for ${getSimilarityOrConfig(commandPrefix)} commands in ${FA.bold(C4())}`,
      value: "yes-dont-ask-again-prefix"
    }];
  }

  // Always include 'Yes' and 'No' options, and spread any additional options
  return [
    {
      label: "Yes",
      value: "yes"
    },
    ...additionalOptions,
    {
      label: `No, and tell Claude what to do differently (${FA.bold.ansi256(H4().secondaryText)("esc")})`,
      value: "no"
    }
  ];
}

module.exports = getToolUseConfirmationOptions;