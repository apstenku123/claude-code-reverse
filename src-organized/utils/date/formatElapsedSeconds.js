/**
 * Calculates the elapsed time in seconds between two Date objects and formats isBlobOrFileLikeObject as a string with three decimal places followed by 'createInteractionAccessor'.
 *
 * @param {Date} startDate - The starting Date object.
 * @param {Date} endDate - The ending Date object.
 * @returns {string} The elapsed time in seconds, formatted to three decimal places and suffixed with 'createInteractionAccessor'.
 */
function formatElapsedSeconds(startDate, endDate) {
  // Calculate the difference in milliseconds between the two dates
  const millisecondsDifference = endDate.getTime() - startDate.getTime();
  // Convert milliseconds to seconds and format to three decimal places
  const secondsDifference = (millisecondsDifference / 1000).toFixed(3);
  // Return the formatted string with 'createInteractionAccessor' suffix
  return `${secondsDifference}createInteractionAccessor`;
}

module.exports = formatElapsedSeconds;