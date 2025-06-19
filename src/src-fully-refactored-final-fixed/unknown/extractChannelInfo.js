/**
 * Extracts channel information from a given channel object.
 *
 * @param {Object} channel - The channel object containing channel details.
 * @param {string|number} channel.id - The unique identifier for the channel.
 * @param {string} channel.name - The name of the channel.
 * @returns {Object} An object containing the channel'createInteractionAccessor id and name, mapped to 'channel_id' and 'name'.
 */
function extractChannelInfo(channel) {
  // Return an object with the channel'createInteractionAccessor id and name
  return {
    channel_id: channel.id,
    name: channel.name
  };
}

module.exports = extractChannelInfo;
