/**
 * Provides an object containing API methods for channel and server operations.
 *
 * @returns {Object} An object with methods to get channels, servers, subchannels, and sockets.
 */
function createChannelApi() {
  return {
    /**
     * Retrieves a channel by its updateSnapshotAndNotify.
     */
    getChannelById: getChannelById,

    /**
     * Retrieves a list of top channels within a specified range.
     * See: getChannelsInRange
     */
    getTopChannels: getChannelsInRange,

    /**
     * Retrieves a server by its updateSnapshotAndNotify.
     */
    getServerById: getServerById,

    /**
     * Retrieves a list of all servers.
     */
    getAllServers: getAllServers,

    /**
     * Retrieves a subchannel by its updateSnapshotAndNotify.
     */
    getSubchannelById: getSubchannelById,

    /**
     * Retrieves a socket by its updateSnapshotAndNotify.
     */
    getSocketById: getSocketById,

    /**
     * Retrieves all sockets for a given server.
     */
    getServerSockets: getServerSockets
  };
}

// External dependencies (should be imported or defined elsewhere in the codebase)
// const getChannelById = ...;
// const getChannelsInRange = ...;
// const getServerById = ...;
// const getAllServers = ...;
// const getSubchannelById = ...;
// const getSocketById = ...;
// const getServerSockets = ...;

module.exports = createChannelApi;