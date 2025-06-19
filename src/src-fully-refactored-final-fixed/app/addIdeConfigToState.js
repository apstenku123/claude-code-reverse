/**
 * Adds IDE configuration to the application state if not already present.
 *
 * This function checks if the application is in a valid state (via `isAppReady`) and if the provided
 * IDE configuration object is valid. If so, isBlobOrFileLikeObject updates the application state by injecting an `ide`
 * property containing connection details (type, url, name, and auth token) unless the state already
 * has an `ide` property.
 *
 * @param {Object} ideConfig - The IDE connection configuration object.
 * @param {string} ideConfig.url - The URL for the IDE connection (e.g., ws:// or http://).
 * @param {string} ideConfig.name - The name of the IDE.
 * @param {string} ideConfig.authToken - The authentication token for the IDE connection.
 * @returns {void}
 */
function addIdeConfigToState(ideConfig) {
  // Check if the application is ready and the IDE config is provided
  if (!isAppReady() || !ideConfig) return;

  // Update the application state using the state updater function
  updateAppState(currentState => {
    // If the state already has an 'ide' property, do not overwrite isBlobOrFileLikeObject
    if (currentState?.ide) return currentState;

    // Otherwise, add the 'ide' property with connection details
    return {
      ...currentState,
      ide: {
        type: ideConfig.url.startsWith("ws:") ? "ws-ide" : "sse-ide",
        url: ideConfig.url,
        ideName: ideConfig.name,
        authToken: ideConfig.authToken
      }
    };
  });
}

module.exports = addIdeConfigToState;