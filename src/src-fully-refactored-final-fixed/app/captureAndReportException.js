/**
 * Captures and reports an exception to the monitoring service with relevant environment and user context.
 *
 * @async
 * @function captureAndReportException
 * @param {any} error - The error or exception object to be reported.
 * @returns {Promise<void>} Resolves when the exception has been captured and reported.
 */
async function captureAndReportException(error) {
  try {
    // Retrieve user configuration (e.g., userID, email)
    const userConfig = await Xx();

    // Set additional context for the error report
    vY.setExtras({
      nodeVersion: pA.nodeVersion, // Node.js version
      platform: pA.platform,       // Operating system/platform
      isCI: pA.isCI,               // Whether running in CI environment
      isTest: false,               // Not running in test mode
      packageVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
        VERSION: "1.0.19"
      }.VERSION,                  // Current package version
      sessionId: g9(),            // Unique session identifier
      statsigGates: MB0(),        // Feature gate/accessor information
      terminal: pA.terminal,      // Terminal information
      userType: "external"        // User type (external)
    });

    // Set user information for the error report
    vY.setUser({
      id: userConfig.userID,
      email: userConfig.email
    });

    // Capture and report the exception
    vY.captureException(error);
  } catch {
    // Silently ignore any errors during the reporting process
  }
}

module.exports = captureAndReportException;