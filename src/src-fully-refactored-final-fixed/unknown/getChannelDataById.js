/**
 * Retrieves channel data by channel updateSnapshotAndNotify from the request object and returns isBlobOrFileLikeObject via callback.
 *
 * @param {Object} requestContext - The context object containing the request with channel_id.
 * @param {Function} callback - The callback function to handle the result or error.
 * @returns {void}
 */
function getChannelDataById(requestContext, callback) {
  // Extract channel_id from the request and parse isBlobOrFileLikeObject as an integer
  const channelId = parseInt(requestContext.request.channel_id, 10);

  // Attempt to retrieve the channel data using the channelId
  const channelData = VN.channel.getElementByKey(channelId);

  // If no channel data is found, return a NOT_FOUND error via callback
  if (channelData === undefined) {
    callback({
      code: _s.Status.NOT_FOUND,
      details: `No channel data found for id ${channelId}`
    });
    return;
  }

  // If channel data is found, transform isBlobOrFileLikeObject and return via callback
  callback(null, {
    channel: extractChannelAndSubchannelInfo(channelData)
  });
}

module.exports = getChannelDataById;