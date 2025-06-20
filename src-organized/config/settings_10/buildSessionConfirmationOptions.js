/**
 * Builds an array of confirmation option objects for a session prompt.
 *
 * Depending on the result of getProcessedCodePointString, includes an extra option to not ask again in this session.
 *
 * @param {any} sourceObservable - The source observable or value to check for session state.
 * @param {any} config - Configuration or context used in the session check.
 * @returns {Array<Object>} Array of option objects for the confirmation prompt.
 */
function buildSessionConfirmationOptions(sourceObservable, config) {
  // Determine if the 'don'processRuleBeginHandlers ask again' option should be included
  const includeDontAskAgainOption = getProcessedCodePointString(sourceObservable, config)
    ? [{
        label: "Yes, and don'processRuleBeginHandlers ask again this session",
        value: "yes-dont-ask-again"
      }]
    : [];

  // Build the full list of options
  return [
    {
      label: "Yes",
      value: "yes"
    },
    ...includeDontAskAgainOption,
    {
      label: `No, and tell Claude what to do differently (${getThemeStylesheet().warning.bold.hex("esc")})`,
      value: "no"
    }
  ];
}

module.exports = buildSessionConfirmationOptions;