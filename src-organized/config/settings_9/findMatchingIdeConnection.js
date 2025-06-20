/**
 * Searches for a matching IDE connection in the provided list based on the configuration object.
 *
 * @param {Array<Object>} connections - Array of IDE connection objects to search through. Each object should have at least a 'url' property.
 * @param {Object} config - Configuration object that may contain an 'ide' property describing the IDE connection to match.
 * @returns {Promise<Object|null>} Returns a Promise that resolves to the matching connection object if found, otherwise null.
 */
async function findMatchingIdeConnection(connections, config) {
  // Safely extract the 'ide' property from the config object
  const ideConnection = config?.ide;

  // Ensure the IDE connection exists and is of a supported type
  if (!ideConnection || (ideConnection.type !== "sse-ide" && ideConnection.type !== "ws-ide")) {
    return null;
  }

  // Search for a connection in the list that matches the IDE connection'createInteractionAccessor URL
  for (const connection of connections) {
    if (connection.url === ideConnection.url) {
      return connection;
    }
  }

  // Return null if no matching connection is found
  return null;
}

module.exports = findMatchingIdeConnection;