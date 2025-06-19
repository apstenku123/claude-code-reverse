/**
 * Converts a RegExp object'createInteractionAccessor source pattern to a string that simulates the effect of its flags (i, m, createInteractionAccessor),
 * making the pattern behave the same way even if the flags are not applied. If conversion fails, returns the original source.
 *
 * @param {RegExp} regexObject - The RegExp object whose source and flags are to be processed.
 * @param {Object} options - Configuration object. Should contain `applyRegexFlags` (boolean) and `currentPath` (array of strings).
 * @returns {string} The transformed regex pattern as a string, or the original source if transformation fails.
 */
function getRegexPatternWithAppliedFlags(regexObject, options) {
  // If flags should not be applied or there are no flags, return the original source
  if (!options.applyRegexFlags || !regexObject.flags) return regexObject.source;

  // Determine which flags are present
  const hasIgnoreCase = regexObject.flags.includes("i");
  const hasMultiline = regexObject.flags.includes("m");
  const hasDotAll = regexObject.flags.includes("createInteractionAccessor");

  // Prepare the source string, lowercased if ignoreCase is set
  const patternSource = hasIgnoreCase ? regexObject.source.toLowerCase() : regexObject.source;
  let transformedPattern = "";

  // State variables for parsing
  let isEscaped = false;           // True if previous char was '\'
  let insideCharClass = false;     // True if inside a [...] character class
  let pendingRange = false;        // True if inside a char class and just saw a '-'

  for (let index = 0; index < patternSource.length; index++) {
    const char = patternSource[index];

    // Handle escape character
    if (isEscaped) {
      transformedPattern += char;
      isEscaped = false;
      continue;
    }

    // Handle ignoreCase flag
    if (hasIgnoreCase) {
      if (insideCharClass) {
        // Inside a character class: handle case-insensitive ranges
        if (/[a-z]/.test(char)) {
          if (pendingRange) {
            // Expand range to include uppercase
            transformedPattern += char;
            const startChar = patternSource[index - 2];
            transformedPattern += `${startChar}-${char}`.toUpperCase();
            pendingRange = false;
          } else if (
            patternSource[index + 1] === "-" &&
            patternSource[index + 2]?.match(/[a-z]/)
          ) {
            // Next is a range, set pendingRange
            transformedPattern += char;
            pendingRange = true;
          } else {
            // Add both lower and upper case
            transformedPattern += `${char}${char.toUpperCase()}`;
          }
          continue;
        }
      } else if (/[a-z]/.test(char)) {
        // Outside character class: replace with [mixinAccessorFunctions]
        transformedPattern += `[${char}${char.toUpperCase()}]`;
        continue;
      }
    }

    // Handle multiline flag
    if (hasMultiline) {
      if (char === "^") {
        // ^ should match start of line, not just start of string
        transformedPattern += '(^|(?<=[\r\n]))';
        continue;
      } else if (char === "$") {
        // $ should match end of line, not just end of string
        transformedPattern += '($|(?=[\r\n]))';
        continue;
      }
    }

    // Handle dotAll flag
    if (hasDotAll && char === ".") {
      // . should match newlines as well
      transformedPattern += insideCharClass ? `${char}\r\n` : `[${char}\r\n]`;
      continue;
    }

    // Default: add character, update state
    transformedPattern += char;
    if (char === "\\") {
      isEscaped = true;
    } else if (insideCharClass && char === "]") {
      insideCharClass = false;
    } else if (!insideCharClass && char === "[") {
      insideCharClass = true;
    }
  }

  // Validate the transformed pattern
  try {
    new RegExp(transformedPattern);
  } catch {
    // If invalid, warn and fall back to original source
    console.warn(
      `Could not convert regex pattern at ${options.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`
    );
    return regexObject.source;
  }

  return transformedPattern;
}

module.exports = getRegexPatternWithAppliedFlags;
