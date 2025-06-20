/**
 * Initializes and returns the default application state object.
 *
 * This function sets up the initial state for the application, including flags for verbosity,
 * rate limiting, feature toggles, tool permissions, and the main command processor (MCP) structure.
 *
 * @returns {Object} The default application state object with all relevant properties initialized.
 */
function createAppState() {
  return {
    // Flag to enable or disable verbose logging
    verbose: false,

    // The main loop model instance (null by default)
    mainLoopModel: null,

    // Indicates if the fallback for maximum rate limiting is active
    maxRateLimitFallbackActive: false,

    // Feature toggle for the 'todo' feature
    todoFeatureEnabled: false,

    // Context object for tool permissions, provided by KX()
    toolPermissionContext: KX(),

    // Main Command Processor (MCP) structure
    mcp: {
      clients: [],      // List of connected clients
      tools: [],        // List of available tools
      commands: [],     // List of available commands
      resources: {}     // Resource mapping object
    }
  };
}

module.exports = createAppState;