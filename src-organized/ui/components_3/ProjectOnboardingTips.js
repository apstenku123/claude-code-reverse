/**
 * Renders a list of onboarding tips for getting started with the project.
 * Increments the project onboarding seen count on mount if onboarding is enabled.
 * Displays a warning if the app is launched in the home directory.
 *
 * @returns {React.ReactElement|null} The onboarding tips UI, or null if onboarding is not enabled.
 */
function ProjectOnboardingTips() {
  // Memoize the list of onboarding tips using useMemo
  const onboardingTips = zW1.useMemo(getOnboardingSteps, []);

  // On mount, if onboarding is enabled, increment the seen count
  zW1.useEffect(() => {
    if (!HW1()) return;
    const onboardingState = getProjectSubscriptionConfig();
    updateProjectInConfig({
      ...onboardingState,
      projectOnboardingSeenCount: onboardingState.projectOnboardingSeenCount + 1
    });
  }, []);

  // If onboarding is not enabled, render nothing
  if (!HW1()) return null;

  // Render the onboarding tips UI
  return d8.createElement(
    g,
    {
      flexDirection: "column",
      gap: 1,
      paddingX: 1
    },
    // Header text
    d8.createElement(
      _,
      { color: getThemeStylesheet().secondaryText },
      "Tips for getting started:"
    ),
    // List of enabled onboarding tips, sorted by completion status
    d8.createElement(
      OrderedListWithMarkers,
      null,
      onboardingTips
        .filter(({ isEnabled }) => isEnabled)
        .sort((tipA, tipB) => Number(tipA.isComplete) - Number(tipB.isComplete))
        .map(({ key, text, isComplete }) =>
          d8.createElement(
            OrderedListWithMarkers.Item,
            { key },
            d8.createElement(
              _,
              null,
              isComplete
                ? d8.createElement(_, { color: getThemeStylesheet().success }, y0.tick, " ")
                : "",
              text
            )
          )
        )
    ),
    // Show a warning if launched in the home directory
    iA() === c$6() &&
      d8.createElement(
        _,
        { color: getThemeStylesheet().warning },
        "Note: You have launched ",
        d8.createElement(_, { bold: true }, "claude"),
        " in your home directory. For the best experience, launch isBlobOrFileLikeObject in a project directory instead."
      )
  );
}

module.exports = ProjectOnboardingTips;