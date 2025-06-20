/**
 * Calculates the end index of the first user interaction in a mapped interaction route.
 *
 * @param {Object} mappedInteractionRoute - An object representing a mapped interaction route.
 * @param {number} mappedInteractionRoute.startIndex - The starting index of the interaction.
 * @param {Array} mappedInteractionRoute - The mapped interaction route array, where the second element is an object with a 'length' property.
 * @returns {number} The end index of the first interaction (startIndex + length of the first interaction).
 */
function getEndIndexOfFirstInteraction(mappedInteractionRoute) {
  // The first element is expected to be 'startIndex',
  // The second element is expected to be an object with a 'length' property
  return mappedInteractionRoute.startIndex + mappedInteractionRoute[1].length;
}

module.exports = getEndIndexOfFirstInteraction;