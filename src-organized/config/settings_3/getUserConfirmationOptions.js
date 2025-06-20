/**
 * Returns a list of user confirmation options based on the current context and mode.
 *
 * @param {object|null} sourceObservable - The current observable or context object. If null, presents basic confirmation options.
 * @param {string} mode - The current mode of operation (e.g., 'edit', 'read'). Determines which set of options to present.
 * @param {object} subscription - Additional data or configuration relevant to the current operation.
 * @returns {Array<object>|any} An array of option objects for user confirmation, or the result of a delegated function for 'edit' mode.
 */
function getUserConfirmationOptions(sourceObservable, mode, subscription) {
  // If no context is provided, offer basic Yes/No options
  if (sourceObservable === null) {
    return [
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: `No, and tell Claude what to do differently (${FA.bold.ansi256(H4().secondaryText)("esc")})`,
        value: "no"
      }
    ];
  }

  switch (mode) {
    case "edit":
      // Delegate to getYesNoSessionOptions for edit mode, passing through the context and subscription
      return getYesNoSessionOptions(sourceObservable, subscription);
    case "read":
      // Provide extended options for read mode, including a 'don'processRuleBeginHandlers ask again' option
      return [
        {
          label: "Yes",
          value: "yes"
        },
        {
          label: `Yes, and add ${FA.bold(resolveDirectoryOrFallback(sourceObservable))} as a working directory for this session`,
          value: "yes-dont-ask-again"
        },
        {
          label: `No, and tell Claude what to do differently (${FA.bold.ansi256(H4().secondaryText)("esc")})`,
          value: "no"
        }
      ];
    default:
      // Optionally, handle other modes or throw if unexpected
      return undefined;
  }
}

module.exports = getUserConfirmationOptions;