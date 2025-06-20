/**
 * Submits user feedback to the Claude CLI feedback API endpoint.
 * Handles authentication (either via access token or API key),
 * builds appropriate headers, and processes the API response.
 * Handles specific error cases, including custom data retention settings.
 *
 * @param {Object} feedbackData - The feedback data to submit. Should be serializable to JSON.
 * @returns {Promise<Object>} An object indicating success or failure, and feedbackId if successful.
 */
async function submitClaudeCliFeedback(feedbackData) {
  try {
    // Prepare request headers
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': ZO()
    };

    // Determine authentication method
    if (R6()) {
      // Use access token authentication
      const authInfo = X3();
      if (!authInfo?.accessToken) {
        return { success: false };
      }
      headers.Authorization = `Bearer ${authInfo.accessToken}`;
      headers['anthropic-beta'] = cx;
    } else {
      // Use API key authentication
      const apiKey = getAnthropicApiKey(false);
      if (!apiKey) {
        return { success: false };
      }
      headers['x-api-key'] = apiKey;
    }

    // Submit feedback via POST request
    const response = await a4.post(
      'https://api.anthropic.com/api/claude_cli_feedback',
      { content: JSON.stringify(feedbackData) },
      { headers }
    );

    // Handle successful response
    if (response.status === 200) {
      const responseData = response.data;
      if (responseData?.feedback_id) {
        return {
          success: true,
          feedbackId: responseData.feedback_id
        };
      }
      // Feedback updateSnapshotAndNotify missing in response
      handleAndReportError(new Error('Failed to submit feedback: request did not return feedback_id'));
      return { success: false };
    }

    // Non-200 status code
    handleAndReportError(new Error('Failed to submit feedback:' + response.status));
    return { success: false };
  } catch (error) {
    // Handle Axios errors, specifically 403 with custom data retention settings
    if (a4.isAxiosError(error) && error.response?.status === 403) {
      const errorData = error.response.data;
      if (
        errorData?.error?.type === 'permission_error' &&
        errorData?.error?.message?.includes('Custom data retention settings')
      ) {
        handleAndReportError(new Error('Cannot submit feedback because custom data retention settings are enabled'));
        return {
          success: false,
          isZdrOrg: true
        };
      }
    }
    // General error handling
    handleAndReportError(error);
    return { success: false };
  }
}

module.exports = submitClaudeCliFeedback;