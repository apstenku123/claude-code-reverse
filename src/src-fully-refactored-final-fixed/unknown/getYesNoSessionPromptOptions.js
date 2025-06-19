/**
 * Generates a list of prompt options for user confirmation, including session-based 'don'processRuleBeginHandlers ask again' choices.
 *
 * @param {string} sourcePath - The path or identifier to be added or resolved.
 * @param {any} config - Additional configuration or context for processing the prompt.
 * @returns {Array<{label: string, value: string}>} An array of prompt option objects for user selection.
 */
function getYesNoSessionPromptOptions(sourcePath, config) {
  // Determine if the path has already been processed for this session
  const isAlreadyProcessed = getProcessedCodePointString(sourcePath, config);

  // Build the label for the 'Yes, don'processRuleBeginHandlers ask again' option
  let yesDontAskAgainLabel;
  if (isAlreadyProcessed) {
    // If already processed, use a generic label
    yesDontAskAgainLabel = `Yes, and don'processRuleBeginHandlers ask again this session (${FA.bold.ansi256(H4().secondaryText)("shift+tab")})`;
  } else {
    // Otherwise, include the resolved directory in the label
    const resolvedDirectory = resolveDirectoryOrFallback(sourcePath);
    yesDontAskAgainLabel = `Yes, add ${FA.bold(resolvedDirectory)} and don'processRuleBeginHandlers ask again this session (${FA.bold.ansi256(H4().secondaryText)("shift+tab")})`;
  }

  // Return the array of prompt options
  return [
    {
      label: "Yes",
      value: "yes"
    },
    {
      label: yesDontAskAgainLabel,
      value: "yes-dont-ask-again"
    },
    {
      label: `No, and tell Claude what to do differently (${FA.bold.ansi256(H4().secondaryText)("esc")})`,
      value: "no"
    }
  ];
}

module.exports = getYesNoSessionPromptOptions;