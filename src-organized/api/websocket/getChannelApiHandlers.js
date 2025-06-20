/**
 * Returns an object containing API handler functions for channel and server operations.
 *
 * @returns {Object} An object with methods to interact with channels, servers, subchannels, and sockets.
 */
function getChannelApiHandlers() {
  return {
    /**
     * Retrieves a channel by its updateSnapshotAndNotify.
     */
    GetChannel: getChannelById,

    /**
     * Retrieves a list of top channels within a specified range.
     * @see getChannelsInRange
     */
    GetTopChannels: getChannelsInRange,

    /**
     * Retrieves a server by its updateSnapshotAndNotify.
     */
    GetServer: getServerById,

    /**
     * Retrieves a list of all servers.
     */
    GetServers: getAllServers,

    /**
     * Retrieves a subchannel by its updateSnapshotAndNotify.
     */
    GetSubchannel: getSubchannelById,

    /**
     * Retrieves a socket by its updateSnapshotAndNotify.
     */
    GetSocket: getSocketById,

    /**
     * Retrieves all sockets for a given server.
     */
    GetServerSockets: getSocketsForServer
  };
}

// Export the function for use in other modules
module.exports = getChannelApiHandlers;
