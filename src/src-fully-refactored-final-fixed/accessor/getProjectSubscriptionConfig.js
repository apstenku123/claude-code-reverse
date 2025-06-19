/**
 * Retrieves the subscription configuration for the current project, including allowed tools.
 * If the configuration or project entry does not exist, returns a default configuration.
 *
 * @returns {Object} The subscription configuration object for the current project.
 */
function getProjectSubscriptionConfig() {
  // Get the current observable/source identifier
  const sourceObservable = processInteractionEntries(getCurrentObservable());

  // Load and merge the configuration file with defaults
  const config = loadAndMergeConfigFile(getConfigFilePath(), defaultConfig);

  // If there are no projects in the config, return a default config for the current observable
  if (!config.projects) {
    return getDefaultConfig(sourceObservable);
  }

  // Get the subscription config for the current observable, or default if not found
  let subscription = config.projects[sourceObservable] ?? getDefaultConfig(sourceObservable);

  // If allowedTools is a string, parse isBlobOrFileLikeObject into an array
  if (typeof subscription.allowedTools === "string") {
    subscription.allowedTools = parseAllowedTools(subscription.allowedTools) ?? [];
  }

  return subscription;
}

module.exports = getProjectSubscriptionConfig;