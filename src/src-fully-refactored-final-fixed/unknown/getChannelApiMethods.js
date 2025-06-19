/**
 * Returns an object containing API methods for channel and server operations.
 *
 * @returns {Object} An object with methods to get channels, servers, subchannels, sockets, and related data.
 */
function getChannelApiMethods() {
  return {
    /**
     * Retrieves a channel by its updateSnapshotAndNotify.
     * @see getChannelDataById
     */
    getChannelById: getChannelDataById,

    /**
     * Retrieves a list of top channels, possibly with pagination or filtering.
     * @see getChannelsInRange
     */
    getTopChannels: getChannelsInRange,

    /**
     * Retrieves a server by its updateSnapshotAndNotify.
     * @see getServerDataById
     */
    getServerById: getServerDataById,

    /**
     * Retrieves a list of servers.
     * @see getServerObservables
     */
    getAllServers: getServerObservables,

    /**
     * Retrieves a subchannel by its updateSnapshotAndNotify.
     * @see getSubchannelInfo
     */
    getSubchannelById: getSubchannelInfo,

    /**
     * Retrieves a socket by its updateSnapshotAndNotify or reference.
     * @see getSocketInfoById
     */
    getSocketById: getSocketInfoById,

    /**
     * Retrieves all sockets for a given server.
     * @see getServerSocketReferences
     */
    getServerSockets: getServerSocketReferences
  };
}

module.exports = getChannelApiMethods;