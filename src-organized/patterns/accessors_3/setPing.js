/**
 * Handles incoming ping messages by optionally sending a pong response and emitting a 'ping' event.
 *
 * @param {any} pingData - The data associated with the incoming ping message.
 * @returns {void}
 */
function setPing(pingData) {
  // Retrieve the configuration or connection object using the zI property
  const connection = this[zI];

  // If auto pong is enabled, respond with a pong message
  if (connection._autoPong) {
    // Send a pong response
    connection.pong(pingData, !this._isServer, g70);
  }

  // Emit a 'ping' event with the provided ping data
  connection.emit("ping", pingData);
}

module.exports = setPing;