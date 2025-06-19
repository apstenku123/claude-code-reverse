/**
 * Creates and returns the default application state object.
 *
 * This function initializes the main application state with default values for verbosity,
 * main loop model, rate limiting, feature toggles, tool permissions, and the MCP (multi-client platform) context.
 *
 * @returns {Object} The default application state object.
 */
function createDefaultAppState() {
  return {
    // Indicates if verbose logging is enabled
    verbose: false,

    // Reference to the main loop model (null by default)
    mainLoopModel: null,

    // Indicates if the max rate limit fallback mechanism is active
    maxRateLimitFallbackActive: false,

    // Feature toggle for the TODO feature
    todoFeatureEnabled: false,

    // Tool permission context, initialized with default rule config
    toolPermissionContext: createDefaultRuleConfig(),

    // Multi-Client Platform (MCP) context
    mcp: {
      // List of connected clients
      clients: [],
      // List of available tools
      tools: [],
      // List of available commands
      commands: [],
      // Resources associated with the MCP
      resources: {}
    }
  };
}

// Dependency: createDefaultRuleConfig must be imported or defined elsewhere
// Example: const createDefaultRuleConfig = require('./createDefaultRuleConfig');

module.exports = createDefaultAppState;