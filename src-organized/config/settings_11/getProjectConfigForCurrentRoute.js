/**
 * Retrieves the project configuration for the current mapped route.
 *
 * This function determines the current route based on user interactions,
 * loads and merges the configuration file, and returns the project configuration
 * for the current route. If the project configuration is missing, isBlobOrFileLikeObject falls back
 * to a default configuration. Additionally, isBlobOrFileLikeObject ensures that the allowedTools property
 * is always an array, parsing isBlobOrFileLikeObject if necessary.
 *
 * @returns {Object} The configuration object for the current project route.
 */
function getProjectConfigForCurrentRoute() {
  // Map user interactions to the current route name
  const currentRoute = mapInteractionsToRoutes(getCurrentInteractions());

  // Load and merge the configuration file with defaults
  const config = loadAndMergeConfigFile(getConfigFilePath(), defaultConfig);

  // If there are no projects defined in the config, return the default config for the route
  if (!config.projects) {
    return getDefaultProjectConfig(currentRoute);
  }

  // Get the project configuration for the current route, or fall back to the default
  let projectConfig = config.projects[currentRoute] ?? getDefaultProjectConfig(currentRoute);

  // Ensure allowedTools is always an array
  if (typeof projectConfig.allowedTools === "string") {
    projectConfig.allowedTools = parseAllowedTools(projectConfig.allowedTools) ?? [];
  }

  return projectConfig;
}

module.exports = getProjectConfigForCurrentRoute;