/**
 * Logs a telemetry event if telemetry is enabled and not disabled by environment variables.
 *
 * @param {string} eventName - The name of the event to log.
 * @param {Object} eventMetadata - Additional metadata about the event (may include model, etc).
 * @returns {Promise<void>} Resolves when the event is logged and flushed, or immediately if telemetry is disabled.
 */
async function logTelemetryEventIfEnabled(eventName, eventMetadata) {
  // Check if telemetry is disabled by any environment variable
  if (
    process.env.CLAUDE_CODE_USE_BEDROCK ||
    process.env.CLAUDE_CODE_USE_VERTEX ||
    process.env.DISABLE_TELEMETRY ||
    process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
  ) {
    return;
  }

  try {
    // Determine the model name, or use a fallback
    const modelName = eventMetadata.model ? String(eventMetadata.model) : getProcessedInteractionRoute();
    // Get any beta flags for this model
    const betaFlags = TY(modelName);
    // Gather platform, package manager, and runtime info in parallel
    const [telemetryLogger, packageManagers, runtimes] = await Promise.all([
      CL(),
      pA.getPackageManagers(),
      pA.getRuntimes()
    ]);

    // If no logger is available, exit early
    if (!telemetryLogger) return;

    // Build the metadata object for the event
    const metadata = {
      ...eventMetadata,
      model: modelName,
      sessionId: g9(),
      userType: "external",
      // Only include betas if there are any
      ...(betaFlags.length > 0 ? { betas: betaFlags.join(",") } : {}),
      env: JSON.stringify({
        platform: pA.platform,
        nodeVersion: pA.nodeVersion,
        terminal: pA.terminal,
        packageManagers: packageManagers.join(","),
        runtimes: runtimes.join(","),
        isRunningWithBun: pA.isRunningWithBun(),
        isCi: false, // hardcoded as in original
        isClaubbit: process.env.CLAUBBIT === "true",
        isGithubAction: process.env.GITHUB_ACTIONS === "true",
        isClaudeCodeAction:
          process.env.CLAUDE_CODE_ACTION === "1" ||
          process.env.CLAUDE_CODE_ACTION === "true",
        isClaudeAiAuth: R6(),
        version: "1.0.19",
        // Include GitHub Actions context if running in that environment
        ...(process.env.GITHUB_ACTIONS === "true" && {
          githubEventName: process.env.GITHUB_EVENT_NAME,
          githubActionsRunnerEnvironment: process.env.RUNNER_ENVIRONMENT,
          githubActionsRunnerOs: process.env.RUNNER_OS
        })
      }),
      entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT
    };

    // Construct the event object
    const event = {
      eventName,
      metadata
    };

    // Log the event and flush the logger
    telemetryLogger.logEvent(event);
    await telemetryLogger.flush();
  } catch (error) {
    // Silently ignore errors
  }
}

module.exports = logTelemetryEventIfEnabled;