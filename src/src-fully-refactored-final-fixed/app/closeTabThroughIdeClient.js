/**
 * Closes a tab via the IDE client if the client is connected.
 *
 * @async
 * @function closeTabThroughIdeClient
 * @param {string} tabName - The name of the tab to close.
 * @param {Object} config - Configuration object containing options for the session.
 * @param {Object} ideClient - The IDE client connection object.
 * @returns {Promise<void>} Resolves when the tab is closed or error is handled.
 * @throws {Error} Throws if the IDE client is not available or not connected.
 */
async function closeTabThroughIdeClient(tabName, config, ideClient) {
  try {
    // Ensure the IDE client is available and connected
    if (!ideClient || ideClient.type !== "connected") {
      throw new Error("IDE client not available");
    }
    // Attempt to close the tab using the IDE client'createInteractionAccessor API
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

module.exports = closeTabThroughIdeClient;