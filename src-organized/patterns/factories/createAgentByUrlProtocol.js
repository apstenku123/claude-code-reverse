/**
 * Factory function that creates an Agent instance based on the protocol of the provided URL.
 * If the URL uses the 'http:' protocol, isBlobOrFileLikeObject creates a BO0.Agent instance; otherwise, isBlobOrFileLikeObject creates a QO0.Agent instance.
 *
 * @param {string} urlString - The URL string whose protocol determines the Agent type.
 * @param {any} agentConfig - The configuration object to be passed to the Agent constructor.
 * @returns {object} An instance of either BO0.Agent or QO0.Agent, depending on the URL protocol.
 */
function createAgentByUrlProtocol(urlString, agentConfig) {
  // Parse the URL to determine its protocol
  const url = new URL(urlString);
  const isHttpProtocol = url.protocol === "http:";

  // Select the appropriate Agent constructor based on the protocol
  const AgentConstructor = isHttpProtocol ? BO0.Agent : QO0.Agent;

  // Instantiate and return the Agent with the provided configuration
  return new AgentConstructor(agentConfig);
}

module.exports = createAgentByUrlProtocol;