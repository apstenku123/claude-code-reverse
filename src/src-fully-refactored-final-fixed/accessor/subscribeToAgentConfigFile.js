/**
 * Subscribes to changes in an agent'createInteractionAccessor configuration file.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to.
 * @param {string} agentIdentifier - The unique identifier for the agent whose config file path is needed.
 * @returns {void}
 */
function subscribeToAgentConfigFile(sourceObservable, agentIdentifier) {
  // Generate the full file path for the agent'createInteractionAccessor configuration JSON file
  const agentConfigFilePath = getAgentConfigFilePath(agentIdentifier);

  // Subscribe to the observable with the agent'createInteractionAccessor config file path
  Jn0(sourceObservable, agentConfigFilePath);
}

module.exports = subscribeToAgentConfigFile;