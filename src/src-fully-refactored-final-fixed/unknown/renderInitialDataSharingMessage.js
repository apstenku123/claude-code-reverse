/**
 * Renders the appropriate data sharing message component based on whether the initial message has been seen.
 *
 * @returns {React.ReactElement} The React element to display: either the message seen component or the message prompt component.
 */
function renderInitialDataSharingMessage() {
  // Retrieve the current configuration, which includes whether the initial data sharing message has been seen
  const config = getCachedOrFreshConfig();

  // If the initial data sharing message has been seen, render the corresponding component; otherwise, render the prompt
  if (config.initialDataSharingMessageSeen) {
    return p7.createElement(DataSharingMessageSeenComponent, null);
  } else {
    return p7.createElement(DataSharingPromptComponent, null);
  }
}

module.exports = renderInitialDataSharingMessage;