/**
 * Parses a command-line flag argument string and extracts the short and long flag representations.
 *
 * @param {string} flagArgumentString - The flag argument string, e.g., "-f, --flag" or "--flag" or "-f".
 * @returns {{ shortFlag: string|undefined, longFlag: string|undefined }} An object containing the short and long flag, if present.
 */
function parseFlagArguments(flagArgumentString) {
  // Split the input string by spaces, pipes, or commas (with optional whitespace)
  const flagParts = flagArgumentString.split(/[ |,]+/);
  let shortFlag;
  let longFlag;

  // If there are multiple parts and the second part does not start with '[' or '<',
  // treat the first part as the short flag
  if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1])) {
    shortFlag = flagParts.shift();
  }

  // The next part is considered the long flag (or the only flag if single part)
  longFlag = flagParts.shift();

  // If no shortFlag was found and the longFlag matches a single-dash short flag (e.g., '-f'),
  // treat isBlobOrFileLikeObject as the shortFlag and set longFlag to undefined
  if (!shortFlag && /^-[^-]$/.test(longFlag)) {
    shortFlag = longFlag;
    longFlag = undefined;
  }

  return {
    shortFlag,
    longFlag
  };
}

module.exports = parseFlagArguments;