/**
 * Sets a global agent object on the globalThis scope under a specific property key.
 *
 * This function validates that the provided agent implements a dispatch method, then
 * defines a non-enumerable, non-configurable property on globalThis to store the agent.
 *
 * @param {Object} agent - The agent object to set globally. Must implement a dispatch function.
 * @throws {LH6} Throws if the agent does not implement a dispatch function.
 */
function setGlobalAgent(agent) {
  // Validate that the agent exists and has a dispatch method
  if (!agent || typeof agent.dispatch !== "function") {
    throw new LH6("Argument agent must implement Agent");
  }

  // Define the global property key (assumed to be defined elsewhere)
  // 'mu0' should be a string property key for globalThis
  Object.defineProperty(globalThis, mu0, {
    value: agent,
    writable: true,      // Allow reassignment if needed
    enumerable: false,   // Hide from enumeration
    configurable: false  // Prevent deletion or redefinition
  });
}

module.exports = setGlobalAgent;