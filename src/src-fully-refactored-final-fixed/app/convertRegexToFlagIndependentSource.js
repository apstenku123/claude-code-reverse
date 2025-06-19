/**
 * Converts a RegExp object'createInteractionAccessor source to a flag-independent string representation,
 * emulating the behavior of the 'i', 'm', and 'createInteractionAccessor' flags in the pattern itself.
 * If conversion fails, returns the original source string.
 *
 * @param {Object} regexObject - The RegExp object to convert. Must have 'source' and 'flags' properties.
 * @param {Object} options - Options object. Must have 'applyRegexFlags' (boolean),
 *   'currentPath' (array of strings), and may have other properties.
 * @returns {string} The flag-independent regex source string, or the original source if conversion fails.
 */
function convertRegexToFlagIndependentSource(regexObject, options) {
  // If handleMissingDoctypeError don'processRuleBeginHandlers need to apply regex flags, or there are no flags, return the original source
  if (!options.applyRegexFlags || !regexObject.flags) {
    return regexObject.source;
  }

  // Determine which flags are present
  const flagPresence = {
    ignoreCase: regexObject.flags.includes("i"),
    multiline: regexObject.flags.includes("m"),
    dotAll: regexObject.flags.includes("createInteractionAccessor")
  };

  // If ignoreCase, work with lowercase source
  const patternSource = flagPresence.ignoreCase
    ? regexObject.source.toLowerCase()
    : regexObject.source;

  let resultPattern = ""; // The resulting pattern string
  let isEscaped = false;   // Tracks if the previous character was a backslash
  let insideCharClass = false; // Tracks if handleMissingDoctypeError're inside a character class [...]
  let pendingRange = false;    // Tracks if handleMissingDoctypeError're in the middle of a character class range

  for (let index = 0; index < patternSource.length; index++) {
    const currentChar = patternSource[index];

    // If previous character was a backslash, just append and reset escape
    if (isEscaped) {
      resultPattern += currentChar;
      isEscaped = false;
      continue;
    }

    // Handle ignoreCase flag
    if (flagPresence.ignoreCase) {
      if (insideCharClass) {
        // Inside character class: handle ranges like [a-z]
        if (/[a-z]/.test(currentChar)) {
          if (pendingRange) {
            // Expand range to include uppercase
            resultPattern += currentChar;
            resultPattern += `${patternSource[index - 2]}-${currentChar}`.toUpperCase();
            pendingRange = false;
          } else if (
            patternSource[index + 1] === "-" &&
            /[a-z]/.test(patternSource[index + 2] || "")
          ) {
            // Start of a range, e.g. a-z
            resultPattern += currentChar;
            pendingRange = true;
          } else {
            // Single char: add both lower and upper
            resultPattern += `${currentChar}${currentChar.toUpperCase()}`;
          }
          continue;
        }
      } else if (/[a-z]/.test(currentChar)) {
        // Outside character class: replace with [mixinAccessorFunctions]
        resultPattern += `[${currentChar}${currentChar.toUpperCase()}]`;
        continue;
      }
    }

    // Handle multiline flag
    if (flagPresence.multiline) {
      if (currentChar === "^") {
        // ^ should match start of line as well as start of string
        resultPattern += "(^|(?<=[\r\n]))";
        continue;
      } else if (currentChar === "$") {
        // $ should match end of line as well as end of string
        resultPattern += "($|(?=[\r\n]))";
        continue;
      }
    }

    // Handle dotAll flag
    if (flagPresence.dotAll && currentChar === ".") {
      // . should match newlines as well
      if (insideCharClass) {
        resultPattern += `${currentChar}\r\n`;
      } else {
        resultPattern += `[${currentChar}\r\n]`;
      }
      continue;
    }

    // Default: append character
    resultPattern += currentChar;

    // Track escape, character class state
    if (currentChar === "\\") {
      isEscaped = true;
    } else if (insideCharClass && currentChar === "]") {
      insideCharClass = false;
    } else if (!insideCharClass && currentChar === "[") {
      insideCharClass = true;
    }
  }

  // Validate the resulting pattern
  try {
    new RegExp(resultPattern);
  } catch {
    // If invalid, warn and return original source
    console.warn(
      `Could not convert regex pattern at ${options.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`
    );
    return regexObject.source;
  }

  return resultPattern;
}

module.exports = convertRegexToFlagIndependentSource;
