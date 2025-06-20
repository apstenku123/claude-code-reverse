/**
 * Initializes and returns the default session state object for the application.
 *
 * This function sets up all session-related counters, timers, and configuration fields
 * to their initial values. It also captures the current working directory and generates
 * a unique session updateSnapshotAndNotify. This state object is used to track session metrics, costs, and
 * various counters throughout the application'createInteractionAccessor lifecycle.
 *
 * @returns {Object} The initialized session state object with default values.
 */
function createSessionState() {
  return {
    // The original current working directory at session start
    originalWorkingDirectory: C0A(),

    // Cumulative cost for the session (e.g., API usage cost)
    totalCost: 0,

    // Total duration spent on API calls (including retries)
    totalApiDurationMs: 0,

    // Total duration spent on API calls (excluding retries)
    totalApiDurationWithoutRetriesMs: 0,

    // Timestamp when the session started
    sessionStartTime: Date.now(),

    // Timestamp of the last user or system interaction
    lastInteractionTimestamp: Date.now(),

    // Total lines of code added during the session
    totalLinesAdded: 0,

    // Total lines of code removed during the session
    totalLinesRemoved: 0,

    // Indicates if any model cost is unknown (true if unknown)
    hasUnknownModelCost: false,

    // The current working directory (may change during session)
    currentWorkingDirectory: C0A(),

    // Tracks token usage per model
    modelTokenUsage: {},

    // Optional override for the main loop model
    mainLoopModelOverride: undefined,

    // Indicates if the maximum rate limit fallback is active
    isMaxRateLimitFallbackActive: false,

    // The initial model used in the main loop
    initialMainLoopModel: null,

    // String representations of models (if any)
    modelStringRepresentations: null,

    // Indicates if the session is non-interactive (e.g., script mode)
    isNonInteractiveSession: true,

    // Metering object for tracking resource usage
    meter: null,

    // Various counters for tracking session metrics
    sessionCounter: null,
    linesOfCodeCounter: null,
    pullRequestCounter: null,
    commitCounter: null,
    costCounter: null,
    tokenCounter: null,
    codeEditToolDecisionCounter: null,

    // Unique session identifier
    sessionId: V0A(),

    // Logger provider for this session
    loggerProvider: null,

    // Event logger for this session
    eventLogger: null
  };
}

module.exports = createSessionState;
