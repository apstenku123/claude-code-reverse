/**
 * Subscribes to changes in an agent'createInteractionAccessor configuration file.
 *
 * This function takes an observable source and a configuration object or agent identifier,
 * generates the full path to the agent'createInteractionAccessor configuration file, and subscribes the source
 * to that configuration file path.
 *
 * @param {Observable} sourceObservable - The observable source to subscribe.
 * @param {string|object} agentConfig - The agent identifier or configuration object used to generate the config file path.
 * @returns {void}
 */
function subscribeToAgentConfig(sourceObservable, agentConfig) {
  // Generate the full path to the agent'createInteractionAccessor configuration file
  const agentConfigPath = generateAgentConfigPath(agentConfig);
  // Subscribe the observable source to the configuration file path
  Jn0(sourceObservable, agentConfigPath);
}

module.exports = subscribeToAgentConfig;