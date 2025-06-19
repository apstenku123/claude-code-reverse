/**
 * Returns an array of confirmation option objects for a user prompt.
 * Optionally includes a 'don'processRuleBeginHandlers ask again' option based on the provided conditions.
 *
 * @param {any} userContext - The current user context or state relevant to the prompt.
 * @param {any} sessionConfig - Configuration or session data that may affect available options.
 * @returns {Array<{label: string, value: string}>} Array of option objects for the confirmation prompt.
 */
function getConfirmationOptions(userContext, sessionConfig) {
  // Determine if the 'don'processRuleBeginHandlers ask again' option should be included
  const dontAskAgainOption = nJ(userContext, sessionConfig)
    ? [{
        label: "Yes, and don'processRuleBeginHandlers ask again this session",
        value: "yes-dont-ask-again"
      }]
    : [];

  // Get the warning color for the 'No' option'createInteractionAccessor shortcut key
  const warningColor = getThemeStylesheet().warning;
  const escShortcut = FA.bold.hex(warningColor)("esc");

  // Build the full list of options
  return [
    {
      label: "Yes",
      value: "yes"
    },
    ...dontAskAgainOption,
    {
      label: `No, and tell Claude what to do differently (${escShortcut})`,
      value: "no"
    }
  ];
}

module.exports = getConfirmationOptions;