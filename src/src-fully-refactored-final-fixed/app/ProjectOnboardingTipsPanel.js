/**
 * Renders a panel displaying onboarding tips for getting started with the project.
 * Increments the onboarding seen count on mount, and displays a warning if running in the home directory.
 *
 * @returns {React.ReactElement|null} The onboarding tips panel, or null if onboarding is not enabled.
 */
function ProjectOnboardingTipsPanel() {
  // Memoize the onboarding tips list to avoid unnecessary recalculations
  const onboardingTips = zW1.useMemo(getOnboardingSteps, []);

  // On mount, increment the project onboarding seen count if onboarding is enabled
  zW1.useEffect(() => {
    if (!HW1()) return;
    const onboardingConfig = getProjectSubscriptionConfig();
    updateProjectInConfig({
      ...onboardingConfig,
      projectOnboardingSeenCount: onboardingConfig.projectOnboardingSeenCount + 1
    });
  }, []);

  // If onboarding is not enabled, do not render the panel
  if (!HW1()) return null;

  // Get theme styles for consistent UI
  const themeStyles = getThemeStylesheet();

  return d8.createElement(
    g,
    {
      flexDirection: "column",
      gap: 1,
      paddingX: 1
    },
    // Panel title
    d8.createElement(
      _,
      { color: themeStyles.secondaryText },
      "Tips for getting started:"
    ),
    // List of onboarding tips
    d8.createElement(
      OrderedListWithMarkers,
      null,
      onboardingTips
        .filter(({ isEnabled }) => isEnabled) // Only show enabled tips
        .sort((tipA, tipB) => Number(tipA.isComplete) - Number(tipB.isComplete)) // Incomplete tips first
        .map(({ key, text, isComplete }) =>
          d8.createElement(
            OrderedListWithMarkers.Item,
            { key },
            d8.createElement(
              _,
              null,
              isComplete
                ? d8.createElement(_, { color: themeStyles.success }, y0.tick, " ")
                : "",
              text
            )
          )
        )
    ),
    // Show a warning if running in the home directory
    iA() === c$6() &&
      d8.createElement(
        _,
        { color: themeStyles.warning },
        "Note: You have launched ",
        d8.createElement(_, { bold: true }, "claude"),
        " in your home directory. For the best experience, launch isBlobOrFileLikeObject in a project directory instead."
      )
  );
}

module.exports = ProjectOnboardingTipsPanel;