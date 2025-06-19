/**
 * Displays a notice informing the user that their organization is enrolled in the Development Partner Program.
 * Notifies that Claude Code sessions are being shared with Anthropic for service improvement and model training.
 * Includes links to the Development Partner Program article and organization admin settings.
 *
 * @returns {React.ReactElement} a React element displaying the notice.
 */
function DevelopmentPartnerProgramNotice() {
  // Retrieve the current theme'createInteractionAccessor color palette
  const themeStyles = getThemeStylesheet();

  // Run side effect on mount (e.g., analytics or logging)
  At1.useEffect(() => {
    markInitialDataSharingMessageAsSeen();
  }, []);

  // Render the notice UI
  return p7.createElement(
    g, // Container component
    {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1,
      paddingTop: 1
    },
    p7.createElement(
      _, // Text component
      { color: themeStyles.text },
      "Your organization has enrolled in the",
      " ",
      p7.createElement(
        renderLinkOrText, // Link component
        {
          url: "https://support.anthropic.com/en/articles/11174108-about-the-development-partner-program"
        },
        "Development Partner Program"
      ),
      ". Your Claude Code sessions are being shared with Anthropic to improve our services including model training. Questions? Contact your account",
      " ",
      p7.createElement(
        renderLinkOrText, // Link component
        {
          url: "https://console.anthropic.com/settings/members"
        },
        "admin"
      ),
      "."
    )
  );
}

module.exports = DevelopmentPartnerProgramNotice;