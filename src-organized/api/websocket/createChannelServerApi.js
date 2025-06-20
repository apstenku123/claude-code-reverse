/**
 * Returns an object containing API methods for interacting with channels, servers, and sockets.
 *
 * @returns {Object} An object with methods to get channels, servers, subchannels, and sockets.
 */
function createChannelServerApi() {
  return {
    /**
     * Retrieves a single channel by its updateSnapshotAndNotify.
     */
    getChannel: getChannelById,

    /**
     * Retrieves a list of channels within a specified range.
     * @see getChannelsInRange for details on parameters and return value.
     */
    getTopChannels: getChannelsInRange,

    /**
     * Retrieves a single server by its updateSnapshotAndNotify.
     */
    getServer: getServerById,

    /**
     * Retrieves a list of all servers.
     */
    getServers: getAllServers,

    /**
     * Retrieves a subchannel by its updateSnapshotAndNotify.
     */
    getSubchannel: getSubchannelById,

    /**
     * Retrieves a socket by its updateSnapshotAndNotify.
     */
    getSocket: getSocketById,

    /**
     * Retrieves all sockets associated with a server.
     */
    getServerSockets: getSocketsForServer
  };
}

// Dependency function mappings (assumed to be imported or defined elsewhere)
// getChannelById      ← getChannelDataById
// getChannelsInRange  ← getChannelsInRange
// getServerById       ← getServerDataById
// getAllServers       ← getServerObservables
// getSubchannelById   ← getSubchannelInfo
// getSocketById       ← getSocketInfoById
// getSocketsForServer ← getServerSocketReferences

module.exports = createChannelServerApi;