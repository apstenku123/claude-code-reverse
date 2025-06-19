/**
 * Returns the appropriate theme palette object based on the provided theme name or the current configuration.
 *
 * @param {string} [themeName] - Optional. The name of the theme to retrieve the palette for. If not provided, uses the theme from configuration.
 * @returns {object} The palette object corresponding to the selected theme.
 */
function getThemePalette(themeName) {
  // Retrieve the current configuration (may be cached or freshly loaded)
  const config = getCachedOrFreshConfig();

  // Determine the theme to use: either the provided one or the one from config
  const selectedTheme = themeName ?? config.theme;

  // Return the palette object based on the selected theme
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
      return _s9;
  }
}

module.exports = getThemePalette;