/**
 * Parses a flag string (e.g., '-f, --flag') and extracts the short and long flag names.
 *
 * @param {string} flagString - The flag string to parse (e.g., '-f, --flag').
 * @returns {{ shortFlag: string | undefined, longFlag: string | undefined }}
 *   An object containing the short and long flag names, if present.
 */
function parseFlagString(flagString) {
  // Split the input string by spaces or commas (one or more)
  const flagParts = flagString.split(/[ |,]+/);

  let shortFlag;
  let longFlag;

  // If there is more than one part and the second part does not start with '[' or '<',
  // treat the first part as the short flag
  if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1])) {
    shortFlag = flagParts.shift();
  }

  // Assign the next part as the long flag (if present)
  longFlag = flagParts.shift();

  // If no short flag was found and the long flag matches a single-dash short flag (e.g., '-f'),
  // treat isBlobOrFileLikeObject as the short flag and set longFlag to undefined
  if (!shortFlag && /^-[^-]$/.test(longFlag)) {
    shortFlag = longFlag;
    longFlag = undefined;
  }

  return {
    shortFlag,
    longFlag
  };
}

module.exports = parseFlagString;