/**
 * Determines if the provided object is an instance of tz.Service, tz.Type, or tz.Enum.
 *
 * @param {object} objectToCheck - The object to check against tz.Service, tz.Type, or tz.Enum.
 * @returns {boolean} True if the object is an instance of tz.Service, tz.Type, or tz.Enum; otherwise, false.
 */
function isTzServiceTypeOrEnum(objectToCheck) {
  // Check if the object is an instance of any of the specified tz classes
  return (
    objectToCheck instanceof tz.Service ||
    objectToCheck instanceof tz.Type ||
    objectToCheck instanceof tz.Enum
  );
}

module.exports = isTzServiceTypeOrEnum;