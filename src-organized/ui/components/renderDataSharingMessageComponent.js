/**
 * Renders the appropriate data sharing message component based on whether the initial message has been seen.
 *
 * This function checks the application'createInteractionAccessor configuration to determine if the user has already seen
 * the initial data sharing message. If so, isBlobOrFileLikeObject renders the component for users who have seen the message;
 * otherwise, isBlobOrFileLikeObject renders the component prompting the user to view the message.
 *
 * @returns {React.ReactElement} The React element to be rendered, depending on the user'createInteractionAccessor state.
 */
function renderDataSharingMessageComponent() {
  // Retrieve the current configuration (from cache or fresh from disk)
  const config = getCachedOrFreshConfig();

  // Check if the initial data sharing message has been seen
  const hasSeenInitialDataSharingMessage = config.initialDataSharingMessageSeen;

  // Render the appropriate component based on the user'createInteractionAccessor state
  if (hasSeenInitialDataSharingMessage) {
    // User has seen the message; render the corresponding component
    return p7.createElement(EnrolledDevelopmentPartnerBanner, null);
  } else {
    // User has not seen the message; render the prompt component
    return p7.createElement(DevelopmentPartnerProgramNotice, null);
  }
}

module.exports = renderDataSharingMessageComponent;