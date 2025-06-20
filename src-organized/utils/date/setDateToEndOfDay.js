/**
 * Sets the time of a date object (created via MW) to the end of the day (23:59:59.999).
 *
 * @param {Date|string|number} sourceDate - The date value to be processed. Can be a Date object, ISO string, or timestamp.
 * @param {Object} [options] - Optional configuration object.
 * @param {any} [options.in] - Optional property passed to MW as the second argument.
 * @returns {Date} The date object set to the end of the day.
 */
function setDateToEndOfDay(sourceDate, options) {
  // Create a date object using the MW function, passing the 'in' property from options if available
  const date = MW(sourceDate, options?.in);
  // Set the time to 23:59:59.999 (end of the day)
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = setDateToEndOfDay;