/**
 * Sets up a subscription to the agent configuration file path.
 *
 * This function takes an observable source and a configuration object, generates the full
 * agent configuration file path using the provided configuration, and subscribes the source
 * observable to that path using the Jn0 function.
 *
 * @param {Observable} sourceObservable - The observable source to subscribe.
 * @param {Object} config - The configuration object used to generate the agent config file path.
 * @returns {void}
 */
function setAgentConfigSubscription(sourceObservable, config) {
  // Generate the full agent configuration file path from the config object
  const agentConfigFilePath = generateAgentConfigPath(config);

  // Subscribe the observable source to the generated file path
  Jn0(sourceObservable, agentConfigFilePath);
}

module.exports = setAgentConfigSubscription;