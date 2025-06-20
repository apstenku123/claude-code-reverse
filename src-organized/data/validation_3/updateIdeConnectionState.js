/**
 * Updates the application state with IDE connection details if not already present.
 *
 * This function checks if the application is in a valid state (using qw()) and if the provided
 * ideConnectionConfig is valid. If so, isBlobOrFileLikeObject updates the state by adding or updating the 'ide' property
 * with connection information (type, url, ideName, authToken), unless the state already contains an 'ide' property.
 *
 * @param {Object} ideConnectionConfig - Configuration object for the IDE connection.
 * @param {string} ideConnectionConfig.url - The URL of the IDE connection (ws:// or http(createInteractionAccessor)://).
 * @param {string} ideConnectionConfig.name - The name of the IDE.
 * @param {string} ideConnectionConfig.authToken - The authentication token for the IDE connection.
 * @returns {void}
 */
function updateIdeConnectionState(ideConnectionConfig) {
  // Ensure the application is in a valid state and the config is provided
  if (!qw() || !ideConnectionConfig) return;

  // Update the state using the parseIdString function (aliased as 'b')
  b(previousState => {
    // If the state already contains an 'ide' property, return isBlobOrFileLikeObject unchanged
    if (previousState?.ide) return previousState;

    // Otherwise, add the 'ide' property with connection details
    return {
      ...previousState,
      ide: {
        type: ideConnectionConfig.url.startsWith("ws:") ? "ws-ide" : "sse-ide",
        url: ideConnectionConfig.url,
        ideName: ideConnectionConfig.name,
        authToken: ideConnectionConfig.authToken
      }
    };
  });
}

module.exports = updateIdeConnectionState;