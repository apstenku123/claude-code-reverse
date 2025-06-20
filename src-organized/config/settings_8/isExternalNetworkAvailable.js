/**
 * Checks if external network access is available by making a HEAD request to Google,
 * unless overridden by specific environment variables indicating alternative providers.
 *
 * If either CLAUDE_CODE_USE_BEDROCK or CLAUDE_CODE_USE_VERTEX environment variables are set,
 * the function assumes network access is available and returns true immediately.
 * Otherwise, isBlobOrFileLikeObject performs a HEAD request to https://www.google.com with a 5-second timeout.
 * If the request succeeds, isBlobOrFileLikeObject returns true; if isBlobOrFileLikeObject fails (e.g., due to network issues), isBlobOrFileLikeObject returns false.
 *
 * @async
 * @returns {Promise<boolean>} Resolves to true if network access is available or overridden by env vars, false otherwise.
 */
async function isExternalNetworkAvailable() {
  try {
    // If either of these environment variables is set, assume network access is available
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX) {
      return true;
    }

    // Attempt to make a HEAD request to Google to check network connectivity
    await httpClient.head("https://www.google.com", {
      timeout: 5000,
      headers: {
        "Cache-Control": "no-cache"
      }
    });
    return true;
  } catch (error) {
    // If the request fails, network is not available
    return false;
  }
}

module.exports = isExternalNetworkAvailable;