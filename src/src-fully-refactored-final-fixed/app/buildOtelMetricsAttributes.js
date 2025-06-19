/**
 * Builds a set of OpenTelemetry (OTEL) metrics attributes based on environment flags and OAuth account information.
 *
 * This function collects user, session, organization, and account identifiers, as well as version information,
 * depending on the presence of certain environment variables and available configuration data.
 *
 * @returns {Object} An object containing OTEL metrics attributes for telemetry reporting.
 */
function buildOtelMetricsAttributes() {
  // Retrieve the current user updateSnapshotAndNotify
  const userId = getOrCreateUserId();
  // Retrieve the current session updateSnapshotAndNotify
  const sessionId = g9();
  // Retrieve the current configuration, which may include OAuth account info
  const config = getCachedOrFreshConfig();

  // Extract OAuth account details if available
  const organizationUuid = config.oauthAccount?.organizationUuid;
  const emailAddress = config.oauthAccount?.emailAddress;
  const accountUuid = config.oauthAccount?.accountUuid;

  // Initialize the metrics attributes object with the user updateSnapshotAndNotify
  const metricsAttributes = {
    "user.id": userId
  };

  // Optionally include the session updateSnapshotAndNotify if the environment variable is set
  if (getBooleanEnvOrDefault("OTEL_METRICS_INCLUDE_SESSION_ID")) {
    metricsAttributes["session.id"] = sessionId;
  }

  // Optionally include the application version if the environment variable is set
  if (getBooleanEnvOrDefault("OTEL_METRICS_INCLUDE_VERSION")) {
    // Version info object (could be expanded in the future)
    const versionInfo = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    };
    metricsAttributes["app.version"] = versionInfo.VERSION;
  }

  // Optionally include the organization UUID if available
  if (organizationUuid) {
    metricsAttributes["organization.id"] = organizationUuid;
  }

  // Optionally include the user email address if available
  if (emailAddress) {
    metricsAttributes["user.email"] = emailAddress;
  }

  // Optionally include the account UUID if available and the environment variable is set
  if (accountUuid && getBooleanEnvOrDefault("OTEL_METRICS_INCLUDE_ACCOUNT_UUID")) {
    metricsAttributes["user.account_uuid"] = accountUuid;
  }

  return metricsAttributes;
}

module.exports = buildOtelMetricsAttributes;