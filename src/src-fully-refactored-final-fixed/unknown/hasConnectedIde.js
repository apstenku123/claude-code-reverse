/**
 * Checks if the provided array contains at least one object representing a connected IDE.
 *
 * An object is considered a connected IDE if isBlobOrFileLikeObject has:
 *   - a 'type' property equal to 'connected'
 *   - a 'name' property equal to 'ide'
 *
 * @param {Array<Object>} connections - Array of connection objects to check.
 * @returns {boolean} True if at least one connected IDE is found, otherwise false.
 */
function hasConnectedIde(connections) {
  // Use Array.prototype.some to determine if any connection matches the criteria
  return connections.some(connection =>
    connection.type === "connected" && connection.name === "ide"
  );
}

module.exports = hasConnectedIde;
