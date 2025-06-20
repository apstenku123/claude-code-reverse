/**
 * Displays a notification banner informing the user that they can now use their Claude subscription.
 * Also logs an analytics event when the banner is shown.
 *
 * @returns {React.ReactElement} The rendered subscription notice banner component.
 */
function SubscriptionNoticeBanner() {
  // Get the current theme'createInteractionAccessor color palette
  const themeColors = getThemeStylesheet();

  // Fire analytics event when the banner is mounted
  zC.useEffect(() => {
    logTelemetryEventIfEnabled("tengu_switch_to_subscription_notice_shown", {});
  }, []);

  // Render the subscription notice banner
  return zC.createElement(
    BannerContainer, // Outer container component
    {
      paddingLeft: 1,
      marginTop: 1,
      marginBottom: 1
    },
    zC.createElement(
      BannerText, // Main text component
      {
        color: themeColors.suggestion
      },
      "You can now use your Claude subscription with ",
      m0, // Presumably a variable or component representing the subscription name or icon
      zC.createElement(
        BannerText, // Secondary text component
        {
          color: themeColors.secondaryText,
          dimColor: true
        },
        " ",
        "• /login to activate"
      )
    )
  );
}

// Export the component for use in other modules
module.exports = SubscriptionNoticeBanner;