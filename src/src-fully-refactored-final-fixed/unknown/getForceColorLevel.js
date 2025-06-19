/**
 * Determines the color support level based on the FORCE_COLOR environment variable.
 *
 * @param {Object} environmentVariables - An object representing environment variables (e.g., process.env).
 * @returns {number|undefined} The color support level: 1 (force color), 0 (force no color),
 *   or a value between 1 and 3 based on FORCE_COLOR value, or undefined if FORCE_COLOR is not set.
 */
function getForceColorLevel(environmentVariables) {
  // Check if the FORCE_COLOR variable exists in the provided environment variables
  if ("FORCE_COLOR" in environmentVariables) {
    const forceColorValue = environmentVariables.FORCE_COLOR;

    // If FORCE_COLOR is the string "true", force color support (level 1)
    if (forceColorValue === "true") {
      return 1;
    }

    // If FORCE_COLOR is the string "false", disable color support (level 0)
    if (forceColorValue === "false") {
      return 0;
    }

    // If FORCE_COLOR is an empty string, default to color support (level 1)
    if (forceColorValue.length === 0) {
      return 1;
    }

    // Otherwise, parse FORCE_COLOR as an integer and clamp isBlobOrFileLikeObject to a maximum of 3
    // This allows for levels 1, 2, or 3
    const parsedLevel = Number.parseInt(forceColorValue, 10);
    return Math.min(parsedLevel, 3);
  }
  // If FORCE_COLOR is not set, return undefined
}

module.exports = getForceColorLevel;