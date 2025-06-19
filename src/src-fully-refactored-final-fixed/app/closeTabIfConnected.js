/**
 * Attempts to close a tab via the IDE client if the client is connected.
 * Throws an error if the client is not available or not connected.
 *
 * @async
 * @function closeTabIfConnected
 * @param {string} tabName - The name of the tab to close.
 * @param {Object} config - Configuration object containing options.
 * @param {Object} config.options - Options for the session.
 * @param {boolean} config.options.isNonInteractiveSession - Whether the session is non-interactive.
 * @param {Object} ideClient - The IDE client connection object.
 * @param {string} ideClient.type - The type of the client connection (should be 'connected').
 * @returns {Promise<void>} Resolves when the tab is closed or error is handled.
 */
async function closeTabIfConnected(tabName, config, ideClient) {
  try {
    // Ensure the IDE client is available and connected
    if (!ideClient || ideClient.type !== "connected") {
      throw new Error("IDE client not available");
    }
    // Attempt to close the specified tab via the IDE client
    await mN(
      "close_tab",
      { tab_name: tabName },
      ideClient,
      config.options.isNonInteractiveSession
    );
  } catch (error) {
    // Handle any errors using the global error handler
    reportErrorIfAllowed(error);
  }
}

module.exports = closeTabIfConnected;