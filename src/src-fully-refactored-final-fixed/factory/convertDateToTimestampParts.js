/**
 * Converts a JavaScript Date object into an object containing seconds and nanoseconds since the Unix epoch.
 *
 * @param {Date} date - The Date object to convert.
 * @returns {{seconds: number, nanos: number} | null} An object with 'seconds' and 'nanos' properties, or null if input is falsy.
 */
function convertDateToTimestampParts(date) {
  if (!date) {
    // Return null if the input is null, undefined, or otherwise falsy
    return null;
  }

  // Get the time in milliseconds since the Unix epoch
  const millisecondsSinceEpoch = date.getTime();

  // Calculate whole seconds (integer division)
  const seconds = Math.floor(millisecondsSinceEpoch / 1000);

  // Calculate remaining nanoseconds (fractional milliseconds * 1,000,000)
  const nanos = (millisecondsSinceEpoch % 1000) * 1e6;

  return {
    seconds,
    nanos
  };
}

module.exports = convertDateToTimestampParts;