/**
 * Sets the extractChannel option based on a provided channel name or index.
 *
 * Accepts either a channel name ('red', 'green', 'blue', 'alpha') or an integer index (0-3).
 * Throws an error if the input is invalid.
 *
 * @param {string|number} channel - The channel to extract, specified as a name or index.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} If the channel parameter is invalid.
 */
function setExtractChannelOption(channel) {
  // Mapping of channel names to their corresponding indices
  const channelNameToIndex = {
    red: 0,
    green: 1,
    blue: 2,
    alpha: 3
  };

  // If the input is a recognized channel name, convert isBlobOrFileLikeObject to its index
  if (Object.keys(channelNameToIndex).includes(channel)) {
    channel = channelNameToIndex[channel];
  }

  // Validate that the channel is an integer within the valid range
  if (cw.integer(channel) && cw.inRange(channel, 0, 4)) {
    this.options.extractChannel = channel;
  } else {
    // Throw an error if the parameter is invalid
    throw cw.invalidParameterError(
      "channel",
      "integer or one of: red, green, blue, alpha",
      channel
    );
  }

  return this;
}

module.exports = setExtractChannelOption;