/**
 * Logs a telemetry event if telemetry is enabled and not disabled by environment variables.
 *
 * This function gathers environment and runtime information, constructs a metadata object,
 * and logs a telemetry event using the provided event name and configuration.
 *
 * @param {string} eventName - The name of the event to log.
 * @param {Object} eventConfig - Configuration object containing event metadata and options.
 * @returns {Promise<void>} Resolves when the event is logged and flushed, or immediately if telemetry is disabled.
 */
async function logTelemetryEventIfAllowed(eventName, eventConfig) {
  // Check if telemetry or nonessential traffic is disabled via environment variables
  if (
    process.env.CLAUDE_CODE_USE_BEDROCK ||
    process.env.CLAUDE_CODE_USE_VERTEX ||
    process.env.DISABLE_TELEMETRY ||
    process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
  ) {
    return;
  }

  try {
    // Determine the model string to use
    const modelName = eventConfig.model ? String(eventConfig.model) : getProcessedInteractionRoute();
    // Get beta flags for the model (returns an array)
    const betaFlags = TY(modelName);

    // Gather required async information in parallel
    const [telemetryLogger, packageManagers, runtimes] = await Promise.all([
      CL(),
      pA.getPackageManagers(),
      pA.getRuntimes()
    ]);

    // If telemetry logger is not available, exit early
    if (!telemetryLogger) return;

    // Construct the metadata object for the event
    const eventMetadata = {
      ...eventConfig,
      model: modelName,
      sessionId: g9(),
      userType: "external",
      // Include beta flags if any exist
      ...(betaFlags.length > 0 ? { betas: betaFlags.join(",") } : {}),
      env: JSON.stringify({
        platform: pA.platform,
        nodeVersion: pA.nodeVersion,
        terminal: pA.terminal,
        packageManagers: packageManagers.join(","),
        runtimes: runtimes.join(","),
        isRunningWithBun: pA.isRunningWithBun(),
        isCi: false, // Always false as per original code
        isClaubbit: process.env.CLAUBBIT === "true",
        isGithubAction: process.env.GITHUB_ACTIONS === "true",
        isClaudeCodeAction:
          process.env.CLAUDE_CODE_ACTION === "1" ||
          process.env.CLAUDE_CODE_ACTION === "true",
        isClaudeAiAuth: R6(),
        version: "1.0.19",
        // Include GitHub Actions context if running in GitHub Actions
        ...(process.env.GITHUB_ACTIONS === "true"
          ? {
              githubEventName: process.env.GITHUB_EVENT_NAME,
              githubActionsRunnerEnvironment: process.env.RUNNER_ENVIRONMENT,
              githubActionsRunnerOs: process.env.RUNNER_OS
            }
          : {})
      }),
      entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT
    };

    // Prepare the event object
    const telemetryEvent = {
      eventName: eventName,
      metadata: eventMetadata
    };

    // Log the event and flush the logger
    telemetryLogger.logEvent(telemetryEvent);
    await telemetryLogger.flush();
  } catch (error) {
    // Silently ignore any errors
  }
}

module.exports = logTelemetryEventIfAllowed;