/**
 * Initializes and returns the default state object for tracking session metrics and statistics.
 * This includes cost tracking, timing, model usage, counters, and logging utilities.
 *
 * External dependencies:
 * - C0A: Function that returns the current working directory (cwd) as a string.
 * - V0A: Function that generates a unique session updateSnapshotAndNotify as a string.
 *
 * @returns {Object} An object containing the initial state for session metrics and statistics.
 */
function createSessionMetricsState() {
  return {
    // The original working directory at session start
    originalWorkingDirectory: C0A(),

    // Total cost incurred during the session
    totalCost: 0,

    // Total API call duration (including retries)
    totalApiDurationMs: 0,

    // Total API call duration (excluding retries)
    totalApiDurationWithoutRetriesMs: 0,

    // Timestamp when the session started
    sessionStartTime: Date.now(),

    // Timestamp of the last user or API interaction
    lastInteractionTime: Date.now(),

    // Total number of lines added during the session
    totalLinesAdded: 0,

    // Total number of lines removed during the session
    totalLinesRemoved: 0,

    // Indicates if any model cost is unknown
    hasUnknownModelCost: false,

    // Current working directory (may change during session)
    currentWorkingDirectory: C0A(),

    // Tracks token usage per model
    modelTokenUsage: {},

    // Optional override for the main loop model
    mainLoopModelOverride: undefined,

    // Indicates if the max rate limit fallback is active
    isMaxRateLimitFallbackActive: false,

    // The initial model used in the main loop
    initialMainLoopModel: null,

    // String representations of models (if any)
    modelStringRepresentations: null,

    // Indicates if the session is non-interactive
    isNonInteractiveSession: true,

    // Metering utility for tracking usage (if any)
    meter: null,

    // Various counters for session statistics
    sessionCounter: null,
    linesOfCodeCounter: null,
    pullRequestCounter: null,
    commitCounter: null,
    costCounter: null,
    tokenCounter: null,
    codeEditToolDecisionCounter: null,

    // Unique session identifier
    sessionId: V0A(),

    // Logger provider and event logger (if any)
    loggerProvider: null,
    eventLogger: null
  };
}

module.exports = createSessionMetricsState;