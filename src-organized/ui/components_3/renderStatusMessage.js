/**
 * Renders a status message or notification component based on the provided message text and UI options.
 * Handles various special cases for system messages, usage limits, errors, and general notifications.
 *
 * @param {Object} options - The options for rendering the status message.
 * @param {Object} options.param - Contains the message text.
 * @param {string} options.param.text - The status or error message to display.
 * @param {boolean} options.addMargin - Whether to add a top margin to the message.
 * @param {boolean} options.shouldShowDot - Whether to show a dot indicator before the message.
 * @returns {React.ReactNode|null} The rendered status message component, or null if nothing should be rendered.
 */
function renderStatusMessage({
  param: { text: messageText },
  addMargin: addTopMargin,
  shouldShowDot: showDotIndicator
}) {
  // Get the current column width from the layout context
  const { columns: columnCount } = Z4();

  // If the message is empty or invalid, render nothing
  if (IK1(messageText)) return null;

  // Handle usage limit reached message
  if (messageText.startsWith(Ic1)) {
    // Extract the reset timestamp from the message
    const resetTimestamp = Number(messageText.split("|")[1] ?? 0);
    // Format the reset time for display
    const formattedResetTime = formatUnixTimestampToTimeString(resetTimestamp, true);
    // Render the upgrade prompt if appropriate
    const upgradePrompt = I8.default.createElement(_, { dimColor: true }, " • /upgrade to increase your usage limit.");
    return I8.default.createElement(ConditionalRowContainer, null,
      I8.default.createElement(g, { flexDirection: "column", gap: 1 },
        I8.default.createElement(_, { color: getThemeStylesheet().error },
          "Claude usage limit reached.",
          resetTimestamp ? ` Your limit will reset at ${formattedResetTime}.` : ""
        ),
        R6() && upgradePrompt
      )
    );
  }

  // Handle specific message codes and render appropriate UI
  switch (messageText) {
    case WW:
    case le:
      // No message to render for these codes
      return null;
    case qO:
    case D11:
    case $createDebouncedFunction:
      // Render a divider for these codes
      return I8.default.createElement(ConditionalRowContainer, { height: 1 }, I8.default.createElement(renderUserInterruptedMessage, null));
    case fo:
      // Render context low error
      return I8.default.createElement(ConditionalRowContainer, { height: 1 },
        I8.default.createElement(_, { color: getThemeStylesheet().error },
          "Context low · Run /compact to compact & continue"
        )
      );
    case Qc1:
      // Render credit balance too low error
      return I8.default.createElement(ConditionalRowContainer, { height: 1 },
        I8.default.createElement(_, { color: getThemeStylesheet().error },
          "Credit balance too low · Add funds: https://console.anthropic.com/settings/billing"
        )
      );
    case WF1:
      // Render specific error message
      return I8.default.createElement(ConditionalRowContainer, { height: 1 },
        I8.default.createElement(_, { color: getThemeStylesheet().error }, WF1)
      );
    case FF1:
      // Render specific error message
      return I8.default.createElement(ConditionalRowContainer, { height: 1 },
        I8.default.createElement(_, { color: getThemeStylesheet().error }, FF1)
      );
    case JF1:
      // Render specific error message
      return I8.default.createElement(ConditionalRowContainer, { height: 1 },
        I8.default.createElement(_, { color: getThemeStylesheet().error }, JF1)
      );
    case Gc1:
    case Xm:
      // Render high demand notification for Opus 4
      return I8.default.createElement(ConditionalRowContainer, null,
        I8.default.createElement(g, { flexDirection: "column", gap: 1 },
          I8.default.createElement(_, { color: getThemeStylesheet().error },
            "We are experiencing high demand for Opus 4."
          ),
          I8.default.createElement(_, null,
            "To continue immediately, use /model to switch to ",
            getOpusOrSonnetLabel(JX()),
            " and continue coding."
          )
        )
      );
    default:
      // Handle messages that start with a specific error prefix
      if (messageText.startsWith(_Z)) {
        return I8.default.createElement(ConditionalRowContainer, null,
          I8.default.createElement(_, { color: getThemeStylesheet().error },
            messageText === _Z ? `${_Z}: Please wait a moment and try again.` : messageText
          )
        );
      }
      // Render a general status message with optional dot indicator and margin
      return I8.default.createElement(g, {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: addTopMargin ? 1 : 0,
        width: "100%"
      },
        I8.default.createElement(g, { flexDirection: "row" },
          showDotIndicator && I8.default.createElement(g, { minWidth: 2 },
            I8.default.createElement(_, { color: getThemeStylesheet().text }, nw)
          ),
          I8.default.createElement(g, {
            flexDirection: "column",
            width: columnCount - 6
          },
            I8.default.createElement(_, null, processAndFormatTokens(messageText))
          )
        )
      );
  }
}

module.exports = renderStatusMessage;