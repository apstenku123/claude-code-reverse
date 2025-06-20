/**
 * Converts a JavaScript Date object to an object containing seconds and nanoseconds since the Unix epoch.
 *
 * @param {Date} date - The JavaScript Date object to convert.
 * @returns {{seconds: number, nanos: number} | null} An object with 'seconds' and 'nanos' properties, or null if input is falsy.
 */
function convertDateToTimestampObject(date) {
  if (!date) {
    // If the input is null, undefined, or otherwise falsy, return null
    return null;
  }

  // Get the time in milliseconds since the Unix epoch
  const millisecondsSinceEpoch = date.getTime();

  // Calculate whole seconds (integer division)
  const seconds = Math.floor(millisecondsSinceEpoch / 1000);

  // Calculate remaining nanoseconds
  const nanos = (millisecondsSinceEpoch % 1000) * 1e6;

  return {
    seconds: seconds,
    nanos: nanos
  };
}

module.exports = convertDateToTimestampObject;