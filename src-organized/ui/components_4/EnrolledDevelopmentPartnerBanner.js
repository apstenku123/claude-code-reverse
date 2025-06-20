/**
 * Displays a banner indicating enrollment in the Development Partner Program.
 *
 * This component uses a theme-aware color scheme and includes a link to the program'createInteractionAccessor support article.
 *
 * @returns {React.ReactElement} a styled banner React element.
 */
function EnrolledDevelopmentPartnerBanner() {
  // Retrieve the current theme'createInteractionAccessor color palette
  const themeStylesheet = getThemeStylesheet();

  // Run side effect on mount (possibly for analytics or state tracking)
  At1.useEffect(() => {
    wK1 = true; // Set global flag or trigger side effect
  }, []);

  // Render the banner with appropriate styling and content
  return p7.createElement(
    g, // Presumed to be a layout or Box component
    {
      flexDirection: "column",
      gap: 1,
      paddingLeft: 1,
      paddingTop: 1
    },
    p7.createElement(
      _, // Presumed to be a Text or Typography component
      { color: themeStylesheet.text },
      "Enrolled in",
      " ",
      p7.createElement(
        renderLinkOrText, // Presumed to be a Link component
        {
          url: "https://support.anthropic.com/en/articles/11174108-about-the-development-partner-program"
        },
        "Development Partner Program"
      )
    )
  );
}

module.exports = EnrolledDevelopmentPartnerBanner;