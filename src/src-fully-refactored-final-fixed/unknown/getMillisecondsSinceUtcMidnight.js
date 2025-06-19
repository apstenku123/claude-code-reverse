/**
 * Calculates the number of milliseconds elapsed since UTC midnight for a given date.
 *
 * @param {Date|number|string} inputDate - The date to calculate from. Can be a Date object, timestamp, or date string.
 * @returns {number} The number of milliseconds since UTC midnight of the provided date.
 */
function getMillisecondsSinceUtcMidnight(inputDate) {
  // MW is assumed to normalize or parse the input into a Date object
  const normalizedDate = MW(inputDate);

  // Create a new Date object at UTC midnight of the same day as normalizedDate
  const utcMidnight = new Date(
    Date.UTC(
      normalizedDate.getFullYear(),
      normalizedDate.getMonth(),
      normalizedDate.getDate(),
      0, // hours
      0, // minutes
      0, // seconds
      0  // milliseconds
    )
  );

  // Calculate the difference in milliseconds between the original date and UTC midnight
  const millisecondsSinceMidnight = +normalizedDate - +utcMidnight;

  return millisecondsSinceMidnight;
}

module.exports = getMillisecondsSinceUtcMidnight;