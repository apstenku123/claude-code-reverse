/**
 * Performs a preflight connectivity check to Anthropic API endpoints.
 * Attempts to connect to a list of Anthropic endpoints and verifies successful responses.
 * If any endpoint fails, logs the failure and returns an error object.
 *
 * @async
 * @returns {Promise<{success: boolean, error?: string}>} Result of the preflight check.
 */
async function performAnthropicPreflightCheck() {
  // List of Anthropic endpoints to check connectivity
  const anthropicEndpoints = [
    "https://api.anthropic.com/api/hello",
    "https://console.anthropic.com/v1/oauth/hello"
  ];

  /**
   * Checks connectivity to a single endpoint.
   * @param {string} endpointUrl - The URL to check.
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const checkEndpointConnectivity = async (endpointUrl) => {
    try {
      // Make GET request with custom User-Agent header
      const response = await a4.get(endpointUrl, {
        headers: {
          "User-Agent": ZO()
        }
      });
      if (response.status !== 200) {
        // Non-200 status code indicates failure
        return {
          success: false,
          error: `Failed to connect to ${new URL(endpointUrl).hostname}: Status ${response.status}`
        };
      }
      // Success
      return { success: true };
    } catch (error) {
      // Handle network or other errors
      return {
        success: false,
        error: `Failed to connect to ${new URL(endpointUrl).hostname}: ${error instanceof Error ? error.code || error.message : String(error)}`
      };
    }
  };

  try {
    // Run connectivity checks for all endpoints in parallel
    const connectivityResults = await Promise.all(
      anthropicEndpoints.map(checkEndpointConnectivity)
    );

    // Find the first failed connectivity result, if any
    const failedResult = connectivityResults.find(result => !result.success);

    if (failedResult) {
      // Log preflight check failure with error metadata
      logTelemetryEventIfEnabled("tengu_preflight_check_failed", {
        isConnectivityError: false,
        hasErrorMessage: Boolean(failedResult.error)
      });
    }

    // Return the first failure, or success if all passed
    return failedResult || { success: true };
  } catch (error) {
    // Handle unexpected errors (e.g., Promise.all failure)
    reportErrorIfAllowed(error);
    logTelemetryEventIfEnabled("tengu_preflight_check_failed", {
      isConnectivityError: true
    });
    return {
      success: false,
      error: `Connectivity check error: ${error instanceof Error ? error.code || error.message : String(error)}`
    };
  }
}

module.exports = performAnthropicPreflightCheck;