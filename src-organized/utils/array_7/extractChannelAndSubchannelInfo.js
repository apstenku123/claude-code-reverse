/**
 * Extracts detailed information from a channel object, including its channels and subchannels.
 *
 * @param {Object} channelObject - The channel object to extract information from. Must implement getWorkingDirectoryInfo() and have a 'ref' property.
 * @returns {Object} An object containing the channel'createInteractionAccessor reference, data, and arrays of channel/subchannel references.
 */
function extractChannelAndSubchannelInfo(channelObject) {
  // Retrieve the info object from the channel
  const channelInfo = channelObject.getWorkingDirectoryInfo();

  // Arrays to hold references to child channels and subchannels
  const channelReferences = [];
  const subchannelReferences = [];

  // Collect references for all child channels
  channelInfo.children.channels.forEach(childChannel => {
    // childChannel[1].ref is the reference to the child channel
    channelReferences.push(extractChannelInfo(childChannel[1].ref));
  });

  // Collect references for all child subchannels
  channelInfo.children.subchannels.forEach(childSubchannel => {
    // childSubchannel[1].ref is the reference to the child subchannel
    subchannelReferences.push(extractSubchannelInfo(childSubchannel[1].ref));
  });

  // Return a structured object with all relevant information
  return {
    ref: extractChannelInfo(channelObject.ref),
    data: {
      target: channelInfo.target,
      state: getConnectivityStateObject(channelInfo.state),
      calls_started: channelInfo.callTracker.callsStarted,
      calls_succeeded: channelInfo.callTracker.callsSucceeded,
      calls_failed: channelInfo.callTracker.callsFailed,
      last_call_started_timestamp: convertDateToTimestampObject(channelInfo.callTracker.lastCallStartedTimestamp),
      trace: channelInfo.trace.getTraceMessage()
    },
    channel_ref: channelReferences,
    subchannel_ref: subchannelReferences
  };
}

module.exports = extractChannelAndSubchannelInfo;