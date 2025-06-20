/**
 * Checks if the application can access the internet by making a HEAD request to Google,
 * unless overridden by specific environment variables indicating alternate cloud providers.
 *
 * @async
 * @returns {Promise<boolean>} Resolves to true if internet is accessible or overridden by env vars, false otherwise.
 */
async function isInternetAccessible() {
  try {
    // If either of these environment variables is set, assume internet is accessible
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX) {
      return true;
    }

    // Attempt to make a HEAD request to Google to check internet connectivity
    await httpClient.head("https://www.google.com", {
      timeout: 5000,
      headers: {
        "Cache-Control": "no-cache"
      }
    });
    return true;
  } catch (error) {
    // If any error occurs (e.g., network error), return false
    return false;
  }
}

module.exports = isInternetAccessible;