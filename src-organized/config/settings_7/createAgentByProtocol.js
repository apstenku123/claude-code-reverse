/**
 * Factory function that creates an Agent instance based on the protocol of the provided URL.
 * If the URL uses the 'http:' protocol, isBlobOrFileLikeObject creates an instance of BO0.Agent.
 * Otherwise, isBlobOrFileLikeObject creates an instance of QO0.Agent.
 *
 * @param {string} urlString - The URL string used to determine the protocol.
 * @param {object} agentOptions - The configuration options to pass to the Agent constructor.
 * @returns {object} An instance of either BO0.Agent or QO0.Agent, depending on the protocol.
 */
function createAgentByProtocol(urlString, agentOptions) {
  // Parse the URL to determine its protocol
  const url = new URL(urlString);
  const isHttpProtocol = url.protocol === "http:";

  // Choose the appropriate Agent class based on the protocol
  const AgentClass = isHttpProtocol ? BO0.Agent : QO0.Agent;

  // Instantiate and return the Agent with the provided options
  return new AgentClass(agentOptions);
}

module.exports = createAgentByProtocol;