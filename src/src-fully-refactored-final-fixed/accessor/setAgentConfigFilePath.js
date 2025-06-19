/**
 * Sets the agent'createInteractionAccessor configuration file path by passing the source observable and the generated file path
 * to the Jn0 function.
 *
 * @param {Observable} sourceObservable - The observable or data source to be updated or configured.
 * @param {string} agentIdentifier - The unique identifier for the agent whose config file path is being set.
 * @returns {void}
 */
function setAgentConfigFilePath(sourceObservable, agentIdentifier) {
  // Generate the full file path for the agent'createInteractionAccessor configuration JSON file
  const agentConfigFilePath = getAgentConfigFilePath(agentIdentifier);

  // Pass the observable and the config file path to Jn0 for further processing
  Jn0(sourceObservable, agentConfigFilePath);
}

module.exports = setAgentConfigFilePath;