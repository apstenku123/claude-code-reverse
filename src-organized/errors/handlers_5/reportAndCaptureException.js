/**
 * Reports environment and user context to the analytics service, then captures the provided exception.
 *
 * @async
 * @function reportAndCaptureException
 * @param {any} exception - The exception or error object to be captured and reported.
 * @returns {Promise<void>} Resolves when the exception has been captured; does not return a value.
 */
async function reportAndCaptureException(exception) {
  try {
    // Retrieve user configuration (e.g., userID, email)
    const userConfig = await Xx();

    // Set additional context and environment details for analytics
    vY.setExtras({
      nodeVersion: pA.nodeVersion, // Node.js version
      platform: pA.platform,       // Operating system platform
      isCI: pA.isCI,               // Whether running in CI environment
      isTest: false,               // Not a test run
      packageVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
        VERSION: "1.0.19"
      }.VERSION,                  // Current package version
      sessionId: g9(),            // Unique session identifier
      statsigGates: MB0(),        // Feature gate/accessor object
      terminal: pA.terminal,      // Terminal type
      userType: "external"        // User type
    });

    // Set user information for analytics
    vY.setUser({
      id: userConfig.userID,
      email: userConfig.email
    });

    // Capture and report the exception
    vY.captureException(exception);
  } catch {
    // Silently ignore errors in the reporting process
  }
}

module.exports = reportAndCaptureException;