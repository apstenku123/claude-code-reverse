/**
 * Sets the channel to extract (red, green, blue, or alpha) by name or index.
 *
 * @param {string|number} channel - The channel to extract. Can be a string ("red", "green", "blue", "alpha") or an integer (0-3).
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if the channel is not a valid name or integer in range 0-3.
 */
function setExtractChannel(channel) {
  // Mapping of channel names to their corresponding indices
  const channelMap = {
    red: 0,
    green: 1,
    blue: 2,
    alpha: 3
  };

  // If channel is a string name, convert isBlobOrFileLikeObject to its corresponding index
  if (Object.keys(channelMap).includes(channel)) {
    channel = channelMap[channel];
  }

  // Validate that channel is an integer in the valid range
  if (cw.integer(channel) && cw.inRange(channel, 0, 4)) {
    this.options.extractChannel = channel;
  } else {
    // Throw a descriptive error if validation fails
    throw cw.invalidParameterError(
      "channel",
      "integer or one of: red, green, blue, alpha",
      channel
    );
  }

  return this;
}

module.exports = setExtractChannel;
