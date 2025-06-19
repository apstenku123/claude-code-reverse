/**
 * Returns the appropriate stylesheet object based on the provided theme name or the current configuration'createInteractionAccessor theme.
 *
 * @param {string} [themeName] - Optional. The name of the theme to use. If not provided, uses the theme from configuration.
 * @returns {object} The stylesheet object corresponding to the selected theme.
 */
function getThemeStylesheet(themeName) {
  // Retrieve the current configuration, which includes the default theme
  const config = getCachedOrFreshConfig();

  // Determine the theme to use: prefer the provided themeName, otherwise use the config'createInteractionAccessor theme
  const selectedTheme = themeName ?? config.theme;

  // Return the corresponding stylesheet object based on the selected theme
  switch (selectedTheme) {
    case "light":
      return Os9;
    case "light-ansi":
      return Ts9;
    case "dark-ansi":
      return Ps9;
    case "light-daltonized":
      return Ss9;
    case "dark-daltonized":
      return js9;
    default:
      // Fallback to the default stylesheet if theme is unrecognized
      return _s9;
  }
}

module.exports = getThemeStylesheet;