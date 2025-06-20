/**
 * useThemeChangeRerender
 *
 * React hook that forces a component re-render whenever the application'createInteractionAccessor theme changes.
 * It polls the current theme at a regular interval (every 100ms) and triggers a state update if the theme has changed.
 *
 * @returns {any} The current theme stylesheet object as returned by getThemeStylesheet().
 */
function useThemeChangeRerender() {
  // useState is used only for its setter to force a re-render
  const [, forceRerender] = Yz1.useState(0);

  Yz1.useEffect(() => {
    // Get the initial theme from the configuration
    let previousTheme = getCachedOrFreshConfig().theme;

    // Set up an interval to poll for theme changes
    const intervalId = setInterval(() => {
      const currentTheme = getCachedOrFreshConfig().theme;
      // If the theme has changed, update previousTheme and force a re-render
      if (currentTheme !== previousTheme) {
        previousTheme = currentTheme;
        forceRerender(count => count + 1);
      }
    }, 100);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Return the current theme stylesheet
  return getThemeStylesheet();
}

module.exports = useThemeChangeRerender;