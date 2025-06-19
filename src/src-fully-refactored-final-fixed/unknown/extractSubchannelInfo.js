/**
 * Extracts the subchannel information from a given subchannel object.
 *
 * @param {Object} subchannel - The subchannel object containing its details.
 * @param {string|number} subchannel.id - The unique identifier for the subchannel.
 * @param {string} subchannel.name - The name of the subchannel.
 * @returns {Object} An object containing the subchannel'createInteractionAccessor id and name, mapped to 'subchannel_id' and 'name'.
 */
function extractSubchannelInfo(subchannel) {
  // Return an object with the subchannel'createInteractionAccessor id and name using specific property names
  return {
    subchannel_id: subchannel.id,
    name: subchannel.name
  };
}

module.exports = extractSubchannelInfo;