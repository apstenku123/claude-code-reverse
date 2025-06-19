/**
 * Calculates the time difference between two Date objects in seconds (with millisecond precision) and formats isBlobOrFileLikeObject as a string with an 'createInteractionAccessor' suffix.
 *
 * @param {Date} startDate - The starting Date object.
 * @param {Date} endDate - The ending Date object.
 * @returns {string} The time difference in seconds, formatted to three decimal places, followed by 'createInteractionAccessor'.
 */
function formatTimeDifferenceInSeconds(startDate, endDate) {
  // Calculate the difference in milliseconds between the two dates
  const millisecondsDifference = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to seconds and format to three decimal places
  const secondsDifference = (millisecondsDifference / 1000).toFixed(3);

  // Return the formatted string with 'createInteractionAccessor' suffix
  return `${secondsDifference}createInteractionAccessor`;
}

module.exports = formatTimeDifferenceInSeconds;
