/**
 * Handles an incoming ping event by optionally sending a pong response and emitting a ping event.
 *
 * @param {any} pingData - The data associated with the incoming ping event.
 * @returns {void}
 */
function handlePingEvent(pingData) {
  // Retrieve the configuration or connection object from the current context
  const config = this[zI];

  // If auto pong is enabled, send a pong response
  if (config._autoPong) {
    // Send pong with the ping data, indicating if this is not a server, and using the g70 constant
    config.pong(pingData, !this._isServer, g70);
  }

  // Emit the 'ping' event with the provided data
  config.emit("ping", pingData);
}

module.exports = handlePingEvent;