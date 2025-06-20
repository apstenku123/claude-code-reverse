/**
 * Determines the forced color level based on the FORCE_COLOR property in the environment object.
 *
 * @param {Object} environmentVars - An object representing environment variables (e.g., process.env).
 * @returns {number|undefined} The color level: 1 for 'true' or empty string, 0 for 'false',
 *   or a number between 0 and 3 parsed from the FORCE_COLOR value. Returns undefined if FORCE_COLOR is not set.
 */
function getForcedColorLevel(environmentVars) {
  // Check if the FORCE_COLOR property exists in the environment variables
  if ("FORCE_COLOR" in environmentVars) {
    const forceColorValue = environmentVars.FORCE_COLOR;

    // If FORCE_COLOR is the string 'true', force color level 1
    if (forceColorValue === "true") {
      return 1;
    }

    // If FORCE_COLOR is the string 'false', disable color (level 0)
    if (forceColorValue === "false") {
      return 0;
    }

    // If FORCE_COLOR is an empty string, treat as level 1 (enabled)
    if (forceColorValue.length === 0) {
      return 1;
    }

    // Otherwise, parse the value as an integer and clamp to a maximum of 3
    return Math.min(Number.parseInt(forceColorValue, 10), 3);
  }
  // If FORCE_COLOR is not defined, return undefined
}

module.exports = getForcedColorLevel;
