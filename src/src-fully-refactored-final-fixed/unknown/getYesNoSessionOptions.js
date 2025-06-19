/**
 * Generates a list of confirmation options for a CLI prompt, including session persistence choices.
 *
 * @param {string} sourcePath - The path or identifier being considered for addition.
 * @param {object} promptConfig - Configuration object for the prompt context.
 * @returns {Array<{label: string, value: string}>} Array of option objects for the prompt.
 */
function getYesNoSessionOptions(sourcePath, promptConfig) {
  // Determine if the sourcePath is already handled (e.g., already added)
  const isAlreadyAdded = nJ(sourcePath, promptConfig);

  // Build the label for the 'Yes, don'processRuleBeginHandlers ask again' option
  let yesDontAskAgainLabel;
  if (isAlreadyAdded) {
    // If already added, use a generic label
    yesDontAskAgainLabel = `Yes, and don'processRuleBeginHandlers ask again this session (${FA.bold.ansi256(H4().secondaryText)("shift+tab")})`;
  } else {
    // If not added, specify what will be added
    const resolvedDirectory = resolveDirectoryOrFallback(sourcePath); // e.g., resolveDirectoryOrFallback
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

module.exports = getYesNoSessionOptions;